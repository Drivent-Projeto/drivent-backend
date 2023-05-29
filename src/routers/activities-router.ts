import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities, postActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getActivities).post('/', postActivities);

export { activitiesRouter };
