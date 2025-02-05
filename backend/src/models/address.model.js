const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    pincode: { type: Number},
    flatHouseBuildingCompanyApartment: {type: String},
    areaStreetSector: {type: String},
    locality: {type: String},
    landmark: {type: String},
    district: {type: String},
    citytownvillage: {type: String},
    state: {type: String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps: true})

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;