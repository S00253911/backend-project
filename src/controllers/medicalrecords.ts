import { Request, Response } from 'express'; 
import { MedicalService } from '../services/medicalservice';

// ZOD Validation Schema's
//Import The Zod MedicalRecord Schema's from ../models later for  middleware authentication
import { createMedicalRecordZSchema } from '../models/medicalrecords';
import { updateMedicalRecordZSchema } from '../models/medicalrecords';
// Instantiate The MedicalService
const MedicalRecordService = new MedicalService();

export class MedicalRecordController {
    // GET all MedicalRecords 
getMedicalRecords = async (_req: Request, res: Response): Promise<void> => {
    try {
        const MedicalRecord = await MedicalRecordService.getAllMedicalRecords();
        res.status(200).json(MedicalRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching MedicalRecords', error });
    }
/**
 * @openapi
 *  /MedicalRecords:
 *    get:
 *        summary: Retrieve all MedicalRecords
 *        tags:
 *          - MedicalRecords
 *        responses: 
 *          200:
 *            description: Successfully retrieved MedicalRecords
 *          500:
 *            description: Internal server error
 */
};
// GET MedicalRecord by their Id
getMedicalRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const MedicalRecord = await MedicalRecordService.getMedicalRecordsById(id);
        if (!MedicalRecord) {
            res.status(404).json({ message: 'MedicalRecord not found' });
            return;
        }
        res.status(200).json(MedicalRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching MedicalRecord', error });
    }

/** 
* @openapi 
* /MedicalRecords/{id}: 
*   get: 
*     summary: Get a MedicalRecord by ID 
*     tags: 
*       - MedicalRecords 
*     parameters: 
*       - in: path 
*         name: id 
*         required: true 
*         schema: 
*           type: string 
*     responses: 
*       200: 
*         description: MedicalRecord found 
*       404: 
*         description: MedicalRecord not found 
*       500: 
*         description: Internal server error 
*/ 
};

createMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log(req.body);
        const newMedicalRecord = await MedicalRecordService.createMedicalRecord(req.body);
        res.status(201).json(newMedicalRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error creating MedicalRecord', error });
    }


    // ** COMMENTED OUT FOR NOW JUST FOR REFERENCE POINT BEFORE I MAKE THE ZOD SCHEMA's FOR VALIDATION **

  const validation = createMedicalRecordZSchema.safeParse(req.body);

    console.log

    if (!validation.success){
        res.status(400).json({message: 'Invalid MedicalRecord data', errors: validation.error.issues });
        return;
    }

    /**
     * @openapi
     * /MedicalRecords:
     *   post:
     *    summary: Create a new MedicalRecord
     *    tags:
     *     - MedicalRecords
     *   requestBody:
     *    required: true
     *   content:
     *    application/json:
     *    schema:
     *    $ref: '#/components/schemas/CreateMedicalRecordInput'
     *   responses:
     *    201:
     *    description: Successfully created MedicalRecord
     *   400:
     *   description: Bad request
     *  500:
     *  description: Internal server error
     */
};
 

 // UPDATE a MedicalRecord by its ID
updateMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const updatedMedicalRecord = await MedicalRecordService.updateMedicalRecord(id, req.body);
        if (!updatedMedicalRecord){
            res.status(404).json({message: 'MedicalRecord not found'});
            return;
        }
        res.status(200).json(updatedMedicalRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error updating MedicalRecord', error });
    }


    // Validaiton for the MedicalRecord Schema (Needs updating from the MedicalRecord ZOD Schema)
    const validation = updateMedicalRecordZSchema.safeParse(req.body);

    console.log
    
    if (!validation.success){
        res.status(400).json({message: 'Invalid MedicalRecord data', errors: validation.error.issues });
        return;
    }
    
};

 // DELETE a MedicalRecord
deleteMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const deletedMedicalRecord = await MedicalRecordService.deleteMedicalRecord(id);
        if(!deletedMedicalRecord){
            res.status(404).json({message: 'MedicalRecord not found'});
            return;
        }
        res.status(200).json(deletedMedicalRecord);
    } catch(erorr){
        res.status(200).json({ success: true});
    }
};
}