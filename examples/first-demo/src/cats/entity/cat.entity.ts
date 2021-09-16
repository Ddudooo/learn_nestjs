import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cat as CatInterface } from '../interfaces/cat.interface';

@Entity()
export class Cat implements CatInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
