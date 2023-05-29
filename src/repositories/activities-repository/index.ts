import { UserActivity } from '@prisma/client';
import { prisma } from '@/config';

async function findActivities() {
  return prisma.activity.findMany({
    orderBy: {
      startsAt: 'asc',
    },
    include: {
      _count: {
        select: {
          UserActivity: true,
        },
      },
    },
  });
}

async function getActivity(activity: number) {
  return prisma.activity.findUnique({
    where: {
      id: activity,
    },
  });
}

async function registerUserActivity(userId: number, activityId: number) {
  return prisma.userActivity.create({
    data: {
      activityId,
      userId,
    },
  });
}

async function getUserActivities(
  userId: number,
  startsAt?: string | Date,
  endsAt?: string | Date,
): Promise<UserActivity[]> {
  return prisma.userActivity.findMany({
    where: {
      userId,
      OR: [
        {
          Activity: {
            startsAt: {
              gte: startsAt,
              lt: endsAt,
            },
          },
        },
        {
          Activity: {
            endsAt: {
              lte: endsAt,
              gt: startsAt,
            },
          },
        },
      ],
    },
  });
}

async function countUserActivities(activityId: number) {
  return prisma.userActivity.count({
    where: {
      activityId,
    },
  });
}

export default {
  findActivities,
  registerUserActivity,
  getUserActivities,
  getActivity,
  countUserActivities,
};
