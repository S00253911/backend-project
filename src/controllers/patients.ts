import { Request, Response } from 'express'; 
import { CarService } from '../services/cars';
import { MedicalService } from '../services/medicalservice';

// ZOD Validation Schema's
import { createCarZScheme } from '../models/cars';
import { updateCarZSchema } from '../models/cars';

const patientService = new MedicalService();



export class PatientController {
    // GET all Patients 
getPatients = async (_req: Request, res: Response): Promise<void> => {
    try {
        const patient = await patientService.getAllPatients();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
/**
 * @openapi
 *  /cars:
 *    get:
 *        summary: Retrieve all cars
 *        tags:
 *          - Cars
 *        responses: 
 *          200:
 *            description: Successfully retrieved cars
 *          500:
 *            description: Internal server error
 */
};
// GET Patient by their Id
getPatientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const patient = await patientService.getPatientsById(id);
        if (!patient) {
            res.status(404).json({ message: 'patient not found' });
            return;
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error });
    }

/** 
* @openapi 
* /cars/{id}: 
*   get: 
*     summary: Get a car by ID 
*     tags: 
*       - Cars 
*     parameters: 
*       - in: path 
*         name: id 
*         required: true 
*         schema: 
*           type: string 
*     responses: 
*       200: 
*         description: Car found 
*       404: 
*         description: Car not found 
*       500: 
*         description: Internal server error 
*/ 
};

createPatient = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log(req.body);
        const newPatient = await patientService.createPatient(req.body);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error });
    }


    // ** COMMENTED OUT FOR NOW JUST FOR REFERENCE POINT BEFORE I MAKE THE ZOD SCHEMA's FOR VALIDATION **

//   const validation = createCarZScheme.safeParse(req.body);

//     console.log

//     if (!validation.success){
//         res.status(400).json({message: 'Invalid car data', errors: validation.error.issues });
//         return;
//     }

    /**
     * @openapi
     * /cars:
     *   post:
     *    summary: Create a new car
     *    tags:
     *     - Cars
     *   requestBody:
     *    required: true
     *   content:
     *    application/json:
     *    schema:
     *    $ref: '#/components/schemas/CreateCarInput'
     *   responses:
     *    201:
     *    description: Successfully created car
     *   400:
     *   description: Bad request
     *  500:
     *  description: Internal server error
     */
};
 

 // UPDATE a car by its ID
updatePatient = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const updatedPatient = await patientService.updatePatient(id, req.body);
        if (!updatedPatient){
            res.status(404).json({message: 'Car not found'});
            return;
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }

    const validation = updateCarZSchema.safeParse(req.body);

    console.log
    
    if (!validation.success){
        res.status(400).json({message: 'Invalid car data', errors: validation.error.issues });
        return;
    }
    
};

 // DELETE a car
deletePatient = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const deletedPatient = await patientService.deletePatient(id);
        if(!deletedPatient){
            res.status(404).json({message: 'Car not found'});
            return;
        }
        res.status(200).json(deletedPatient);
    } catch(erorr){
        res.status(200).json({ success: true});
    }
};
}