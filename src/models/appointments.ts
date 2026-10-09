import {Schema, model} from 'mongoose';
import { IPatient } from './patients';
import { IDoctor } from './doctors';
import { z } from 'zod';

export const createAppointmentZSchema = z.object({
    date: z.date(),
    time: z.string(),
    reason: z.string().min(1)

});

export const updateAppointmentZSchema = z.object({
    date: z.date(),
    time: z.string(),
    reason: z.string().min(1)
});

export interface IAppointment{ // Patient Appointment Interface
    patient: IPatient;
    doctor: IDoctor;
    date: Date;
    time: string;
    reason: string;
}

const appointmentSchema = new Schema<IAppointment>(
    {
        patient: {type: Schema.Types.ObjectId, ref: 'Patient'},
        doctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
        date: {type: Date, required: true},
        time: {type: String, required: true},
        reason: {type: String, required: true}
    },
    {timestamps: true}
);

export const AppointmentModel = model<IAppointment>('Appointment', appointmentSchema);