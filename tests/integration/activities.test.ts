import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createUser, createTicketType, createTicket } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { createActivity } from '../factories/activities-factory';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activities', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/payments');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 404 when there is no  activities', async () => {
      const token = await generateValidToken();

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it('should respond with status 200 and activities when there is activities', async () => {
      const token = await generateValidToken();
      await createActivity(1);

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            local: expect.any(String),
            capacity: expect.any(Number),
            startsAt: expect.any(String || Date),
            endsAt: expect.any(String || Date),
            createdAt: expect.any(String || Date),
            updatedAt: expect.any(String || Date),
            _count: {
              UserActivity: expect.any(Number),
            },
          }),
        ]),
      );
      // Activity & {
      //   _count: {
      //       UserActivity: number;
      //   }
    });
  });
});

// describe('POST /activities', () => {
//   it('should respond with status 401 if no token is given', async () => {
//     const response = await server.get('/payments');

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if given token is not valid', async () => {
//     const token = faker.lorem.word();

//     const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if there is no session for given token', async () => {
//     const userWithoutSession = await createUser();
//     const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

//     const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });
//   describe('when token is valid', () => {});
// });

// describe('GET /activities/user', () => {
//   it('should respond with status 401 if no token is given', async () => {
//     const response = await server.get('/payments');

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if given token is not valid', async () => {
//     const token = faker.lorem.word();

//     const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if there is no session for given token', async () => {
//     const userWithoutSession = await createUser();
//     const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

//     const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });
//   describe('when token is valid', () => {});
// });
