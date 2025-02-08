import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (

  <div className=" ml-1 mr-1 flex flex-col items-center justify-between p-4 border-b sm:flex-row">
    <div className="flex items-center space-x-4">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-24 h-24 object-cover rounded-md"
      />
      <div>
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">Size: {item.size}</p>
        <p className="text-emerald-600 font-medium">₹{item.amount}</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-6 mt-5 gap-2">
      <div className="flex items-center border rounded-full">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-2 hover:bg-gray-100 rounded-l-full"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="px-4">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-2 hover:bg-gray-100 rounded-r-full"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="items-center font-semibold w-50 text-right">
        Total: ₹{(item.amount).toFixed(2)}
      </div>
      
      <button 
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

export default CartItem;