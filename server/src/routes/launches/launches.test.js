const request = require('supertest');
const app = require('../../app');
const {
    mongoConnect,
    mongoDisconnect
 } = require('../../services/mongo');

  
describe('Launches Api', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => { 
        test('It should  respond with 200 success', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST lauches', () => {
        const completeLaunchData = {
            mission: 'trolsky',
            rocket: 'NCC 17701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4 2028'
        };
    
        const launchDataWithOutTheDate =  {
            mission: 'trolsky',
            rocket: 'NCC 17701-D',
            target: 'Kepler-62 f',
        };

        const launchDataWithInvalidDate = {
            mission: 'trolsky',
            rocket: 'NCC 17701-D',
            target: 'Kepler-62 f',
            launchDate: 'sup'
        };;

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithOutTheDate)
                .expect('Content-Type', /json/)
                .expect(400);

                expect(response.body).toStrictEqual({
                    error: 'Missing required launch property'
                });
        });

        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400)

                expect(response.body).toStrictEqual({
                    error: 'Invalid launch date'
                });
        });
    });
});