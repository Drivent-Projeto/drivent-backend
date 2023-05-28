import { notFoundError, unauthorizedError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getActivities() {
  const activities = await activitiesRepository.findActivities();
  if (!activities || activities.length === 0) {
    throw notFoundError();
  }
  console.log(activities);
  return activities;
}

async function getUserActivities(userId: number) {
  return activitiesRepository.userActivities(userId);
}
const activitiesService = {
  getActivities,
  getUserActivities,
};
export default activitiesService;
