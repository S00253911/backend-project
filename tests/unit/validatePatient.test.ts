import { createPatientZSchema } from "../../src/models/patients";

const validPatient = {
    "firstName" : "John",
    "lastName" : "Doe",
    "age": 24,
    "eirCode": "F26 F8V3"
}

describe ('Test Patient Validation', () => {
    it('should pass for the following valid data', () => {
        expect(() => createPatientZSchema.parse(
            validPatient)).not.toThrow();
        });

    it('should fail for the following invalid age - no age', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "age" : undefined})).toThrow();
        });

    it('should fail for the too short name', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "firstName" : ''})).toThrow();
    });

    it('should fail for the unparsaable age ', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "age" : '24'})).toThrow();
    });

    it('should fail for the missing eirCode ', () => {
        expect(() => createPatientZSchema.parse(
            {...validPatient, "eirCode" : '' })).toThrow();
    });
});
