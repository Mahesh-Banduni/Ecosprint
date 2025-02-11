import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Package, Calendar, Clock, MapPin, Truck,  } from 'lucide-react';
import useOrder from '../../hooks/useOrder';
import { useSelector, useDispatch } from 'react-redux';

// Main Orders Component
const MyOrders = () => {
const { orders, loading, error } = useSelector(state => state.order);

    const {
        fetchOrders,
        createBuyNowOrder,
        createCartOrder,
        updateOrder
      }=useOrder();

      useEffect(() => {
        fetchOrders();
      }, []);

// Order Status Badge Component
const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Order Processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-5 py-3 rounded-full w-fit text-xs sm:text-sm md:text-md lg:text-leg xl-text-xl ml-6 mt-3 mb-2 font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

// Order Item Component
const OrderItem = ({ item }) => (
  <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 ">
    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
      <img 
        src={item.image || "/api/placeholder/64/64"} 
        alt={item.name} 
        className="w-12 h-12 object-cover rounded"
      />
    </div>
    <div className="flex-1 ">
      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      <p className="text-sm text-gray-500">Size: {item.size}</p>
      <p className="text-sm font-medium text-emerald-600">₹{item.price.toFixed(2)}</p>
      <div className='inline-flex gap-2'>
      <p className="text-sm font-medium text-black">Total:</p>
      <p className="text-sm font-medium text-emerald-600">₹{(item.price.toFixed(2)*item.quantity)}</p>
      </div>
    </div>
  </div>
);

// Order Summary Component
const OrderSummary = ({ order }) => (
  <div className="bg-gray-50 rounded-lg p-4 mt-4">
    <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">₹{(order.totalAmount - 79).toFixed(2)}</span>

      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium">₹79</span>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-2">
        <div className="flex justify-between font-medium">
          <span className="text-gray-900">Total</span>
          <span className="text-emerald-600">₹{order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
);

// Order Card Component
const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Order Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col justify-between mb-2 lg:flex-row md:flex-row xl:flex-row">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-wrap text-gray-900 text-xs sm:text-sm md:text-md lg:text-leg xl-text-xl">Order #{order.orderCode}</span>
          </div>
          <OrderStatusBadge status={order.orderStatus} />
        </div>
        
        <div className="flex flex-col gap-4 text-sm text-gray-600 lg:flex-row md:flex-row xl:flex-row">
        <div className="flex items-center gap-2">
  <Calendar className="w-4 h-4" />
  <span>Order Date:</span>
  <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
</div>

<div className="flex items-center gap-2">
  <Truck className="w-4 h-4" />
  <span>Delivery Date:</span>
  <span>{new Date(order?.deliveryDate).toLocaleDateString()}</span>
</div>

          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
            {isExpanded ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          {/* Delivery Address */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <h4 className="font-medium text-gray-900">Delivery Address</h4>
            </div>
            <p className="text-sm text-gray-600">
              {order.addressId?.flatHouseBuildingCompanyApartment}, {order.addressId?.areaStreetSectorVillage}, {order.addressId?.townCity} {order.addressId?.state} {order.addressId?.pincode}
            </p>
            <p className="text-sm text-gray-600">
              Landmark: {order.addressId?.landmark}
            </p>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
            <div className="space-y-2">
              {order.items?.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary order={order} />
        </div>
      )}
    </div>
  );
};


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-600">When you place orders, they will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Orders</h2>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default MyOrders;