import express from 'express';
import mongoose from 'mongoose'
import * as path from 'path';
import { fileURLToPath } from 'url';
import Restaurant from './model/restaurant.model.js'
// import morgan from 'morgan';

const app = express();
const Port = 4000;
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/api', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/restaurants', async (req, res) => {
    // const restaurant = new Restaurant(req.body)
    const restaurant = req.body
    
    // console.log(restaurant.rating)

    try {
        const stored = new Restaurant(restaurant)
        await stored.save();
        // res.sendFile(__dirname, "views", "success.html")
        res.status(200).json(restaurant);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
});

// app.get('/restaurant/:id', (req, res) => {
//     const restId = req.params;
//     console.log(restId)
//     const restfound = restaurants.find( (rest) => {
//         if(rest.id === restId.id){
//             return rest
//         }
//     } )
//     console.log(restfound)
//     res.send(restfound)
// });

// app.put('/restaurant/:id', (req, res) => {
//     const { id } = req.params

//     const { name, location, category } = req.body
    
//     const restaurant = restaurants.find( (rest) => {
//         if(rest.id === id){
//             return rest
//         }
//     })

//     if(name){
//         restaurants.name = name
//     }

//     if(location){
//         restaurants.location = location
//     }

//     if(category){
//         restaurants.category = category
//     }

//     res.send(`The restuarant with id: ${id} is updated.`)
// });

// app.delete('/restaurant/:id', (req, res) => {
//     const restPost = req.body;
//     console.log(restPost);

//     restaurant.push(restPost);
//     res.send(`restaurant with id ${restPost.id} !`);
// });

app.listen(Port, () => console.log(`Server Running on port: http://localhost:${Port} `));

mongoose.connect("mongodb+srv://romanreynolds240:cdrwscVnFZK51c5i@restaurant-api.g0lfzyx.mongodb.net/?retryWrites=true&w=majority&appName=Restaurant-Api") 
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});