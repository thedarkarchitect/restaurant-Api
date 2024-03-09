import { Router } from 'express'
import {sendAboutPage , sendHomePage, getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant} from '../controllers/restaurant.controller.js'



const router = Router();

// router.get('/', sendHomePage);
// router.get('/about', sendAboutPage);

router.get('/', getRestaurants)

router.post('/', createRestaurant);

router.get('/:id', getRestaurant)

router.put('/:id', updateRestaurant);

router.delete('/:id', deleteRestaurant);


export default router;