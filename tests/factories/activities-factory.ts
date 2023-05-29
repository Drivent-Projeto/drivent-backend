import dayjs from 'dayjs';
// import { Event } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export function createActivity(capacity: number) {
  // const endsAt = dayjs(event.endsAt).add(-1, 'hour').toDate();
  // const startsAt = dayjs(event.endsAt).add(-2, 'hour').toDate();
  const startsAt = dayjs().add(1, 'days').set('hour', 9).set('minute', 0).set('second', 0).toDate();
  const endsAt = dayjs().add(1, 'days').set('hour', 12).set('minute', 0).set('second', 0).toDate();
  return prisma.activity.create({
    data: {
      capacity,
      endsAt,
      startsAt,
      local: 'mainAuditorium',
      name: faker.lorem.words(3),
      createdAt: new Date(),
    },
  });
}
