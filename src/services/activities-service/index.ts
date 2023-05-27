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
const activitiesService = {
  getActivities,
};
//esta aq só pra não dar erro no eslint, quando for criado mais de uma função e exportada aqui (sem ser no objeto do activitiesService) pode ser removido
export const test = () => console.log('');

export default activitiesService;
