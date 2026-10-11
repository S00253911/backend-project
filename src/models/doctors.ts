import { model, Schema } from 'mongoose';
import { IPatient } from './patients'; // importing the IDoctor interface    
import { z } from 'zod';

// ZOD Validation Schema for Creating a Doctor
export const createDoctorZSchema = z.object({
    title: z.string().min(2),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    specialization: z.string().min(5),
    age: z.number().min(18)

});
// ZOD Validation Schema for Updating a Doctor
export const updateDoctorZSchema = z.object({
    title: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    specialization: z.string().min(1),
    age: z.number().min(0)
});

export interface IDoctor{ // Doctor Interface
    title: string;
    firstName: string;
    lastName: string;
    specialization: string;
    age: Number;
    attendingPatients: IPatient[];
}

const doctorSchema = new Schema<IDoctor>(
    {
        title: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        specialization: {type: String, required: true},
        age: {type: Number, min: 0},
        attendingPatients: [{type: Schema.Types.ObjectId, ref: 'Patient'}]
    },
    {timestamps: true}
);

export const DoctorModel = model<IDoctor>('Doctor', doctorSchema);