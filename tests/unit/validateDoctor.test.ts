import { createDoctorZSchema } from "../../src/models/doctors";

const validDoctor = {
    "title" : "Dr",
    "firstName" : "John",
    "lastName": "Martin",
    "specialization": "Surgeon",
    "age": 43
}

describe ('Test Doctor Validation', () => {
    it('should pass for the following valid data', () => {
        expect(() => createDoctorZSchema.parse(
            validDoctor)).not.toThrow();
        });

    it('should fail for the following invalid specialization - no specialization', () => {
        expect(() => createDoctorZSchema.parse(
            {...validDoctor, "specialization" : undefined})).toThrow();
        });

    it('should fail for the too short title', () => {
        expect(() => createDoctorZSchema.parse(
            {...validDoctor, "title" : 'A'})).toThrow();
    });

    it('should fail for the wrong age ', () => {
        expect(() => createDoctorZSchema.parse(
            {...validDoctor, "age" : 15})).toThrow();
    });

    it('should fail for the missing first name ', () => {
        expect(() => createDoctorZSchema.parse(
            {...validDoctor, "firstName" : '' })).toThrow();
    });
});
