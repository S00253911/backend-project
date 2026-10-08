import { createCarZScheme } from "../../src/models/cars";

const validCar = {
    "make" : "Ryan",
    "model": "0871234567",
    "year": 1980
}

describe ('Test Car Validation', () => {
    it('should pass for the following valid data', () => {
        expect(() => createCarZScheme.parse(
            validCar)).not.toThrow();
        });

    it('should pass for the following valid data - no date', () => {
        expect(() => createCarZScheme.parse(
            {...validCar, "year" : undefined})).not.toThrow();
        });

    it('should fail for the too early year', () => {
        expect(() => createCarZScheme.parse(
            {...validCar, "year" : 1949})).toThrow();
    });

    it('should fail for the unparsaable year ', () => {
        expect(() => createCarZScheme.parse(
            {...validCar, "year" : 'wrong year'})).toThrow();
    });

    it('should fail for the missing make ', () => {
        expect(() => createCarZScheme.parse(
            {...validCar, "make" : '' })).toThrow();
    });
});
