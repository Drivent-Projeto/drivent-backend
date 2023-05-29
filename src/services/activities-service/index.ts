import { UserActivity } from '@prisma/client';
import { conflictError, notFoundError, unauthorizedError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivities() {
  const activities = await activitiesRepository.findActivities();
  if (!activities || activities.length === 0) {
    throw notFoundError();
  }
  //console.log(activities);
  return activities;
}

async function getUserActivities(userId: number): Promise<UserActivity[]> {
  return await activitiesRepository.getUserActivities(userId);
}

async function registerUserActivity(userId: number, activityId: number) {
  const activity = await activitiesRepository.getActivity(activityId);
  if (!activity) throw notFoundError();

  const usersActivityCount = await activitiesRepository.countUserActivities(activityId);
  if (activity.capacity <= usersActivityCount) throw conflictError('This activity is full');

  const [userActivities] = await activitiesRepository.getUserActivities(userId, activity.startsAt, activity.endsAt);

  if (userActivities) throw conflictError(`User can't enroll in two activities at the same time`);

  return await activitiesRepository.registerUserActivity(userId, activityId);
}

const activitiesService = {
  getActivities,
  getUserActivities,
  registerUserActivity,
};
export default activitiesService;
