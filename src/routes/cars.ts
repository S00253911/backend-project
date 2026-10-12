import { Router } from 'express'; 
import { CarController } from '../controllers/cars'; 
import { authenticateKey } from '../middleware/auth.middleware';
import { carParamsSchema, createCarZScheme } from '../models/cars';
import { updateCarZSchema } from '../models/cars';
import {validate} from '../middleware/validate.middleware';

const router = Router(); 
const carController = new CarController(); 

// Get all cars route
router.get('/', carController.getCars); 
// get the car by ID route
router.get('/:id', validate(carParamsSchema) ,carController.getCarById); 
// create a new car route
router.post('/', validate(createCarZScheme), carController.createCar); 
// update a car by its ID
router.put('/:id', validate(carParamsSchema),validate(updateCarZSchema),carController.updateCar); 
// delete a car by its ID
router.delete('/:id', carController.deleteCar); 

export default router; 