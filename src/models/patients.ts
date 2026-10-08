import { model, Schema } from 'mongoose';
import { IDoctor } from './doctors'; // importing the IDoctor interface

export interface IPatient{ // Patient Interface
    firstName: string;
    lastName: string;
    age: Number;
    nextofKin: string;
    address: string;
    attendingDoctor: IDoctor;
}


const patientSchema = new Schema<IPatient>(
{
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, min: 0},
    nextofKin: {type: String, required: false},
    address: {type: String, required: true},
    attendingDoctor: {type: Schema.Types.ObjectId, ref: 'Doctor'}
},
{timestamps: true}
);

export const PatientModel = model<IPatient>('Patient', patientSchema);