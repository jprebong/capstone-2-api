const Product = require("../models/Product");


// Add Product
module.exports.addProduct = (req, res) => {

    let newProduct = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        imageUrl : req.body.imageUrl
    });

    // Saves the created object to our database
    return newProduct.save().then((product, error) => {

        // Product creation successful
        if (error) {
            return res.send(false);

        // Product creation failed
        } else {
            return res.send(true);
        }
    })
    .catch(err => res.send(err))
};

//[SECTION] Retrieve allActive courses
module.exports.getAllActive = (req, res) => {
    return Product.find({}).then(result => {
        return res.send(result);
    })
    .catch(err => res.send(err))
};

//[SECTION] Retrieve all courses
module.exports.getAllProducts = (req, res) => {
    return Product.find({}).then(result => {
        return res.send(result);
    })
    .catch(err => res.send(err))
};



// Retrieving a specific product
module.exports.getProduct = (req, res) => {

    return Product.findById(req.params.productId).then(result => {
        return res.send(result);
    });
};

module.exports.updateProduct = (req, res) => {

    let updatedProduct = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        imageUrl : req.body.imageUrl

    };

    return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {
        if(error){
            return res.send(false);
        } else {
            return res.send(true);
        }
    });
};

module.exports.archiveProduct = (req, res) => {

    let updateActiveField = {
        isActive: false
    }

    return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
    .then((product, error) => {

        //product archived successfully
        if(error){
            return res.send(false)

        // failed
        } else {
            return res.send(true)
        }
    })
    .catch(err => res.send(err))
};

module.exports.searchProductsByName = async (req, res) => {
    try {
      const { productName } = req.body;
  
      // Use a regular expression to perform a case-insensitive search
      const products = await Product.find({
        name: { $regex: productName, $options: 'i' }
      });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.activateProduct = (req, res) => {

    let updateActiveField = {
        isActive: true
    }

    return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
    .then((product, error) => {

        //product archived successfully
        if(error){
            return res.send(false)

        // failed
        } else {
            return res.send(true)
        }
    })
    .catch(err => res.send(err))

};