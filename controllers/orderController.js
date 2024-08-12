const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrder = async (req, res) => {
    const {user_id, email} = req.user;
    const {user_name, user_address, phone_number} = req.body;
    try {
        console.log(user_name, user_address, phone_number, email, user_id);
        const cart = await Cart.findOne({user_id});
        if(!cart) {
            return res.status(400).json({error: "Add a product in the cart to checkout"});
        }

        const productArr = cart.products;
        
        if(productArr.length === 0) {
            return res.status(400).json({error: "No a product in the cart to checkout"});
        }   
        const newOrder = await new Order({
            user_id,
            user_name,
            user_address,
            phone_number,
            products: productArr,
            user_email: email
        })
        await newOrder.save();
        await Cart.deleteOne({user_id});
        return res.status(200).json({ message: newOrder });

    } catch(e) {
        res.status(400).json({ error: e.message });   
    }
}

exports.getOrder = async (req, res) => {
    const {user_id} = req.user;
    try {
        const order = await Order.findOne({user_id});
        return res.status(200).json( order );
    } catch(e) {
        res.status(400).json({ error: e.message });   
    }
}