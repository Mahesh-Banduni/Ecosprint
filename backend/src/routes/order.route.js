const express = require("express");
const orderController = require("../controllers/order.controller.js");
const router = express.Router();
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: User Order Management
 */

/**
 * @swagger
 * /orders/user:
 *   get:
 *     summary: Retrieve all orders for a user.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders.
 *       404:
 *         description: Orders not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/user", auth, orderController.getOrdersByUserId);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Retrieve a specific order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 */
router.get("/:orderId", orderController.getOrderById);

/**
 * @swagger
 * /orders/cart:
 *   post:
 *     summary: Create an order from the user's cart.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or items not found.
 */
router.post("/cart", auth, orderController.createCartOrder);

/**
 * @swagger
 * /orders/buy-now:
 *   post:
 *     summary: Create an buy now order.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               size:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or items not found.
 */
router.post("/buy-now", auth, orderController.createBuyNowOrder);

/**
 * @swagger
 * /orders/{orderId}/payment:
 *   post:
 *     summary: Initiate payment for an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Payment initiated successfully.
 *       404:
 *         description: Order not found.
 */
router.post("/:orderId/payment", orderController.initiatePayment);

/**
 * @swagger
 * /orders/payment/verify:
 *   post:
 *     summary: Verify a Razorpay payment.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully.
 *       400:
 *         description: Payment verification failed.
 *       404:
 *         description: Order not found.
 */
router.post("/payment/verify", orderController.verifyPayment);

/**
 * @swagger
 * /orders/{orderId}/update:
 *   put:
 *     summary: Update the status of an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: ["Order Confirmed", "Order Packed", " Order Shipped", "Out of Delivery", "Order Delivered", "Order Cancelled", "Replacement Requested", "Replacement Approved","Replacement Order Processing","Replacement Order Packed", "Replacement Order Shipped", "Replacement Order Out of Delivery", "Replacement Order Delivered"]
 *                 description: The new status of the order.
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *       404:
 *         description: Order not found.
 */
router.put("/:orderId/update", orderController.updateOrderShippingStatus);

/**
 * @swagger
 * /orders/{orderId}/delete:
 *   delete:
 *     summary: Delete an order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *       404:
 *         description: Order not found.
 */
router.delete("/:orderId/delete", orderController.deleteOrder);

module.exports = router;
