import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Favorite from '../../src/models/Favorite.js';
import favoriteRoutes from '../../src/routes/favorites.js';

const app = express();
app.use(express.json());
app.use('/favorites', favoriteRoutes);

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/favoritesTestDB';
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('POST /favorites', async () => {
  const favorite = { userId: '123', pokemonId: '456' };
  const response = await request(app).post('/favorites').send(favorite);
  expect(response.statusCode).toBe(201);
  expect(response.body.userId).toBe(favorite.userId);
  expect(response.body.pokemonId).toBe(favorite.pokemonId);
});

test('GET /favorites', async () => {
  const response = await request(app).get('/favorites?userId=123');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
});

test('GET /favorites/:userId', async () => {
  const response = await request(app).get('/favorites/123');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
});

test('DELETE /favorites/:id', async () => {
    const favorite = new Favorite({ userId: mongoose.Types.ObjectId(), pokemonId: '456' });
    await favorite.save();
    const response = await request(app).delete(`/favorites/${favorite.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Deleted Favorite');
});