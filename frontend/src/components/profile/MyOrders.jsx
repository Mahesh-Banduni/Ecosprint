import { useState } from "react";
const MyOrders = () => {
    const orders = [{ id: 1, item: "Silver Ring", status: "Shipped" }];
  
    return (
      <div>
        <h2 className="text-xl font-bold">My Orders</h2>
        {orders.map((order) => (
          <div key={order.id} className="border p-4 mt-2">
            <p>Item: {order.item}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    );
  };

  export default MyOrders;