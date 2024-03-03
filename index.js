import express from 'express';
import mongoose from 'mongoose'
import * as path from 'path';
import { fileURLToPath } from 'url';
import Restaurant from './model/restaurant.model.js'
// import router from './routes/restaurant.route.js'
// import 
// import morgan from 'morgan';

const app = express()
const Port = 4000;
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
// app.use("/api/restaurants", restaurantRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/restaurants/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/restaurants', async (req, res) => {

    const restaurant = req.body

    try {
        const stored = new Restaurant(restaurant)
        await stored.save();
        
        res.status(200).json(restaurant);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
});

app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id);
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.put('/api/restaurants/:id', async (req, res) => {
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
});

app.delete('/api/restaurants/:id', async (req, res) => {
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
});

app.listen(Port, () => console.log(`Server Running on port: http://localhost:${Port} `));

mongoose.connect("mongodb+srv://romanreynolds240:cdrwscVnFZK51c5i@restaurant-api.g0lfzyx.mongodb.net/?retryWrites=true&w=majority&appName=Restaurant-Api") 
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});