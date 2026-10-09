import { Request, Response } from 'express'; 
import { MedicalService } from '../services/medicalservice';

// ZOD Validation Schema's


//Import The Zod Appointment Schema's from ../models later for  middleware authentication
import { createAppointmentZSchema } from '../models/appointments';
import { updateAppointmentZSchema } from '../models/appointments';

const Appointmentservice = new MedicalService();



export class AppointmentController {
    // GET all Appointments 
getAppointments = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Appointment = await Appointmentservice.getAllAppointments();
        res.status(200).json(Appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Appointments', error });
    }
/**
 * @openapi
 *  /Appointments:
 *    get:
 *        summary: Retrieve all Appointments
 *        tags:
 *          - Appointments
 *        responses: 
 *          200:
 *            description: Successfully retrieved Appointments
 *          500:
 *            description: Internal server error
 */
};
// GET Appointment by their Id
getAppointmentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const Appointment = await Appointmentservice.getAppointmentsById(id);
        if (!Appointment) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }
        res.status(200).json(Appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Appointment', error });
    }

/** 
* @openapi 
* /Appointments/{id}: 
*   get: 
*     summary: Get a Appointment by ID 
*     tags: 
*       - Appointments 
*     parameters: 
*       - in: path 
*         name: id 
*         required: true 
*         schema: 
*           type: string 
*     responses: 
*       200: 
*         description: Appointment found 
*       404: 
*         description: Appointment not found 
*       500: 
*         description: Internal server error 
*/ 
};

createAppointment = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log(req.body);
        const newAppointment = await Appointmentservice.createAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Appointment', error });
    }


    // ** COMMENTED OUT FOR NOW JUST FOR REFERENCE POINT BEFORE I MAKE THE ZOD SCHEMA's FOR VALIDATION **

  const validation = createAppointmentZSchema.safeParse(req.body);

    console.log

    if (!validation.success){
        res.status(400).json({message: 'Invalid Appointment data', errors: validation.error.issues });
        return;
    }

    /**
     * @openapi
     * /Appointments:
     *   post:
     *    summary: Create a new Appointment
     *    tags:
     *     - Appointments
     *   requestBody:
     *    required: true
     *   content:
     *    application/json:
     *    schema:
     *    $ref: '#/components/schemas/CreateAppointmentInput'
     *   responses:
     *    201:
     *    description: Successfully created Appointment
     *   400:
     *   description: Bad request
     *  500:
     *  description: Internal server error
     */
};
 

 // UPDATE a Appointment by its ID
updateAppointment = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const updatedAppointment = await Appointmentservice.updateAppointment(id, req.body);
        if (!updatedAppointment){
            res.status(404).json({message: 'Appointment not found'});
            return;
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Appointment', error });
    }


    // Validaiton for the Appointment Schema (Needs updating from the Appointment ZOD Schema)
    const validation = updateAppointmentZSchema.safeParse(req.body);

    console.log
    
    if (!validation.success){
        res.status(400).json({message: 'Invalid Appointment data', errors: validation.error.issues });
        return;
    }
    
};

 // DELETE a Appointment
deleteAppointment = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const deletedAppointment = await Appointmentservice.deleteAppointment(id);
        if(!deletedAppointment){
            res.status(404).json({message: 'Appointment not found'});
            return;
        }
        res.status(200).json(deletedAppointment);
    } catch(erorr){
        res.status(200).json({ success: true});
    }
};
}