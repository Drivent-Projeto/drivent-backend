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

async function registerActivity(userId: number, activityId: number) {
  return prisma.userActivity.create({
    data: {
      activityId,
      userId,
    },
  });
}

async function userActivities(userId: number) {
  return prisma.userActivity.findMany({
    where: {
      userId,
    },
  });
}

export default {
  findActivities,
  registerActivity,
  userActivities,
};
