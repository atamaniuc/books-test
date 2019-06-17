import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base-entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'datetime' })
  birthday: Date;
}
