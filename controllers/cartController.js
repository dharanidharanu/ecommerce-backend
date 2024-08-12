const Cart = require("../models/cartModel");
const Product = require("../models/productmodel")
exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, quantity } = req.body;
  let cart = await Cart.findOne({ user_id });

  if (!cart) {
     cart = new Cart({
      user_id,
      products: [
        {
          product_id,
          quantity,
        },
      ],
    });
    await cart.save();
    res.status(200).json({ message: "successful" });
  } else {
    const Productindex = cart.products.find((prod) => {
      prod.product_id === product_id;
    });
    if (Productindex > -1) {
      cart.products[Productindex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "created successful" });
    } else {
      cart.products.push({ product_id, quantity });
      await cart.save();
      res.status(200).json({ message: "created successful" }); 
    }
  }
  
};
exports.getCart = async (req, res) => {
  const {user_id} = req.user;
  try {
    console.log(user_id);
      const cart = await Cart.findOne({user_id});
      if(!cart) {
          return res.status(400).json({error: "Cart is empty, Create a cart"});
      }
      console.log("Cart found");

      let subTotal = 0;
      const cartItem = await Promise.all(
          cart.products.map(async (product) => {
              const productDetails = await Product.findById(product.product_id);
              subTotal += productDetails.price * product.quantity;
              return {
                  product_id: productDetails.id,
                  title: productDetails.title,
                  description: productDetails.description,
                  price: productDetails.price,
                  image: productDetails.image,
                  quantity: product.quantity,
                  subTotal
              }
          })
      )

      res.status(200).json({cartItem: cartItem});

  } catch(e) {
      console.log(e);
      res.status(400).json({error: e.message});
  }
}
exports.deleteCart = async (req,res)=>{

  const {user_id} = req.user;
  const product_id = req.params.id;
  try{
  const cart = await cart.findOne({user_id});

  if(!cart){
      return res.status(404).json ({message : "cart not found"});
  }
  
  const isproductvalid = cart.product.find(
      (product)=> product_id === product_id
  );
  if(!isproductvalid){
      return res.status(404).json ({message : "product not found in cart"});
  }
  if(cart.products.length <= 1){
      await cart.deleteOne({user_id});
      return res.status(200).json ({message : "cart deleted successfully"});
  }
  else{
      cart.product = cart.product.filter((prod) => prod.id != product_id);
      cart.save();
      res.status(200).json ({message : "cart deleted successfully"});
  }
} 
  catch(e){
    console.log(e);
  }
}