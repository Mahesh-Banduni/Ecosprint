const Cart = require("../models/cart.model.js");
const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
    ConflictError,
    NotFoundError,
    BadRequestError,
} = require("../errors/errors.js");

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Utility: Fetch and validate cart
const fetchValidCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
        throw new BadRequestError("Cart is empty or not found");
    }

    const validItems = [];
    for (const item of cart.items) {
        if (item.productId.stockStatus === "in-stock" && item.quantity <= item.productId.stock) {
            validItems.push(item);
        } else {
            throw new BadRequestError(
                `Item ${item.productId.name} (ID: ${item.productId._id}) is unavailable or exceeds stock.`
            );
        }
    }

    if (validItems.length === 0) {
        throw new BadRequestError("No valid items available to place an order");
    }

    return { cart, validItems };
};

const generateOrderCode = async () => {
    let id;
    do {
        id = Math.floor(10 ** 14 + Math.random() * 9 * 10 ** 14); // Generates a number between 10^14 and 10^15 - 1
    } while (id % 10 === 0); // Ensures it does not end in zero
    return id; // Returns the number as a string
};


// Create an order
const createCartOrder = async (userId, addressId) => {
    var orderCodeString='ODR';
    const { cart, validItems } = await fetchValidCart(userId);
    let orderCode=0;
    let orderCodeCheck=[];
    do {
        let orderCode1 = await generateOrderCode();
        orderCode= orderCodeString+orderCode1;
        // Check if the generated order code already exists
        orderCodeCheck = await Order.find({ orderCode });
    } while (orderCodeCheck.length > 0); // Repeat if the order code already exists

    const totalAmount = validItems.reduce((sum, item) => sum + item.amount, 0)+79;
    const order = new Order({
        userId,
        orderCode,
        items: validItems,
        totalAmount,
        addressId,
    });
    const currentDate = new Date();
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);
    await user.save();

    // Deduct stock and clear cart
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.stock -= item.quantity;
        product.orders.push(order._id);
        await product.save();
    }
    cart.items = [];
    await cart.save();

    return { message: "Order placed successfully", order };
};

// Create an order
const createBuyNowOrder = async (userId, addressId, itemData) => {
    var orderCodeString='ODR';
    let orderCode;
    let orderCodeCheck=[];
    do {
        let orderCode1 = await generateOrderCode();
        orderCode= orderCodeString+orderCode1;
        // Check if the generated order code already exists
        orderCodeCheck = await Order.find({ orderCode });
    } while (orderCodeCheck.length > 0); // Repeat if the order code already exists

    const product = await Product.findById(itemData.productId);
    const items=[];
    const productId=itemData.productId;
    const quantity=itemData.quantity;
    const amount=product.price * quantity;
    items.push({
        productId,
        quantity,
        amount
    });
    
    const totalAmount = amount + 79;

    const order = new Order({
        userId,
        orderCode,
        items,
        totalAmount,
        addressId
    });
    const currentDate = new Date();
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);
    await user.save();

    // Deduct stock and clear cart
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.stock -= item.quantity;
        product.orders.push(order._id);
        await product.save();
    }

    return { message: "Order placed successfully", order };
};

// Initiate Razorpay payment
const initiatePayment = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new NotFoundError("Order not found");

    const razorpayOrder = await razorpay.orders.create({
        amount: order.totalAmount * 100,
        currency: "INR",
        receipt: `ORDER_${order.orderCode}`,
    });

    order.paymentId = razorpayOrder.id;
    await order.save();

    return { razorpayOrder };
};

// Verify Razorpay payment
const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        throw new BadRequestError("Payment verification failed");
    }

    const order = await Order.findOne({ paymentId: razorpay_order_id });
    if (!order) throw new NotFoundError("Order not found");

    // Deduct stock and clear cart
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.stock -= item.quantity;
        await product.save();
    }
    order.paymentStatus = "Paid";
    order.orderStatus="Order Confirmed";
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    await order.save();

    return { message: "Payment successful", order };
};

// Get all orders for a user
const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ userId }).populate("items.productId");
    if (!orders) throw new NotFoundError("Orders not found");
    return orders;
};

// Get a single order by ID
const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) throw new NotFoundError("Order not found");
    return order;
};

// Update order status
const updateOrderShippingStatus = async (orderId, status) => {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) throw new NotFoundError("Order not found");
    if (!status) throw new BadRequestError("Order status is required");

    if (status === "Order Cancelled") {
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            } else {
                console.error(`Product with ID ${item.productId} not found`);
            }
        }
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) throw new NotFoundError("Order not found");
    return updatedOrder;
};


// Delete an order
const deleteOrder = async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new NotFoundError("Order not found");
    const user = await User.findById(order.userId);
    user.orders = user.orders.filter(
        (id) => id.toString() !== orderId.toString()
    );
    await user.save();
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.orders = product.orders.filter(
            (id) => id.toString() !== orderId.toString()
        );
        await product.save();
    }
    return { message: "Order deleted successfully", order };
};

const getAllOrders = async (filters, sortBy, sortOrder) => {
    const query = {};

    // Apply filters
    if (filters.category) query.category = filters.category;
    if (filters.brand) query.brand = filters.brand;
    
    if (filters.brand) query.brand = filters.brand;
    if (filters.brand) query.brand = filters.brand;
    if (filters.availability === "exclude out of stock") {
        query.stockStatus = "in-stock";
    }

    // Advanced price filter (minPrice, maxPrice)
    if (filters.minPrice || filters.maxPrice) {
        query.totalAmount = {};
        if (filters.minPrice) query.totalAmount.$gte = filters.minPrice;
        if (filters.maxPrice) query.totalAmount.$lte = filters.maxPrice;
    }

    // Define sorting
    const sortCriteria = {};
    if (sortBy) sortCriteria[sortBy] = sortOrder;

    // Query database with filters and sorting
    const filteredProducts = await Product.find(query)
        .sort(sortCriteria)
        .exec();

    if (!filteredProducts || filteredProducts.length === 0) {
        throw new Error("No product found matching the criteria.");
    }

    // If a search query is provided, use js-search for in-memory searching
    let finalResults = filteredProducts;
    
    return finalResults;
};

module.exports = {
    createCartOrder,
    createBuyNowOrder,
    initiatePayment,
    verifyPayment,
    getOrdersByUserId,
    getOrderById,
    updateOrderShippingStatus,
    deleteOrder,
};
