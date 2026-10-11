import { Router } from 'express'; 
import { AppointmentController } from '../controllers/appointments'; 
import { } from '../middleware/auth.middleware';
import { createAppointmentZSchema } from '../models/appointments';
import { updateAppointmentZSchema } from '../models/appointments';
import {validate} from '../middleware/validate.middleware';


const router = Router(); 
const AppointmentsController = new AppointmentController(); 

// Get all Appointments route
router.get('/' ,AppointmentsController.getAppointments); 
// get the Appointment by ID route
router.get('/:id' ,AppointmentsController.getAppointmentById); 
// create a new Appointment route
router.post('/', validate(createAppointmentZSchema) , AppointmentsController.createAppointment); 
// update a Appointment by its ID
router.put('/:id',validate(updateAppointmentZSchema), AppointmentsController.updateAppointment); 
// delete a Appointment by its ID
router.delete('/:id' ,AppointmentsController.deleteAppointment); 

export default router; 