import { Router } from 'express'; 
import { PatientController } from '../controllers/patients'; 
import { createPatientZSchema } from '../models/patients';
import { updatePatientZSchema } from '../models/patients';
import {validate} from '../middleware/validate.middleware';


const router = Router(); 
const patientController = new PatientController(); 

// Get all patients route
router.get('/' ,patientController.getPatients); 
// get the patient by ID route
router.get('/:id' ,patientController.getPatientById); 
// create a new patient route
router.post('/', validate(createPatientZSchema) , patientController.createPatient); 
// update a patient by its ID
router.put('/:id', validate(updatePatientZSchema), patientController.updatePatient); 
// delete a patient by its ID
router.delete('/:id', patientController.deletePatient); 

export default router; 