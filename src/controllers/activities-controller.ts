import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getUserActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const activities = await activitiesService.getUserActivities(userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}
