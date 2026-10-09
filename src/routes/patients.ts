import { Router } from 'express'; 
import { PatientController } from '../controllers/patients'; 
import { authenticateKey } from '../middleware/auth.middleware';
import { createPatientZSchema } from '../models/patients';
import { updatePatientZSchema } from '../models/patients';
import {validate} from '../middleware/validate.middleware';

const router = Router(); 
const patientController = new PatientController(); 

// Get all patients route
router.get('/',authenticateKey ,patientController.getPatients); 
// get the patient by ID route
router.get('/:id',authenticateKey ,patientController.getPatientById); 
// create a new patient route
router.post('/', validate(createPatientZSchema),authenticateKey , patientController.createPatient); 
// update a patient by its ID
router.put('/:id', validate(updatePatientZSchema), authenticateKey ,patientController.updatePatient); 
// delete a patient by its ID
router.delete('/:id', authenticateKey ,patientController.deletePatient); 

export default router; 