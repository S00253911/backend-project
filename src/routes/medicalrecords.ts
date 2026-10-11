import { Router } from 'express'; 
import { MedicalRecordController } from '../controllers/medicalrecords'; 
import { } from '../middleware/auth.middleware';
import { createMedicalRecordZSchema } from '../models/medicalrecords';
import { updateMedicalRecordZSchema } from '../models/medicalrecords';
import {validate} from '../middleware/validate.middleware';


const router = Router(); 
const medicalRecordsController = new MedicalRecordController(); 

// Get all MedicalRecords route
router.get('/' ,medicalRecordsController.getMedicalRecords); 
// get the MedicalRecord by ID route
router.get('/:id' ,medicalRecordsController.getMedicalRecordById); 
// create a new MedicalRecord route
router.post('/', validate(createMedicalRecordZSchema) , medicalRecordsController.createMedicalRecord); 
// update a MedicalRecord by its ID
router.put('/:id', validate(updateMedicalRecordZSchema), medicalRecordsController.updateMedicalRecord); 
// delete a MedicalRecord by its ID
router.delete('/:id', medicalRecordsController.deleteMedicalRecord); 

export default router; 