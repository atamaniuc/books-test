import { IsDate, Length } from 'class-validator';
import { Column, Entity, ObjectID} from 'typeorm';

import {BaseEntity} from '../base-entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  @Length(2, 128)
  title: string;

  @Column()
  authors: ObjectID[];

  @Column()
  iban: string;

  @Column()
  @IsDate()
  publishedAt: Date;
}
