const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// User registration

module.exports.registerUser = (req, res) => {
     console.log(req.body.password)
    console.log(req.body.email)
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
        
    });
 
    // Saves the created object to our database
    return newUser.save().then((user, error) => {
        // User registration failed
      if(error){
        return false;
        // User registration successful
      } else {
        return res.send(true);
      }
    })
    .catch(err => err);
  }
  

// [SECTION] User Authentication

module.exports.loginUser = (req, res) => {

	return User.findOne({ email: req.body.email }).then(result => {
		if(result == null){
			return false
		} else {

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);


			if(isPasswordCorrect){

				return res.send({ access: auth.createAccessToken(result )})

				// Password do not match
			} else {
				return res.send(false);
			}
		}
	}).catch(err => res.send(err));
}

// Order Product
module.exports.order = async (req, res) => {
  console.log(req.user.id);
  console.log(req.body.productId);

  if (req.user.isAdmin) {
      return res.send("Action Forbidden");
  }

  let isUserUpdated = await User.findById(req.user.id).then((user) => {
      let newOrder = {
          productId: req.body.productId, 
          orderedOn: new Date(),
      };

      user.orders.push(newOrder);

      return user
          .save()
          .then((user) => true)
          .catch((err) => err.message);
  });

  if (isUserUpdated !== true) {
      return res.send({ message: isUserUpdated });
  }

  let isProductUpdated = await Product.findById(req.body.productId).then(
      (product) => {
          let customers = {
              userId: req.user.id,
              orderdOn: new Date(),
          };

          product.customers.push(customers);

          return product
              .save()
              .then((product) => true)
              .catch((err) => err.message);
      }
  );

  if (isProductUpdated !== true) {
      return res.send({ message: isProductUpdated });
  }

  if (isProductUpdated && isUserUpdated) {
      return res.send({ message: "Ordered successfully!" });
  }
};

// Add this function to your existing controller file
module.exports.getUserOrders = async (req, res) => {
  try {
      const userOrders = await User.findById(req.user.id).select("orders");

      if (!userOrders) {
          return res.status(404).send({ message: "User not found" });
      }

      res.send(userOrders.orders);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

//[SECTION] Retrieve user details

module.exports.getProfile = (req, res) => {
    
  return User.findById(req.user.id)
  .then(result => {

      result.password = "";
      return res.send(result);

  })
  .catch(err => res.send(err))
};

//Update user as admin controller
// the admin updates the user to be an admin

module.exports.updateUserAsAdmin = async (req, res) => {
	try {
	  const { userId } = req.body;
  
	  // Find the user and update isAdmin flag
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  user.isAdmin = true;
  
	  // Save the updated user document
	  await user.save();
  
	  res.status(200).json({ message: 'User updated as admin successfully' });
	} catch (error) {
	  res.status(500).json({ error: 'An error occurred while updating the user as admin' });
	}
  };