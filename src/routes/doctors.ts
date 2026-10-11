import { Router } from 'express'; 
import { DoctorController } from '../controllers/doctors'; 
import { } from '../middleware/auth.middleware';
import { createDoctorZSchema } from '../models/doctors';
import { updateDoctorZSchema } from '../models/doctors';
import {validate} from '../middleware/validate.middleware';


const router = Router(); 
const DoctorsController = new DoctorController(); 

// Get all Doctors route
router.get('/' ,DoctorsController.getDoctors); 
// get the Doctor by ID route
router.get('/:id' ,DoctorsController.getDoctorById); 
// create a new Doctor route
router.post('/', validate(createDoctorZSchema) , DoctorsController.createDoctor); 
// update a Doctor by its ID
router.put('/:id', validate(updateDoctorZSchema), DoctorsController.updateDoctor); 
// delete a Doctor by its ID
router.delete('/:id', DoctorsController.deleteDoctor); 

export default router; 