import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll (async () => {
    await connectDB();
});

describe("GET /doctors", () => {

    it('returns all doctorss', async () => {
        const response = await request(app)
        .get('/api/doctors');

        expect(response.status).toBe(200);
        console.log('Get all doctors test response:', response.body);
    });
// RETURNS DOCTORS BY ID
    it ('returns a doctors by its ID', async () => {
        const newdoctors = {
            "title" : "Dr",
            "firstName" : "John",
            "lastName": "Martin",
            "specialization": "Surgeon",
            "age": 43
        };
        const postResponse = await request(app)
        .post('/api/doctors')
        .send(newdoctors);
        const response = await request(app)
        .get(`/api/doctors/${postResponse.body._id}`)

        expect(postResponse.status).toBe(201);
        console.log('Post doctors test response:', postResponse.body);
        
        expect(response.status).toBe(200);
        console.log('Get doctors by ID test response:', response.body);
    });
// RETURNS 404 FOR NON-EXISTENT doctors ID
    it ('returns 404 for a non-existent doctors ID', async () => {
        const response = await request(app)
        .get('/api/doctors/999234');

        expect (response.status).toBe(404);
        console.log('Non-existent doctors test response:', response.body);
    });
// CREATES A NEW doctors
    it ('creates a new doctors', async () => {
        const newdoctors = {
           "title" : "Dr",
            "firstName" : "John",
            "lastName": "Martin",
            "specialization": "Surgeon",
            "age": 43
        };
        const response = await request(app)
        .post('/api/doctors')
        .send(newdoctors);

        expect(response.status).toBe(201);
        console.log('Create doctors test response:', response.body);    
    });
// DELETES A doctors
    it ('deleted a doctors', async () => {
        const response = await request(app)
        .delete('/api/doctors/1');

        expect(response.status).toBe(200);
        console.log('Delete doctors test response:', response.body);
    });
// RETURNS 404 NOT FOUND FOR NOT EXISTANT DOCTORS
    it ('returns 404 when deleting a non-existent doctors', async () => {
        const response = await request(app)
        .delete('/api/doctors/999');

        expect(response.status).toBe(404);
        console.log('Delete non-existent doctors test response:', response.body);
    });
// UPDATES doctors
    it ('updates a doctors', async () => {
        const updateddoctors = {
            "title" : "Jr",
            "firstName" : "Polly",
            "lastName": "Swagger",
            "specialization": "Neurologist",
            "age": 72
        };
        const response = await request(app)
        .put('/api/doctors/1')
        .send(updateddoctors);

        expect(response.status).toBe(200);
        console.log('Update doctors test response:', response.body);
    });
// 404 WHEN UPDATING NON-EXISTENT doctors
    it ('returns 404 when updating a non-existent doctors', async () => {
        const updateddoctors = {
            "title" : "Dr",
            "firstName" : "Johnny",
            "lastName": "Test",
            "specialization": "Lab Rat",
            "age": 43
        };
        const response = await request(app)
        .put('/api/doctors/999')
        .send(updateddoctors);
        expect(response.status).toBe(404);
        console.log('Update non-existent doctors test response:', response.body);
    });
// 400 WHEN CREATING doctors WITH INVALID DATA
    it ('returns 400 when creating a doctors with invalid data', async () => {
        const invaliddoctors = {
            "title" : "a",
            "firstName" : "",
            "lastName": "Martin",
            "specialization": "Surgeon",
            "age": 43
        };
        const response = await request(app)
        .post('/api/doctors')
        .send(invaliddoctors);

        expect(response.status).toBe(400);
        console.log('Invalid create test response:', response.body);
    });
// 400 WHEN UPDATING doctors WITH INVALID DATA
    it ('returns 400 when updating a doctors with invalid data', async () => {
        const invaliddoctors = {
            "title" : "A",
            "firstName" : "Perfecty",
            "lastName": "Good",
            "specialization": "Surgeon",
            "age": 13
        };
        const response = await request(app)
        .put('/api/doctors/1')
        .send(invaliddoctors);
        expect(response.status).toBe(400);
        console.log('Invalid update test response:', response.body);
    });
// 500 WHEN SERVER ERROR
    it ('returns 500 when there is a server error', async () => {
        const response = await request(app)
        .get('/api/doctors/error');
        expect(response.status).toBe(500);
        console.log('Server error test response:', response.body);
    });
});