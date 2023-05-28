import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities, getUserActivities } from '@/controllers';
import { validForActivities } from '@/middlewares/valid-for-activities';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .all('/*', validForActivities)
  .get('/user', getUserActivities);

export { activitiesRouter };
