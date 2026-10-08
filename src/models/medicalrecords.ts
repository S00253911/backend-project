import {Schema, model} from 'mongoose';
import { IPatient } from './patients';
import { IDoctor } from './doctors';


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
        prescription: {type: String, required: true}
    },
    {timestamps: true}
);

export const MedicalRecordModel = model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);