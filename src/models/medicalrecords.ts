import {Schema, model} from 'mongoose';
import { IPatient } from './patients';
import { IDoctor } from './doctors';
import { z } from 'zod';

export const createMedicalRecordZSchema = z.object({
    date: z.coerce.date(),
    diagnosis: z.string().min(1),
    treatment: z.string().min(1),
    prescription: z.string().min(10)
});

export const updateMedicalRecordZSchema = z.object({
    date: z.coerce.date(),
    diagnosis: z.string().min(1),
    treatment: z.string().min(1),
    prescription: z.string().min(1)
});

export interface IMedicalRecord{ // Patients Medical Record
    patient: IPatient;
    doctor: IDoctor;
    date: Date;
    diagnosis: string;
    treatment: string;
    prescription: string;
}

const medicalRecordSchema = new Schema<IMedicalRecord>(
    {
        patient: {type: Schema.Types.ObjectId, ref: 'Patient'},
        doctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
        date: {type: Date, required: true},
        diagnosis: {type: String, required: true},
        treatment: {type: String, required: true},
        prescription: {type: String, required: false}
    },
    {timestamps: true}
);

export const MedicalRecordModel = model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);