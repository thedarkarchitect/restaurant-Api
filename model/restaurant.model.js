import mongoose from 'mongoose';

const RestaurantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        category: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
