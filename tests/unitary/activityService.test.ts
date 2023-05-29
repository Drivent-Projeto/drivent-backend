import { createActivityCount } from '../factories';
import activityService from '../../src/services/activities-service';
import activityRepository from '@/repositories/activities-repository';
import { notFoundError, conflictError } from '@/errors';

describe('getActivities function', () => {
  it('should return all activities', async () => {
    const activitieReturn = await createActivityCount();

    jest.spyOn(activityRepository, 'findActivities').mockResolvedValue(activitieReturn);

    const result = await activityService.getActivities();
    expect(result).toEqual(activitieReturn);
  });
});

describe('registerUserActivity function', () => {
  it('should throw notFoundError when activity is not found', async () => {
    const userId = 1;
    const activityId = 2;

    jest.spyOn(activityRepository, 'getActivity').mockImplementationOnce(async () => {
      return null;
    });

    await expect(activityService.registerUserActivity(userId, activityId)).rejects.toEqual(notFoundError());
  });

  it('should throw conflictError when activity is full', async () => {
    const userId = 1;
    const activityId = 2;

    jest.spyOn(activityRepository, 'getActivity').mockImplementationOnce((): any => {
      return { id: activityId, capacity: 1, startsAt: new Date(), endsAt: new Date() };
    });

    jest.spyOn(activityRepository, 'countUserActivities').mockImplementationOnce(async () => {
      return 1;
    });

    await expect(activityService.registerUserActivity(userId, activityId)).rejects.toEqual(
      conflictError('This activity is full'),
    );
  });
});
