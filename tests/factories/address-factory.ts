import { Address } from '@prisma/client';
import { AddressEnrollment } from '@/protocols';

export function getAddressReturn() {
  const expected: Address = {
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
  };
  return expected;
}
