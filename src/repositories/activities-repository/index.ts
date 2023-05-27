import { prisma } from '@/config';

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      _count: {
        select: {
          UserActivity: true,
        },
      },
    },
  });
}

export default {
  findActivities,
};
