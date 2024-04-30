import request from 'supertest';
import app from '../../src/app.js'; // Assurez-vous d'exporter votre app Express dans le fichier app.js

describe('Test des routes Pokémon', () => {
    test('GET /:name renvoie les données du Pokémon', async () => {
        const res = await request(app).get('/pokemon/pikachu');
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('pikachu');
    });

    test('GET /all/limit=:limit/offset=:offset renvoie le bon nombre de Pokémon', async () => {
        const res = await request(app).get('/pokemon/all/limit=10/offset=0');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(10);
    });

    test('GET /search/:name renvoie tous les Pokémon dont le nom contient la chaîne de caractères fournie', async () => {
        const res = await request(app).get('/pokemon/search/pi');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: expect.stringContaining('pi') })]));
    });
});