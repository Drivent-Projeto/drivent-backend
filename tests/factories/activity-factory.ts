import { Activity, UserActivity } from '@prisma/client';

export function createActivity() {
  const expected: Activity[] = [
    {
      id: 1,
      name: 'leonardo',
      local: 'me casa',
      capacity: 2,
      startsAt: new Date(),
      endsAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return expected;
}

export async function createActivityCount(): Promise<(Activity & { _count: { UserActivity: number } })[]> {
  const expected: (Activity & { _count: { UserActivity: number } })[] = [
    {
      id: 1,
      name: 'leonardo',
      local: 'me casa',
      capacity: 2,
      startsAt: new Date(),
      endsAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: { UserActivity: 0 },
    },
  ];

  return Promise.resolve(expected);
}
