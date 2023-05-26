import faker from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { Address, Enrollment, User } from '@prisma/client';

import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createEnrollmentWithAddress(user?: User) {
  const incomingUser = user || (await createUser());

  return prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber('(##) 9####-####'),
      userId: incomingUser.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).name,
        },
      },
    },
    include: {
      Address: true,
    },
  });
}

export function createhAddressWithCEP() {
  return {
    logradouro: 'Avenida Brigadeiro Faria Lima',
    complemento: 'de 3252 ao fim - lado par',
    bairro: 'Itaim Bibi',
    cidade: 'São Paulo',
    uf: 'SP',
  };
}

export function getEnrollmentReturn() {
  const expected: Enrollment & { Address: Address[] } = {
    id: 1,
    userId: 1,
    name: 'Teste',
    cpf: '12345678910',
    birthday: new Date(),
    phone: '12345678910',
    createdAt: new Date(),
    updatedAt: new Date(),
    Address: [
      {
        id: 1,
        enrollmentId: 1,
        cep: '12345678',
        street: 'Teste',
        number: '123',
        neighborhood: 'Teste',
        addressDetail: 'Teste',
        city: 'Teste',
        state: 'SP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  return expected;
}
