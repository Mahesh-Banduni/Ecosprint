import React, { useEffect } from 'react';
import { Trash2, Plus, Minus, Trash } from 'lucide-react';
import useCart from '../hooks/useCart';
import { useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
    const token = localStorage.getItem('token');
    const { items, total, loading, updateItem, removeItem, clearCart, fetchCart } = useCart();
  
    useEffect(() => {
      if (token) {
        fetchCart(token);
      }
      else if(!token){
        redirect("/login");
      }
    }, [token]);
  
    if (loading) {
      return <div className="flex justify-center items-center h-96">Loading...</div>;
    }
  
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link 
            to="/products" 
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
          >
            Continue Shopping
          </Link>
        </div>
      );
    }
  
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <button 
            onClick={() => clearCart(token)}
            className="inline-flex items-center gap-2 bg-red-500 p-2 text-white hover:text-red-700 hover:bg-white hover:border hover:border-red-600"
          >
            Empty Cart  
            <Trash size={20}></Trash>
          </button>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(id, quantity) => updateItem(id, quantity)}
                onRemove={(id) => removeItem( id)}
              />
            ))}
          </div>
  
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹79.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>₹{(total + 79).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-lg mt-6 hover:bg-emerald-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Cart;