import { Request, Response } from 'express'; 
import { MedicalService } from '../services/medicalservice';

// ZOD Validation Schema's


//Import The Zod Doctor Schema's from ../models later for  middleware authentication
import { createDoctorZSchema } from '../models/doctors';
import { updateDoctorZSchema } from '../models/doctors';

const DoctorService = new MedicalService();



export class DoctorController {
    // GET all Doctors 
getDoctors = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Doctor = await DoctorService.getAllDoctors();
        res.status(200).json(Doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Doctors', error });
    }
/**
 * @openapi
 *  /Doctors:
 *    get:
 *        summary: Retrieve all Doctors
 *        tags:
 *          - Doctors
 *        responses: 
 *          200:
 *            description: Successfully retrieved Doctors
 *          500:
 *            description: Internal server error
 */
};
// GET Doctor by their Id
getDoctorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const Doctor = await DoctorService.getDoctorsById(id);
        if (!Doctor) {
            res.status(404).json({ message: 'Doctor not found' });
            return;
        }
        res.status(200).json(Doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Doctor', error });
    }

/** 
* @openapi 
* /Doctors/{id}: 
*   get: 
*     summary: Get a Doctor by ID 
*     tags: 
*       - Doctors 
*     parameters: 
*       - in: path 
*         name: id 
*         required: true 
*         schema: 
*           type: string 
*     responses: 
*       200: 
*         description: Doctor found 
*       404: 
*         description: Doctor not found 
*       500: 
*         description: Internal server error 
*/ 
};

createDoctor = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log(req.body);
        const newDoctor = await DoctorService.createDoctor(req.body);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Doctor', error });
    }


    // ** COMMENTED OUT FOR NOW JUST FOR REFERENCE POINT BEFORE I MAKE THE ZOD SCHEMA's FOR VALIDATION **

  const validation = createDoctorZSchema.safeParse(req.body);

    console.log

    if (!validation.success){
        res.status(400).json({message: 'Invalid Doctor data', errors: validation.error.issues });
        return;
    }

    /**
     * @openapi
     * /Doctors:
     *   post:
     *    summary: Create a new Doctor
     *    tags:
     *     - Doctors
     *   requestBody:
     *    required: true
     *   content:
     *    application/json:
     *    schema:
     *    $ref: '#/components/schemas/CreateDoctorInput'
     *   responses:
     *    201:
     *    description: Successfully created Doctor
     *   400:
     *   description: Bad request
     *  500:
     *  description: Internal server error
     */
};
 

 // UPDATE a Doctor by its ID
updateDoctor = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const updatedDoctor = await DoctorService.updateDoctor(id, req.body);
        if (!updatedDoctor){
            res.status(404).json({message: 'Doctor not found'});
            return;
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Doctor', error });
    }


    // Validaiton for the Doctor Schema (Needs updating from the Doctor ZOD Schema)
    const validation = updateDoctorZSchema.safeParse(req.body);

    console.log
    
    if (!validation.success){
        res.status(400).json({message: 'Invalid Doctor data', errors: validation.error.issues });
        return;
    }
    
};

 // DELETE a Doctor
deleteDoctor = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const deletedDoctor = await DoctorService.deleteDoctor(id);
        if(!deletedDoctor){
            res.status(404).json({message: 'Doctor not found'});
            return;
        }
        res.status(200).json(deletedDoctor);
    } catch(erorr){
        res.status(200).json({ success: true});
    }
};
}