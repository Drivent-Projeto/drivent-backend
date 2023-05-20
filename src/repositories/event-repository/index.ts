import { Event } from '@prisma/client';
import { prisma, redis } from '@/config';

const eventKey = 'event';

async function findFirst(): Promise<Event> {
  const cachedEvent = await redis.get(eventKey);

  if (cachedEvent) return JSON.parse(cachedEvent);

  const event = await prisma.event.findFirst();

  await redis.setEx(eventKey, 86400, JSON.stringify(event));
  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
