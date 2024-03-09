import express from 'express';
import mongoose from 'mongoose'
import * as path from 'path';
import { fileURLToPath } from 'url';
import restaurantRoute from './routes/restaurant.route.js'


const app = express()
const Port = 4000;
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));
app.use("/api/restaurants", restaurantRoute);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/restaurants/about', (req, res) => { //GET to stop refrencing db instead serve html
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});


app.listen(Port, () => console.log(`Server Running on port: http://localhost:${Port} `));

mongoose.connect("mongodb+srv://romanreynolds240:cdrwscVnFZK51c5i@restaurant-api.g0lfzyx.mongodb.net/?retryWrites=true&w=majority&appName=Restaurant-Api") 
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});