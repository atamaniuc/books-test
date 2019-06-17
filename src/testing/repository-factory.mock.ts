import { Type } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { BaseEntity } from '../base-entity';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export function mongoRepositoryMockFactoryProvider<T extends BaseEntity>(entity: Type<T>): FactoryProvider {
  const mockRepoFactory: () => MockType<Partial<MongoRepository<T>>> = jest.fn(() => ({
    findOne: jest.fn(r => r),
    find: jest.fn(r => r),
    save: jest.fn(r => r),
    deleteOne: jest.fn(r => r),
  }));

  return {
    provide: getRepositoryToken(entity),
    useFactory: mockRepoFactory,
  };
}
