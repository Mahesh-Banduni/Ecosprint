const express = require("express");
const cartController = require("../controllers/cart.controller.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User Cart Management
 */

/**
 * @swagger
 * /cart/user/{userId}:
 *   get:
 *     summary: Retreive the user cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retreive user cart successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.get("/user/:userId", cartController.getCartByUserId);

/**
 * @swagger
 * /cart/user/{userId}/item:
 *   post:
 *     summary: Add an item to the cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           productId:
 *             type: string
 *           quantity:
 *             type: number
 *     responses:
 *       200:
 *         description: Cart Details
 *       404:
 *         description: Cart not found
 */
router.post("/user/:userId/item", cartController.addItemToCart);

/**
 * @swagger
 * /cart/user/{userId}/item:
 *   put:
 *     summary: Update the quantity of an item in the cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated Cart
 *       404:
 *         description: Cart not found
 */
router.put("/user/:userId/item", cartController.updateCartItem);

/**
 * @swagger
 *  /cart/user/{userId}/item/{productId}:
 *   delete:
 *     summary: Remove an item from the cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user.
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product item to remove.
 *     responses:
 *       200:
 *         description: The updated Cart
 *       404:
 *         description: Cart not found
 */
router.delete("/user/:userId/item/:productId", cartController.removeCartItem);

/**
 * @swagger
 * /cart/user/{userId}:
 *   delete:
 *     summary: Clear the user's cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: Cart cleared successfully.
 *       404:
 *         description: Cart not found.
 */
router.delete("/user/:userId", cartController.clearCart);

module.exports = router;
