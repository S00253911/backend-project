import { createPatientZSchema } from "../../src/models/patients";

const validPatient = {
    "firstName" : "John",
    "lastName" : "Doe",
    "age": 24,
    "eirCode": "F26 F8V3"
}

describe ('Test Car Validation', () => {
    it('should pass for the following valid data', () => {
        expect(() => createPatientZSchema.parse(
            validPatient)).not.toThrow();
        });

    it('should pass for the following valid data - no date', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "firstName" : undefined})).not.toThrow();
        });

    it('should fail for the too short name', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "firstName" : ''})).toThrow();
    });

    it('should fail for the unparsaable age ', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "year" : '24'})).toThrow();
    });

    it('should fail for the missing eirCode ', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "eirCode" : '' })).toThrow();
    });
});
