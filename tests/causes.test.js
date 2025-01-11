import { test, before, after, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
// import fs from 'fs/promises';
import app from '../app.js';

let causeIds = [];
const invalidEmails =[
    'test',
    'test@',
    'test@com',
    'test@.com.',
    'test@.com@',
    'test@.com@.com',
    ]
const invalidAmounts = [
    'test',
    'te11',
    '0231!',
    '123_',
    0,
    -1,
    '-1',
    '-0.1',    
    ]
before(async () => {
    // Clear the test database
    //   await fs.writeFile('db.json', JSON.stringify({ causes: [] }));
});

after(async () => {
    // Remove the test database
    //   await fs.unlink('db_test.json');
});

describe('Causes API TESTS', () => {
    before(async () => {
        // Clear the test database
        // await fs.writeFile('db.json', JSON.stringify({ causes: [] }));
    });

    after(async () => {
        // Remove the test database
        // await fs.unlink('db_test.json');
    });
    test('GET /causes should retrieve all causes', async () => {
        const response = await request(app)
        .get('/causes')        
        .expect('Content-Type', /json/)
        .expect(200);
        assert(Array.isArray(response.body.data));
    });
    describe('POST /causes', () => {
        test('should create a new cause with status code 201, and return the created cause', async () => {
            const response = await request(app)
                .post('/causes')
                .set('Content-Type', 'application/json')
                .send({
                    title: 'cause_name',
                    description: 'cause_description',
                    image_url: 'image_URL'
                })
                .expect('Content-Type', /json/)
                .expect(201);
            assert(response.body.hasOwnProperty('data'));
            assert.strictEqual(Array.isArray(response.body.data), true);
            assert(response.body.data[0].hasOwnProperty('id'));
            assert.strictEqual(response.body.data[0].title, 'cause_name');
            assert.strictEqual(response.body.data[0].description, 'cause_description');
            assert.strictEqual(response.body.data[0].image_url, 'image_URL');
        });
        describe('should return a 400 status code if any of the required fields are missing', () => {
            test('should return a 400 status code if a empty body is sent', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send()
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 400 status code if title is missing', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        description: 'cause_description',
                        image_url: 'image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 400 status code if description is missing', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'cause_name',
                        image_url: 'image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 400 status code if image_url is missing', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'cause_name',
                        description: 'cause_description',
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
        });
        describe('should return a 400 status code if any of the required fields is empty', () => {
            test('should return a 400 status code if all required fields are empty', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        title: '',
                        description: '',
                        image_url: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 400 status code if title is empty', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        title: '',
                        description: 'cause_description',
                        image_url: 'image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 400 status code if description is empty', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'cause_name',
                        description: '',
                        image_url: 'image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 400 status code if image_url is empty', async () => {
                const response = await request(app)
                    .post('/causes')
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'cause_name',
                        description: 'cause_description',
                        image_url: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(400);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
        });
    });
    describe('GET /causes:id', () => {
        let causeId;
        before(async () => {
            const response = await request(app).get('/causes');
            causeId = response.body.data[0].id;
        })
        test('should retrieve a specific cause by ID with status code 200', async () => {            
            const response = await request(app)
            .get(`/causes/${causeId}`)
            .expect('Content-Type', /json/)
            .expect(200);
            assert.strictEqual(Array.isArray(response.body.data), true);
            assert(response.body.data[0].hasOwnProperty('id'));
            assert.strictEqual(response.body.data[0].id, causeId);
            assert(response.body.data[0].hasOwnProperty('title'));
            assert(response.body.data[0].hasOwnProperty('description'));
            assert(response.body.data[0].hasOwnProperty('image_url'));
        });
        test('should return a 404 status code if the cause is not found, with error message(string)', async () => {
            const response = await request(app)
            .get(`/causes/${Date.now()}`)            
            .expect('Content-Type', /json/)
            .expect(404);
            assert.strictEqual(Array.isArray(response.body.data), true);
            assert.strictEqual(typeof response.body.data[0], 'string');
        });

    });
    describe('PUT /causes:id', () => {
        let causeId;
        before(async () => {
            const response = await request(app).get('/causes');
            causeId = response.body.data[0].id;
        })
        test('should edit a saved cause by ID with status code 201 and return the updated cause', async () => {
            const response = await request(app)
                .put(`/causes/${causeId}`)
                .set('Content-Type', 'application/json')
                .send({
                    title: 'updated_cause_name',
                    description: 'updated_cause_description',
                    image_url: 'updated_image_URL'
                })
                .expect('Content-Type', /json/)
                .expect(201);
            assert.strictEqual(response.body.data[0].id, causeId);
            assert.strictEqual(response.body.data[0].title, 'updated_cause_name');
            assert.strictEqual(response.body.data[0].description, 'updated_cause_description');
            assert.strictEqual(response.body.data[0].image_url, 'updated_image_URL');
        });
        describe('should return a 404 status code if any of the required fields are missing', () => {
            test('should return a 404 status code if a empty body is sent', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send()
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if title is missing', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        description: 'updated_cause_description',
                        image_url: 'updated_image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if description is missing', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'updated_cause_name',
                        image_url: 'updated_image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if image_url is missing', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        description: 'updated_cause_description',
                        image_url: 'updated_image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
        });
        describe('should return a 404 status code if any of the required fields is empty', () => {
            test('should return a 404 status code if all required fields are empty', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        title: '',
                        description: '',
                        image_url: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if title is empty', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        title: '',
                        description: 'updated_cause_description',
                        image_url: 'updated_image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if description is empty', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'updated_cause_name',
                        description: '',
                        image_url: 'updated_image_URL'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if image_url is empty', async () => {
                const response = await request(app)
                    .put(`/causes/${causeId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        title: 'updated_cause_name',
                        description: 'updated_cause_description',
                        image_url: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
        });
        test('should return a 404 status code if the cause is not found', async () => {
            const response = await request(app)
                .put(`/causes/${Date.now()}`)
                .set('Content-Type', 'application/json')
                .send({
                    title: 'updated_cause_name',
                    description: 'updated_cause_description',
                    image_url: 'updated_image_URL'
                })
                .expect('Content-Type', /json/)
                .expect(404);
            assert.strictEqual(Array.isArray(response.body.data), true);
            assert.strictEqual(typeof response.body.data[0], 'string');
        })
    });
    describe('POST /causes/:id/contribute', () => {
        let causeId;
        before(async () => {
            const response = await request(app).get('/causes');
            causeId = response.body.data[0].id;
        })
        test('should return a 201 status code if the cause is found and the contribution is successful', async () => {
            const response = await request(app)
                .post(`/causes/${causeId}/contribute`)
                .set('Content-Type', 'application/json')
                .send({
                    name: 'contributor_name',
                    email: 'test@test.com',
                    amount: '200'
                })
                .expect('Content-Type', /json/)
                .expect(201);
            assert.strictEqual(Array.isArray(response.body.data), true);
            assert.strictEqual.hasOwnProperty(response.body.data[0], 'id');
            assert.strictEqual(response.body.data[0].name, 'contributor_name');
            assert.strictEqual(response.body.data[0].email, 'test@test.com');
            assert.strictEqual(response.body.data[0].amount, '200');
            assert.strictEqual(Number(response.body.data[0].causeId), causeId);
        });
        test('should return a 404 status code if the cause is not found', async () => {
            const response = await request(app)
                .post(`/causes/${Date.now()}/contribute`)
                .expect('Content-Type', /json/)
                .expect(404);
            assert(Array.isArray(response.body.data));
            assert.strictEqual(typeof response.body.data[0], 'string');
        });
        describe('should return a 404 status code if any of the required fields are missing', () => {
            test('should return a 404 status code if a empty body is sent', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send()
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if name is missing', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        email: 'test@test.com',
                        amount: '200'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if email is missing', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: 'contributor_name',
                        amount: '200'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if amount is missing', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: 'contributor_name',
                        email: 'test@test.com',
                        amount: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
        });
        describe('should return a 404 status code if any of the required fields is empty', () => {
            test('should return a 404 status code if all required fields are empty', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: '',
                        email: '',
                        amount: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if name is empty', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        email: 'test@test.com',
                        amount: '200'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if email is empty', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: 'contributor_name',
                        email: '',
                        amount: '200'
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
            test('should return a 404 status code if amount is empty', async () => {
                const response = await request(app)
                    .post(`/causes/${causeId}/contribute`)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: 'contributor_name',
                        email: 'test@test.com',
                        amount: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(404);
                assert.strictEqual(Array.isArray(response.body.data), true);
                assert.strictEqual(typeof response.body.data[0], 'string');
            });
        });
        describe('invalid emails should return a 404 status code', () => {
            invalidEmails.forEach(email => {
                test(`should return a 404 status code if email is ${email}`, async () => {
                    const response = await request(app)
                        .post(`/causes/${causeId}/contribute`)
                        .set('Content-Type', 'application/json')
                        .send({
                            name: 'contributor_name',
                            email,
                            amount: '200'
                        })
                        .expect('Content-Type', /json/)
                        .expect(404);
                    assert.strictEqual(Array.isArray(response.body.data), true);
                    assert.strictEqual(typeof response.body.data[0], 'string');
                });
            })
        })
        describe('invalid amounts should return a 404 status code', () => {
            invalidAmounts.forEach(amount => {
                test(`should return a 404 status code if amount is ${amount}`, async () => {
                    const response = await request(app)
                        .post(`/causes/${causeId}/contribute`)
                        .set('Content-Type', 'application/json')
                        .send({
                            name: 'contributor_name',
                            email: 'test@test.com',
                            amount
                        })
                        .expect('Content-Type', /json/)
                        .expect(404);
                    assert.strictEqual(Array.isArray(response.body.data), true);
                    assert.strictEqual(typeof response.body.data[0], 'string');
                });
            })
        })
    });
    describe('DELETE /causes/:id', () => {
        let causeId;
        before(async () => {
            const response = await request(app).get('/causes');
            causeId = response.body.data[0].id;
        })
        test('should delete cause by a valid causeId and return a 201 status code', async () => {
            const response = await request(app).delete(`/causes/${causeId}`);
            assert.strictEqual(response.status, 201);
            assert(Array.isArray(response.body.data));
        });
        test('should return a 404 status code if the cause is not found', async () => {
            const response = await request(app).delete(`/causes/${Date.now()}`);
            assert.strictEqual(response.status, 404);
            assert(Array.isArray(response.body.data));
            assert.strictEqual(typeof response.body.data[0], 'string');
        })
        //     // Verify the cause has been deleted
//     const getResponse = await request(app).get(`/causes/${causeId}`);
//     assert.strictEqual(getResponse.status, 404);
// });
    });
})

after(async () => { // close the process after all tests 
    setTimeout(() => process.exit(), 1000); // a short delay to ensure all pending operations are completed 
});