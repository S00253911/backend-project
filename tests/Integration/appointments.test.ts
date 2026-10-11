import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll (async () => {
    await connectDB();
});

describe("GET /appointments", () => {

    it('returns all appointments', async () => {
        const response = await request(app)
        .get('/api/appointments');

        expect(response.status).toBe(200);
        console.log('Get all appointments test response:', response.body);
    });
// RETURNS APPOINTMENT BY ID
    it ('returns a appointments by its ID', async () => {
        const newappointments = {
            "date" : "2026-04-25",
            "time" : "5pm",
            "reason": "Hurting stomach"
        };
        const postResponse = await request(app)
        .post('/api/appointments')
        .send(newappointments);
        const response = await request(app)
        .get(`/api/appointments/${postResponse.body._id}`)

        expect(postResponse.status).toBe(201);
        console.log('Post appointments test response:', postResponse.body);
        
        expect(response.status).toBe(200);
        console.log('Get appointments by ID test response:', response.body);
    });
// RETURNS 404 FOR NON-EXISTENT appointments ID
    it ('returns 404 for a non-existent appointments ID', async () => {
        const response = await request(app)
        .get('/api/appointments/999234');

        expect (response.status).toBe(404);
        console.log('Non-existent appointments test response:', response.body);
    });
// CREATES A NEW appointments
    it ('creates a new appointments', async () => {
        const newappointments = {
            "date" : "2026-04-25",
            "time" : "5pm",
            "reason": "Hurting stomach"
        };
        const response = await request(app)
        .post('/api/appointments')
        .send(newappointments);

        expect(response.status).toBe(201);
        console.log('Create appointments test response:', response.body);    
    });
// DELETES A appointments
    it ('deleted a appointments', async () => {
        const response = await request(app)
        .delete('/api/appointments/1');

        expect(response.status).toBe(200);
        console.log('Delete appointments test response:', response.body);
    });
// RETURNS 404 NOT FOUND FOR NOT EXISTANT APPOINTMENT
    it ('returns 404 when deleting a non-existent appointments', async () => {
        const response = await request(app)
        .delete('/api/appointments/999');

        expect(response.status).toBe(404);
        console.log('Delete non-existent appointments test response:', response.body);
    });
// UPDATES appointments
    it ('updates a appointments', async () => {
        const updatedappointments = {
            "date" : "2026-04-25",
            "time" : "5pm",
            "reason": "Hurting stomach"
        };
        const response = await request(app)
        .put('/api/appointments/1')
        .send(updatedappointments);

        expect(response.status).toBe(200);
        console.log('Update appointments test response:', response.body);
    });
// 404 WHEN UPDATING NON-EXISTENT appointments
    it ('returns 404 when updating a non-existent appointments', async () => {
        const updatedappointments = {
            "date" : "2026-12-25",
            "time" : "8am",
            "reason": "vomitting bug"
        };
        const response = await request(app)
        .put('/api/appointments/999')
        .send(updatedappointments);
        expect(response.status).toBe(404);
        console.log('Update non-existent appointments test response:', response.body);
    });
// 400 WHEN CREATING appointments WITH INVALID DATA
    it ('returns 400 when creating a appointments with invalid data', async () => {
        const invalidappointments = {
            "date" : "2026-04-25",
            "time" : "5pm",
            "reason": "Bad Nail"
        };
        const response = await request(app)
        .post('/api/appointments')
        .send(invalidappointments);

        expect(response.status).toBe(400);
        console.log('Invalid create test response:', response.body);
    });
// 400 WHEN UPDATING appointments WITH INVALID DATA
    it ('returns 400 when updating a appointments with invalid data', async () => {
        const invalidappointments = {
            "date" : "",
            "time" : "",
            "reason": "Hurting stomach"
        };
        const response = await request(app)
        .put('/api/appointments/1')
        .send(invalidappointments);
        expect(response.status).toBe(400);
        console.log('Invalid update test response:', response.body);
    });
// 500 WHEN SERVER ERROR
    it ('returns 500 when there is a server error', async () => {
        const response = await request(app)
        .get('/api/appointments/error');
        expect(response.status).toBe(500);
        console.log('Server error test response:', response.body);
    });
});