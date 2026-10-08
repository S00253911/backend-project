import { model, Schema } from 'mongoose';
import { IPatient } from './patients'; // importing the IDoctor interface    

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