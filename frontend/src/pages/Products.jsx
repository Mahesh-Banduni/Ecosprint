import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown, Star, Filter } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { setFilters } from '../store/productSlice';
import ProductHeader from '../components/product/ProductHeader';

import ProductCard from '../components/product/ProductCard';

import FilterSidebar from '../components/product/FilterSidebar';


  const ProductPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { products, loading, error } = useSelector(state => state.products);
    const { fetchProducts } = useProducts();
    
    
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100">
        <ProductHeader></ProductHeader>
        <div className="flex">
          {/* Mobile filter button */}
          <button
            className="fixed bottom-4 right-4 md:hidden z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Filter size={24} />
          </button>
  
          <FilterSidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
  
          <main className="flex-1 p-4">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : products.length === 0 ? (
              <div className="text-center text-gray-600">No products found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };
  
  export default ProductPage;