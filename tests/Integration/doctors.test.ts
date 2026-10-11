import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll (async () => {
    await connectDB();
});

describe("GET /patient", () => {

    it('returns all patients', async () => {
        const response = await request(app)
        .get('/api/patient');

        expect(response.status).toBe(200);
        console.log('Get all patient test response:', response.body);
    });
// RETURNS PATEINT BY ID
    it ('returns a patient by its ID', async () => {
        const newpatient = {
            make: 'Toyota',
            model: 'Camry',
            year: 2020
        };
        const postResponse = await request(app)
        .post('/api/patient')
        .send(newpatient);
        const response = await request(app)
        .get('/api/patient/1')

        expect(postResponse.status).toBe(201);
        console.log('Post patient test response:', postResponse.body);
        
        expect(response.status).toBe(200);
        console.log('Get patient by ID test response:', response.body);
    });
// RETURNS 404 FOR NON-EXISTENT PATIENT ID
    it ('returns 404 for a non-existent patient ID', async () => {
        const response = await request(app)
        .get('/api/v1/patient/999234');

        expect (response.status).toBe(404);
        console.log('Non-existent patient test response:', response.body);
    });
// CREATES A NEW PATIENt
    it ('creates a new patient', async () => {
        const newpatient = {
            make: 'Toyota',
            model: 'Camry',
            year: 2020
        };
        const response = await request(app)
        .post('/api/v1/patient')
        .send(newpatient);

        expect(response.status).toBe(201);
        console.log('Create patient test response:', response.body);    
    });
// DELETES A PATIENT
    it ('deleted a patient', async () => {
        const response = await request(app)
        .delete('/api/v1/patient/1');

        expect(response.status).toBe(200);
        console.log('Delete patient test response:', response.body);
    });
// RETURNS 404 NOT FOUND FOR NOT EXISTANT PATEINT
    it ('returns 404 when deleting a non-existent patient', async () => {
        const response = await request(app)
        .delete('/api/v1/patient/999');

        expect(response.status).toBe(404);
        console.log('Delete non-existent patient test response:', response.body);
    });
// UPDATES PATIENT
    it ('updates a patient', async () => {
        const updatedpatient = {
            make: 'Honda',
            model: 'Civic',
            year: 2021
        };
        const response = await request(app)
        .put('/api/v1/patient/1')
        .send(updatedpatient);

        expect(response.status).toBe(200);
        console.log('Update patient test response:', response.body);
    });
// 404 WHEN UPDATING NON-EXISTENT PATIENT
    it ('returns 404 when updating a non-existent patient', async () => {
        const updatedpatient = {
            make: 'Honda',
            model: 'Civic',
            year: 2021
        };
        const response = await request(app)
        .put('/api/v1/patient/999')
        .send(updatedpatient);
        expect(response.status).toBe(404);
        console.log('Update non-existent patient test response:', response.body);
    });
// 400 WHEN CREATING PATIENT WITH INVALID DATA
    it ('returns 400 when creating a patient with invalid data', async () => {
        const invalidpatient = {
            make: '',
            model: '',
            year: 2020
        };
        const response = await request(app)
        .post('/api/v1/patient')
        .send(invalidpatient);

        expect(response.status).toBe(400);
        console.log('Invalid create test response:', response.body);
    });
// 400 WHEN UPDATING PATIENT WITH INVALID DATA
    it ('returns 400 when updating a patient with invalid data', async () => {
        const invalidpatient = {
            make: '',
            model: '',
            year: 2020
        };
        const response = await request(app)
        .put('/api/v1/patient/1')
        .send(invalidpatient);
        expect(response.status).toBe(400);
        console.log('Invalid update test response:', response.body);
    });
// 500 WHEN SERVER ERROR
    it ('returns 500 when there is a server error', async () => {
        const response = await request(app)
        .get('/api/v1/patient/error');
        expect(response.status).toBe(500);
        console.log('Server error test response:', response.body);
    });
});