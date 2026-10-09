import { model, Schema } from 'mongoose';
import { IDoctor } from './doctors'; // importing the IDoctor interface
import { z } from 'zod';

export const createPatientZSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    age: z.number(),
    eirCode: z.string().min(1),
});

export const updatePatientZSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    age: z.number(),
    eirCode: z.string().min(1),
});

export interface IPatient{ // Patient Interface
    firstName: string;
    lastName: string;
    age: Number;
    eirCode: string;
    attendingDoctor: IDoctor;
}


const patientSchema = new Schema<IPatient>(
{
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, min: 0},
    eirCode: {type: String, required: true},
    attendingDoctor: {type: Schema.Types.ObjectId, ref: 'Doctor'}
},
{timestamps: true}
);

export const PatientModel = model<IPatient>('Patient', patientSchema);