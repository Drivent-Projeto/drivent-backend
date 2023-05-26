import { getEnrollmentReturn } from '../factories';
import { getAddressReturn } from '../factories/address-factory';
import { notFoundError } from '@/errors';

import enrollmentRepository from '@/repositories/enrollment-repository';

import enrollmentsService from '@/services/enrollments-service';
import { exclude } from '@/utils/prisma-utils';

describe('getOneWithAddressByUserId function', () => {
  it('should return the enrollment with address for the given user id', async () => {
    const userId = 1;
    const enrollment = getEnrollmentReturn();
    const address = getAddressReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollment);

    const result = await enrollmentsService.getOneWithAddressByUserId(userId);

    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);

    expect(result).toEqual({
      ...exclude(enrollment, 'userId', 'createdAt', 'updatedAt', 'Address'),
      address: {
        ...(!!address && { ...exclude(address, 'enrollmentId', 'createdAt', 'updatedAt') }),
      },
    });
  });

  it('should throw notFoundError if the enrollment for the given user id is not found', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(enrollmentsService.getOneWithAddressByUserId(userId)).rejects.toEqual(notFoundError());
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
  });
});
