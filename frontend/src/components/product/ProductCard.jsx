import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { Star, Filter, X } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleProductClick}
    >
      <div className="relative pb-[100%] overflow-hidden">
        <img
          src={product.images[0] || '/api/placeholder/300/300'}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {product.isNewArrival && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Best Seller
          </span>
        )}
      </div>
      <div className="p-4 text-wrap">
        <h3 className="text-sm text-wrap lg:text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h3>
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.totalReviews})
          </span>
        </div>
        <div className="mt-2 flex-wrap justify-between flex-col sm:flex-row gap-2">
          <div>
            {product.salePrice ? (
              <>
                <span className="text-sm font-semibold text-emerald-600 lg:text-lg">
                  ₹{product.salePrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
                <br></br>
                <span className=" bg-green-100 text-xs text-green-800 px-1 py-1 rounded">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 export default ProductCard;