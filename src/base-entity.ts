import {/*PrimaryGeneratedColumn, */CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectID } from 'typeorm';

export class BaseEntity {
  /*@PrimaryGeneratedColumn()
  id: number;*/

  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
