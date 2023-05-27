import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);

export { activitiesRouter };
