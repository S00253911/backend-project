import {CarModel, ICar} from '../models/cars';
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
    async getAllPatientsById(id: string): Promise<IPatient | null> {
        return await PatientModel.findById(id).lean();
    }
    async createPatient(patientData: IPatient): Promise<HydratedDocument<ICar>> {
        const car = new CarModel(patientData);
        return await car.save();
    }
// Doctors Block
    async getAllDoctors(): Promise<IDoctor[]>{
        return await DoctorModel.find().lean();
    }

    async getAllDoctorsById(id: string) : Promise <IDoctor | null>{
        return await DoctorModel.findById(id).lean();
    }
// Medical Records Block
    async getAllMedicalRecords(): Promise<IMedicalRecord[]>{
        return await MedicalRecordModel.find().lean();
    }
    async getAllmedicalRecords(id: string): Promise<IMedicalRecord | null>{
        return await MedicalRecordModel.findById(id).lean();
    }
// Appointments Block
    async getAllAppointments(): Promise<IAppointment[]>{
        return await AppointmentModel.find().lean();
    }

    async getAllAppointmentsById(id: string): Promise<IAppointment | null>{
        return await AppointmentModel.findById(id).lean();
    }
}

export class CarService {
    async getAllCars(): Promise<ICar[]> {
        return await CarModel.find().lean();
    }

    async getCarById(id: string): Promise<ICar | null> {
        return await CarModel.findById(id).lean();
    }
    
    async createCar(carData: ICar): Promise<HydratedDocument<ICar>> {
        const car = new CarModel(carData);
        return await car.save();
    }

    async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | null> {
        return await CarModel.findByIdAndUpdate(id, carData, {returnDocument: 'after'}).lean();
    }

    async deleteCar(id: string): Promise<ICar | null> {
        return await CarModel.findByIdAndDelete(id).lean();
    }
}