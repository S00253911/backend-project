import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll (async () => {
    await connectDB();
});

describe("GET /cars", () => {

    it('returns all cars', async () => {
        const response = await request(app)
        .get('/api/v1/cars');

        expect(response.status).toBe(200);
        console.log('Get all cars test response:', response.body);
    });

    it ('returns a car by its ID', async () => {
        const newCar = {
            make: 'Toyota',
            model: 'Camry',
            year: 2020
        };
        const postResponse = await request(app)
        .post('/api/v1/cars')
        .send(newCar);
        const response = await request(app)
        .get('/api/v1/cars/1')

        expect(postResponse.status).toBe(201);
        console.log('Post car test response:', postResponse.body);
        
        expect(response.status).toBe(200);
        console.log('Get car by ID test response:', response.body);
    });

    it ('returns 404 for a non-existent car ID', async () => {
        const response = await request(app)
        .get('/api/v1/cars/999234');

        expect (response.status).toBe(404);
        console.log('Non-existent car test response:', response.body);
    });

    it ('creates a new car', async () => {
        const newCar = {
            make: 'Toyota',
            model: 'Camry',
            year: 2020
        };
        const response = await request(app)
        .post('/api/v1/cars')
        .send(newCar);

        expect(response.status).toBe(201);
        console.log('Create car test response:', response.body);    
    });

    it ('deleted a car', async () => {
        const response = await request(app)
        .delete('/api/v1/cars/1');

        expect(response.status).toBe(200);
        console.log('Delete car test response:', response.body);
    });

    it ('returns 404 when deleting a non-existent car', async () => {
        const response = await request(app)
        .delete('/api/v1/cars/999');

        expect(response.status).toBe(404);
        console.log('Delete non-existent car test response:', response.body);
    });

    it ('updates a car', async () => {
        const updatedCar = {
            make: 'Honda',
            model: 'Civic',
            year: 2021
        };
        const response = await request(app)
        .put('/api/v1/cars/1')
        .send(updatedCar);

        expect(response.status).toBe(200);
        console.log('Update car test response:', response.body);
    });

    it ('returns 404 when updating a non-existent car', async () => {
        const updatedCar = {
            make: 'Honda',
            model: 'Civic',
            year: 2021
        };
        const response = await request(app)
        .put('/api/v1/cars/999')
        .send(updatedCar);
        expect(response.status).toBe(404);
        console.log('Update non-existent car test response:', response.body);
    });

    it ('returns 400 when creating a car with invalid data', async () => {
        const invalidCar = {
            make: '',
            model: '',
            year: 2020
        };
        const response = await request(app)
        .post('/api/v1/cars')
        .send(invalidCar);

        expect(response.status).toBe(400);
        console.log('Invalid create test response:', response.body);
    });

    it ('returns 400 when updating a car with invalid data', async () => {
        const invalidCar = {
            make: '',
            model: '',
            year: 2020
        };
        const response = await request(app)
        .put('/api/v1/cars/1')
        .send(invalidCar);
        expect(response.status).toBe(400);
        console.log('Invalid update test response:', response.body);
    });

    it ('returns 500 when there is a server error', async () => {
        const response = await request(app)
        .get('/api/v1/cars/error');
        expect(response.status).toBe(500);
        console.log('Server error test response:', response.body);
    });
});