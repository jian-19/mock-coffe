import { describe, test, expect } from 'vitest';
import { createMocks } from 'node-mocks-http';
import handler from '../mock/snacks.js';

describe('Snacks API', () => {
  test('GET sem id retorna lista completa', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: { host: 'localhost:3000' },
      query: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('GET com id válido retorna item', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: { host: 'localhost:3000' },
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.id).toBe('1');
  });

  test('POST cria um novo item', async () => {
    const novoSnack = {
      title: 'Novo Snack',
      content: 'Teste de criação',
      amount: 7.5,
      image: '/snacks/novo.png',
    };

    const { req, res } = createMocks({
      method: 'POST',
      headers: { 'Content-Type': 'application/json', host: 'localhost:3000' },
      body: novoSnack, 
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.title).toBe('Novo Snack');
  });

  test('PUT atualiza item existente', async () => {
    const snackAtualizado = {
      title: 'Snack Atualizado',
      amount: 9.9,
    };

    const { req, res } = createMocks({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', host: 'localhost:3000' },
      query: { id: '1' },
      body: snackAtualizado,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.title).toBe('Snack Atualizado');
    expect(data.amount).toBe(9.9);
  });

  test('DELETE remove um item', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      headers: { host: 'localhost:3000' },
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200); 
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Snack excluído com sucesso.');
    expect(data.id).toBe('1');
  });
});
