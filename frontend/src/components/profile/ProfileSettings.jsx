import { useState } from "react";
const ProfileSettings = ({ user }) => {
    const [formData, setFormData] = useState(user.name);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSave = () => {
      console.log("Saved", formData);
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mt-2"
        />
        <button onClick={handleSave} className="bg-emerald-600 text-white p-2 mt-2">
          Save Changes
        </button>
      </div>
    );
  };
  
  export default ProfileSettings;