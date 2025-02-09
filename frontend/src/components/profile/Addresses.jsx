import { useState } from "react";
const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");
  
    const addAddress = () => {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold">Addresses</h2>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <button onClick={addAddress} className="bg-emerald-600 text-white p-2 mt-2">
          Add Address
        </button>
        <ul>
          {addresses.map((addr, index) => (
            <li key={index} className="border p-2 mt-2">
              {addr}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Addresses;