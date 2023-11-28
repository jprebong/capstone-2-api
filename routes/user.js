const express = require("express");
const userController = require('../controllers/user');
const auth = require("../auth");
const { verify, verifyAdmin } = auth;
const router  = express.Router();

// User Registration
router.post("/register", userController.registerUser)
//User Login
router.post("/login", userController.loginUser);

// User order product
router.post("/order", verify, userController.order);

// orders
router.get("/orders", verify, userController.getUserOrders);


// Retrieving user details
router.get("/:userId/userDetails", verify, userController.getProfile);

// Update profile
router.put('/updateAdmin', verify, verifyAdmin, userController.updateUserAsAdmin);

	//Refactor
	router.get("/details", verify, userController.getProfile);



module.exports = router;