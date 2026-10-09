import { Router } from 'express'; 
import { MedicalRecordController } from '../controllers/medicalrecords'; 
import { authenticateKey } from '../middleware/auth.middleware';
import { createMedicalRecordZSchema } from '../models/medicalrecords';
import { updateMedicalRecordZSchema } from '../models/medicalrecords';
import {validate} from '../middleware/validate.middleware';

const router = Router(); 
const medicalRecordsController = new MedicalRecordController(); 

// Get all MedicalRecords route
router.get('/',authenticateKey ,medicalRecordsController.getMedicalRecords); 
// get the MedicalRecord by ID route
router.get('/:id',authenticateKey ,medicalRecordsController.getMedicalRecordById); 
// create a new MedicalRecord route
router.post('/', validate(createMedicalRecordZSchema),authenticateKey , medicalRecordsController.createMedicalRecord); 
// update a MedicalRecord by its ID
router.put('/:id', validate(updateMedicalRecordZSchema), authenticateKey ,medicalRecordsController.updateMedicalRecord); 
// delete a MedicalRecord by its ID
router.delete('/:id', authenticateKey ,medicalRecordsController.deleteMedicalRecord); 

export default router; 