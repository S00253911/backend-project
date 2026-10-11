import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll (async () => {
    await connectDB();
});

describe("GET /medicalrecords", () => {

    it('returns all medicalrecordss', async () => {
        const response = await request(app)
        .get('/api/medicalrecords');

        expect(response.status).toBe(200);
        console.log('Get all medicalrecords test response:', response.body);
    });
// RETURNS medicalrecords BY ID
    it ('returns a medicalrecords by its ID', async () => {
        const newmedicalrecords = {
            "date" : "2026-10-05",
            "diagnosis" : "Kidney Failure",
            "treatment": "Surgery",
            "prescription": "Morphine"
        };
        const postResponse = await request(app)
        .post('/api/medicalrecords')
        .send(newmedicalrecords);
        const response = await request(app)
        .get(`/api/medicalrecords/${postResponse.body._id}`)

        expect(postResponse.status).toBe(201);
        console.log('Post medicalrecords test response:', postResponse.body);
        
        expect(response.status).toBe(200);
        console.log('Get medicalrecords by ID test response:', response.body);
    });
// RETURNS 404 FOR NON-EXISTENT medicalrecords ID
    it ('returns 404 for a non-existent medicalrecords ID', async () => {
        const response = await request(app)
        .get('/api/medicalrecords/999234');

        expect (response.status).toBe(404);
        console.log('Non-existent medicalrecords test response:', response.body);
    });
// CREATES A NEW medicalrecords
    it ('creates a new medicalrecords', async () => {
        const newmedicalrecords = {
            "date" : "2026-10-05",
            "diagnosis" : "Kidney Failure",
            "treatment": "Surgery",
            "prescription": "Morphine + Juice"
        };
        const response = await request(app)
        .post('/api/medicalrecords')
        .send(newmedicalrecords);

        expect(response.status).toBe(201);
        console.log('Create medicalrecords test response:', response.body);    
    });
// DELETES A medicalrecords
    it ('deleted a medicalrecords', async () => {
        const response = await request(app)
        .delete('/api/medicalrecords/1');

        expect(response.status).toBe(200);
        console.log('Delete medicalrecords test response:', response.body);
    });
// RETURNS 404 NOT FOUND FOR NOT EXISTANT medicalrecords
    it ('returns 404 when deleting a non-existent medicalrecords', async () => {
        const response = await request(app)
        .delete('/api/medicalrecords/999');

        expect(response.status).toBe(404);
        console.log('Delete non-existent medicalrecords test response:', response.body);
    });
// UPDATES medicalrecords
    it ('updates a medicalrecords', async () => {
        const updatedmedicalrecords = {
            "date" : "2026-12-13",
            "diagnosis" : "Heart Palpatations",
            "treatment": "Dietary Restrictions",
            "prescription": "Eat Lots Of Celery"
        };
        const response = await request(app)
        .put('/api/medicalrecords/1')
        .send(updatedmedicalrecords);

        expect(response.status).toBe(200);
        console.log('Update medicalrecords test response:', response.body);
    });
// 404 WHEN UPDATING NON-EXISTENT medicalrecords
    it ('returns 404 when updating a non-existent medicalrecords', async () => {
        const updatedmedicalrecords = {
            "date" : "2026-10-05",
            "diagnosis" : "Kidney Failure",
            "treatment": "Surgery",
            "prescription": "Morphine + Juice"
        };
        const response = await request(app)
        .put('/api/medicalrecords/999')
        .send(updatedmedicalrecords);
        expect(response.status).toBe(404);
        console.log('Update non-existent medicalrecords test response:', response.body);
    });
// 400 WHEN CREATING medicalrecords WITH INVALID DATA
    it ('returns 400 when creating a medicalrecords with invalid data', async () => {
        const invalidmedicalrecords = {
            "date" : "",
            "diagnosis" : "",
            "treatment": "Surgery",
            "prescription": "Morphine + Juice"
        };
        const response = await request(app)
        .post('/api/medicalrecords')
        .send(invalidmedicalrecords);

        expect(response.status).toBe(400);
        console.log('Invalid create test response:', response.body);
    });
// 400 WHEN UPDATING medicalrecords WITH INVALID DATA
    it ('returns 400 when updating a medicalrecords with invalid data', async () => {
        const invalidmedicalrecords = {
             "date" : "2026-1",
            "diagnosis" : "",
            "treatment": "Surgery",
            "prescription": "Morphine + Juice"
        };
        const response = await request(app)
        .put('/api/medicalrecords/1')
        .send(invalidmedicalrecords);
        expect(response.status).toBe(400);
        console.log('Invalid update test response:', response.body);
    });
// 500 WHEN SERVER ERROR
    it ('returns 500 when there is a server error', async () => {
        const response = await request(app)
        .get('/api/medicalrecords/error');
        expect(response.status).toBe(500);
        console.log('Server error test response:', response.body);
    });
});