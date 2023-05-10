import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
  const typesData = [{
    name: 'Presencial whith Hotel',
        includesHotel: true,
        isRemote: false,
        price: 600,
  },{
    name: 'Presencial no Hotel',
        includesHotel: false,
        isRemote: false,
        price: 250,
  },{
    name: 'Online',
        includesHotel: false,
        isRemote: true,
        price: 100,
  }]
  let typesCount = await prisma.ticketType.count({})
  if(typesCount != 3){
    typesCount = (await prisma.ticketType.createMany({
      data:typesData
    })).count
  }

  console.log({ event, typesCount });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
