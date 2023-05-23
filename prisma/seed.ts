import faker from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(3, 'days').toDate(),
      },
    });
  }
  const typesData = [
    {
      name: 'Presencial whith Hotel',
      includesHotel: true,
      isRemote: false,
      price: 600,
    },
    {
      name: 'Presencial no Hotel',
      includesHotel: false,
      isRemote: false,
      price: 250,
    },
    {
      name: 'Online',
      includesHotel: false,
      isRemote: true,
      price: 100,
    },
  ];
  let typesCount = await prisma.ticketType.count({});
  if (typesCount != 3) {
    typesCount = (
      await prisma.ticketType.createMany({
        data: typesData,
      })
    ).count;
  }

  let hotels = await prisma.hotel.findMany();
  if (!hotels[0]) {
    for (let i = 0; i < 3; i++) {
      const hotel = await prisma.hotel.create({
        data: {
          name: faker.name.findName(),
          image: faker.image.imageUrl(),
        },
      });
      for (let j = 3; j > i; j--) {
        await prisma.room.create({
          data: {
            name: '1020',
            capacity: i + 1,
            hotelId: hotel.id,
          },
        });
      }
    }
    hotels = await prisma.hotel.findMany();
  }

  const activitiesData = [
    {
      name: 'Minecraft: montando o PC ideal',
      local: 'mainAuditorium',
      capacity: 1,
      startsAt: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'LoL: montando o PC ideal',
      local: 'mainAuditorium',
      capacity: 2,
      startsAt: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Palestra x',
      local: 'sideAuditorium',
      capacity: 11,
      startsAt: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Palestra y',
      local: 'workshopRoom',
      capacity: 18,
      startsAt: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Palestra z',
      local: 'workshopRoom',
      capacity: 15,
      startsAt: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Minecraft: montando o PC ideal',
      local: 'sideAuditorium',
      capacity: 27,
      startsAt: dayjs().add(1, 'days').set('hour', 10).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().add(1, 'days').set('hour', 11).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Convenção da Apple',
      local: 'workshopRoom',
      capacity: 20,
      startsAt: dayjs().add(1, 'days').set('hour', 11).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().add(1, 'days').set('hour', 12).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Campeonato de LOL',
      local: 'mainAuditorium',
      capacity: 21,
      startsAt: dayjs().add(1, 'days').set('hour', 9).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().add(1, 'days').set('hour', 12).set('minute', 0).set('second', 0).toDate(),
    },
    {
      name: 'Apresentação de projetos Driven',
      local: 'workshopRoom',
      capacity: 23,
      startsAt: dayjs().add(1, 'days').set('hour', 10).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().add(1, 'days').set('hour', 13).set('minute', 0).set('second', 0).toDate(),
    },
  ];
  let activitiesCount = await prisma.activity.count({});
  if (activitiesCount != 9) {
    activitiesCount = (
      await prisma.activity.createMany({
        data: activitiesData,
      })
    ).count;
  }

  console.log({ event, typesCount, activitiesCount, hotels });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
