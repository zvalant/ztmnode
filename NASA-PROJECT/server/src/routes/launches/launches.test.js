const request = require('supertest');
const app = require('../../app');
const {mongoConnect, mongoDisconnect} = require('../../services/mongo')
const apiVersion = '/v1'

describe('Launches API', ()=>{
    beforeAll(async ()=>{
        await mongoConnect();
    })
    afterAll(async ()=>{
        await mongoDisconnect();
    })

    describe('Test GET /launches',()=>{
        test('It should respond with 200 success', async ()=>{
            const response = await request(app)
                .get(`${apiVersion}/launches`)
                .expect('Content-Type', /json/)
                .expect(200);
    
        });
    });
    describe('Test POST /launch', ()=>{
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-442 b',
            launchDate: 'January 1 2035',
        }
        const launchDataWithoutData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-442 b',
        }
        test('It should respond with 201 success', async ()=>{
            const response = await request(app)
                .post(`${apiVersion}/launches`)
                .send({
                    mission: 'USS Enterprise',
                    rocket: 'NCC 1701-D',
                    target: 'Kepler-442 b',
                    launchDate: 'January 1 2035',
                })
                .expect('Content-Type', /json/)
                .expect(201);
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(response.body).toMatchObject(launchDataWithoutData);
      
    
        });
        test('It should catch missing grequired properties', async ()=>{
            const response = await request(app)
                .post(`${apiVersion}/launches`)
                .send({
                    mission: 'USS Enterprise',
                    rocket: 'NCC 1701-D',
                    target: 'Kepler-442 b',
                })
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({err: "missing information"})
    
        });
        test('It should catch invalid dates', async ()=>{
            const response = await request(app)
                .post(`${apiVersion}/launches`)
                .send({
                    mission: 'USS Enterprise',
                    rocket: 'NCC 1701-D',
                    target: 'Kepler-442 b',
                    launchDate: 'Apple'
    
                })
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({err: "invalid launch data"})
    
        });
    });




})
