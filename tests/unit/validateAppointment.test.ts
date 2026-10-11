import { createAppointmentZSchema } from "../../src/models/appointments";

const validAppointment = {
    "date" : "2026-04-25",
    "time" : "5pm",
    "reason": "Hurting stomach"
}

describe ('Test Appointment Validation', () => {
    it('should pass for the following valid data', () => {
        expect(() => createAppointmentZSchema.parse(
            validAppointment)).not.toThrow();
        });

    it('should fail for the following invalid data - no date', () => {
        expect(() => createAppointmentZSchema.parse(
            {...validAppointment, "date" : undefined})).toThrow();
        });

    it('should fail for the too short reason', () => {
        expect(() => createAppointmentZSchema.parse(
            {...validAppointment, "reason" : 'Hurty Toe'})).toThrow();
    });

    it('should fail for the unparsaable date ', () => {
        expect(() => createAppointmentZSchema.parse(
            {...validAppointment, "date" : '2021-43-12'})).toThrow();
    });
});
