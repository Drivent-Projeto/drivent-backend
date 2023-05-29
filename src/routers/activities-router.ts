import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities, getUserActivities, postActivities } from '@/controllers';
import { validForActivities } from '@/middlewares/valid-for-activities';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .all('/*', validForActivities)
  .post('/', postActivities)
  .get('/user', getUserActivities);

export { activitiesRouter };
