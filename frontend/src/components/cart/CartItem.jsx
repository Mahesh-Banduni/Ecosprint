import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const totalAmount = item.price * item.quantity;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-4 overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Main Container */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Image Section */}
          <div className="relative w-full sm:w-32 aspect-square rounded-lg overflow-hidden bg-gray-50">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700">
                    Size: {item.size}
                  </span>
                  <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Unit Price:</span>
                      <span className="text-emerald-600 font-semibold">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                </div>
              </div>

              {/* Right Section with Controls and Price */}
              <div className="flex flex-col sm:items-end gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 rounded-full p-1">
                  <button 
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1, item.size)}
                    disabled={item.quantity <= 1}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      item.quantity <= 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1, item.size)}
                    className="p-2 rounded-full text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-semibold text-lg text-gray-900">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemove(item.productId)}
                    className="group/remove relative p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded opacity-0 group-hover/remove:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Remove item
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;