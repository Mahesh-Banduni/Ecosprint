const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderCode: { type: String, required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    deliveryDate: {type: Date},
    returnWindowDate: {type: Date},
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: { type: Number},
            amount: {type: Number}
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
    orderStatus: {type: String, default: "Order Processing", enum: ["Order Processing","Order Confirmed", "Order Packed", " Order Shipped", "Out of Delivery", "Order Delivered", "Order Cancelled", "Replacement Requested", "Replacement Approved","Replacement Order Processing","Replacement Order Packed", "Replacement Order Shipped", "Replacement Order Out of Delivery", "Replacement Order Delivered"]},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports= Order;
