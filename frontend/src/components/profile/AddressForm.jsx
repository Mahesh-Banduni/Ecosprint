import { useState } from "react";

const AddressForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    pincode: "",
    flatHouseBuildingCompanyApartment: "",
    areaStreetSectorVillage: "",
    landmark: "",
    townCity: "",
    state: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Address" : "Add New Address"}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="flatHouseBuildingCompanyApartment" placeholder="Flat/House No./Building/Company/Apartment" value={formData.flatHouseBuildingCompanyApartment} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="areaStreetSectorVillage" placeholder="Area/Street/Sector/Village" value={formData.areaStreetSectorVillage} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="townCity" placeholder="City/Town/Village" value={formData.townCity} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required className="border p-2 rounded" />
        <div className="flex justify-between">
          <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
