import { Router } from 'express'; 
import { AppointmentController } from '../controllers/appointments'; 
import { authenticateKey } from '../middleware/auth.middleware';
import { createAppointmentZSchema } from '../models/appointments';
import { updateAppointmentZSchema } from '../models/appointments';
import {validate} from '../middleware/validate.middleware';

const router = Router(); 
const AppointmentsController = new AppointmentController(); 

// Get all Appointments route
router.get('/',authenticateKey ,AppointmentsController.getAppointments); 
// get the Appointment by ID route
router.get('/:id',authenticateKey ,AppointmentsController.getAppointmentById); 
// create a new Appointment route
router.post('/', validate(createAppointmentZSchema),authenticateKey , AppointmentsController.createAppointment); 
// update a Appointment by its ID
router.put('/:id', validate(updateAppointmentZSchema), authenticateKey ,AppointmentsController.updateAppointment); 
// delete a Appointment by its ID
router.delete('/:id', authenticateKey ,AppointmentsController.deleteAppointment); 

export default router; 