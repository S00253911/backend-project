import { Router } from 'express'; 
import { CarController } from '../controllers/cars'; 

const router = Router(); 
const carController = new CarController(); 

// Get all cars route
router.get('/', carController.getCars); 
// get the car by ID route
router.get('/:id', carController.getCarById); 
// create a new car route
router.post('/', carController.createCar); 
// update a car by its ID
router.put('/:id', carController.updateCar); 
// delete a car by its ID
router.delete('/:id', carController.deleteCar); 

export default router; 