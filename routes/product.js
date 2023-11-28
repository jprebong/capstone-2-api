const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

// [SECTION] Routing Component
const router = express.Router();


// Create a Product POST
router.post("/", verify, verifyAdmin, productController.addProduct);

// Retrieve all products
router.get("/all",productController.getAllProducts);

//[SECTION] Route for retrieving all the ACTIVE courses for all users
	// Middleware for verifying JWT is not required because users who aren't logged in should also be able to view the courses
	router.get("/", productController.getAllActive);
// Route for retrieving a SPECIFIC PRODUCT
router.get("/:productId", productController.getProduct);

//[SECTION] Route for Search Course by Name
	router.post('/searchByName', productController.searchProductsByName);	
// Updating a product (ADMIN)
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);


// Archive Product[ADMIN]
    router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

 // Activate Product[ADMIN]
    router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);








module.exports = router;