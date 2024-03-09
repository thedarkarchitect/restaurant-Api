import Restaurant from "../model/restaurant.model.js";

const sendHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

const sendAboutPage =  (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
};

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createRestaurant = async (req, res) => {

    const restaurant = req.body

    try {
        const stored = new Restaurant(restaurant)
        await stored.save();
        
        res.status(200).json(restaurant);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
};

const getRestaurant = async (req, res) => {
    try {
        const { id } = req.params

        const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);

        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found" });
        }

        //update the db item
        const updateRestaurant = await Restaurant.findById(id);
        res.status(200).json(updateRestaurant);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params

        const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);

        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found" });
        }

        //update the db item
        const updateRestaurant = await Restaurant.findById(id);
        res.status(200).json(updateRestaurant);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params

        const restaurant = await Restaurant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found!"});
        }

        res.status(200).json({message: "Restaurant deleted successfully"});

    } catch  (error) {
        res.status(500).json({message: error.message});
    }
};

export {
    sendAboutPage,
    sendHomePage,
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
}