import { createMedicalRecordZSchema } from "../../src/models/medicalrecords";

const validMedicalRecord = {
    "date" : "2026-10-05",
    "diagnosis" : "Kidney Failure",
    "treatment": "Surgery",
    "prescription": "Morphine + Juice"
}

describe ('Test Medical Record Validation', () => {
    it('should pass for the following valid data', () => {
        expect(() => createMedicalRecordZSchema.parse(
            validMedicalRecord)).not.toThrow();
        });

    it('should fail for the following invalid data - no date', () => {
        expect(() => createMedicalRecordZSchema.parse(
            {...validMedicalRecord, "date" : undefined})).toThrow();
        });

    it('should fail for the too short prescription', () => {
        expect(() => createMedicalRecordZSchema.parse(
            {...validMedicalRecord, "prescription" : 'Bath'})).toThrow();
    });

    it('should fail for the unparsaable date ', () => {
        expect(() => createMedicalRecordZSchema.parse(
            {...validMedicalRecord, "date" : "not-a-date"})).toThrow();
    });

    it('should fail for the missing treatment ', () => {
        expect(() => createMedicalRecordZSchema.parse(
            {...validMedicalRecord, "treatment" : '' })).toThrow();
    });
});
