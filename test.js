const placeOrder = async(req,res)=>{
    try{

        const userId = req.user.userId
        const {payment} =req.body

        const cart = await Cart.findOne({userId})
        
        if(!cart|| cart.items.length==0){
            return res.status(404).json({message:"cart is empty"})
        }

        const orderItems =cart.items.map(item=> ({productId:item.productId,quantity:item.quantity,price:item.price}))

        const totalPrice = cart.items.reduce((total,item)=>total+item.quantity*item.price,0)

        const newOrder = await Order.create({
            userId,
            orderItems,
            payment:payment,
            totalPrice,
        })
        cart.items = []
        await cart.save()

        return res.status(200).json({message:"order placed successfully"})


    }catch(err){
        console.error("error placing orfer")
        res.status(500).json({message:"server error"})
        

    }
}