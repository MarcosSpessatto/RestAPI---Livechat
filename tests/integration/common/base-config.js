import supertest from 'supertest';

export const request = supertest('http://localhost:3000');
export const prefix = '/api/v1/livechat';

export const path = path => `${prefix}/${path}`;