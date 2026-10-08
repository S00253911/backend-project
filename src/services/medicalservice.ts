import {HydratedDocument} from 'mongoose';
import { IPatient, PatientModel } from '../models/patients';
import { DoctorModel, IDoctor } from '../models/doctors';
import { IMedicalRecord, MedicalRecordModel } from '../models/medicalrecords';
import { AppointmentModel, IAppointment } from '../models/appointments';

export class MedicalService{
// Patients Block
    async getAllPatients(): Promise<IPatient[]> {
        return await PatientModel.find().lean();
    }

    async getPatientsById(id: string): Promise<IPatient | null> {
        return await PatientModel.findById(id).lean();
    }

    async createPatient(patientData: IPatient): Promise<HydratedDocument<IPatient>> {
        const patient = new PatientModel(patientData);
        return await patient.save();
    }

    async updatePatient(id: string, patientData: Partial<IPatient>): Promise<IPatient | null> {
        return await PatientModel.findByIdAndUpdate(id, patientData, {returnDocument: 'after'}).lean();
    }

    async deletePatient(id: string): Promise<IPatient | null> {
        return await PatientModel.findByIdAndDelete(id).lean();
    }
// Doctors Block
    async getAllDoctors(): Promise<IDoctor[]>{
        return await DoctorModel.find().lean();
    }

    async getDoctorsById(id: string) : Promise <IDoctor | null>{
        return await DoctorModel.findById(id).lean();
    }
    async createDoctor(doctorData: IDoctor): Promise<HydratedDocument<IDoctor>>{
        const doctor = new DoctorModel(doctorData);
        return await doctor.save();
    }

    async updateDoctor(id: string, doctorData: Partial<IDoctor>): Promise<IDoctor | null>{
        return await DoctorModel.findByIdAndUpdate(id, doctorData, {returnDocument: 'after'}).lean();
    }

    async deleteDoctor(id: string): Promise<IDoctor | null> {
        return await DoctorModel.findByIdAndDelete(id).lean();
    }
    
// Medical Records Block
    async getAllMedicalRecords(): Promise<IMedicalRecord[]>{
        return await MedicalRecordModel.find().lean();
    }

    async getMedicalRecordsById(id: string): Promise<IMedicalRecord | null>{
        return await MedicalRecordModel.findById(id).lean();
    }

    async createMedicalRecord(medicalRecordData: IMedicalRecord): Promise<HydratedDocument<IMedicalRecord>>{
        const record =  new MedicalRecordModel(medicalRecordData);
        return await record.save();
    }

    async updateMedicalRecord(id: string, medicalRecordData: Partial<IMedicalRecord>): Promise<IMedicalRecord | null>{
        return await MedicalRecordModel.findByIdAndUpdate(id, medicalRecordData, {returnDocument: 'after'}).lean();
    }

    async deleteMedicalRecord(id: string): Promise<IMedicalRecord | null> {
        return await MedicalRecordModel.findByIdAndDelete(id).lean();
    }

// Appointments Block
    async getAllAppointments(): Promise<IAppointment[]>{
        return await AppointmentModel.find().lean();
    }

    async getAppointmentsById(id: string): Promise<IAppointment | null>{
        return await AppointmentModel.findById(id).lean();
    }

    async createAppointment(appointmentData: IAppointment): Promise<HydratedDocument<IAppointment>>{
        const appointment = new AppointmentModel(appointmentData);
        return await appointment.save();
    }

    async updateAppointment(id: string, appointmentData: Partial<IAppointment>): Promise<IAppointment | null>{
        return await AppointmentModel.findByIdAndUpdate(id, appointmentData, {returnDocument: 'after'}).lean();
    }
    async deleteAppointment(id: string): Promise<IAppointment | null> {
        return await AppointmentModel.findByIdAndDelete(id).lean();
    }
}