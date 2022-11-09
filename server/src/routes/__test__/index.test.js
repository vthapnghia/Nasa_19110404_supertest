const app = require('../../app');
const request = require('supertest');

describe('test project nasa', () => {
    it('test get planest', async () => {
        const res = await request(app).get('/planest').send();
        expect(res.statusCode).toEqual(200);
    })


    it('test get launches', async () => {
        const res = await request(app).get('/launches').send();
        expect(res.statusCode).toEqual(200);
    })

    it('test add launches', async () => {
        const res = await request(app).post('/launches').send({
            mission: 'mission',
            rocket:  'rocket',
            launchDate: "December 27, 2030",
            target: "target",
        });
        expect(res.statusCode).toEqual(201);
    })

    it('test add launches invalid date', async () => {
        const res = await request(app).post('/launches').send({
            mission: 'mission',
            rocket:  'rocket',
            launchDate: "27, 2030",
            target: "target",
        });
        expect(res.statusCode).toEqual(400);
    })

    it('test add launches without target', async () => {
        const res = await request(app).post('/launches').send({
            mission: 'mission',
            rocket:  'rocket',
            launchDate: "December 27, 2030",
        });
        expect(res.statusCode).toEqual(400);
    })

    it('test delete launches', async () => {
        const res = await request(app).delete('/launches/100').send();
        expect(res.statusCode).toEqual(200);
    })

     it('test delete launches not found launchID', async () => {
        const res = await request(app).delete('/launches/1000').send();
        expect(res.statusCode).toEqual(400);
    })
})