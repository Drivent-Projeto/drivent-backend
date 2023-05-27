import { prisma } from '@/config';

async function findActivities() {
  return prisma.activity.findMany();
}

export default {
  findActivities,
};
