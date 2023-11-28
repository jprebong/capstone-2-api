const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

const port = 4008;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Database Connection
mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.gitjrmv.mongodb.net/Capstone2?retryWrites=true&w=majority", 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

// Backend Routes
app.use("/b8/users", userRoutes);
app.use("/b8/products", productRoutes);


if(require.main === module){
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${ process.env.PORT || port}`)
	})
}

module.exports = {app, mongoose};
