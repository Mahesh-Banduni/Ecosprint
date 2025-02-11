import { useState } from "react";

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
      <div>
        <p className="font-semibold">{address.flatHouseBuildingCompanyApartment}, {address.areaStreetSectorVillage}</p>
        <p>{address.townCity}, {address.state}</p>
        <p>Pincode: {address.pincode}</p>
        <p>Landmark: {address.landmark}</p>
      </div>
      <div className="mt-2 md:mt-0 flex gap-3">
        <button onClick={() => onEdit(address)} className="bg-green-200 text-black px-4 py-1 rounded hover:bg-green-500 hover:text-white">Edit</button>
        <button onClick={() => onDelete(address.addressId)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default AddressCard;
