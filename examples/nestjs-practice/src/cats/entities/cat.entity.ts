import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../common/typeorm/base.entity'

@Entity()
export class Cat extends BaseEntity {
  @Column('varchar')
  name: string

  @Column('integer')
  age: number

  @Column('varchar')
  species: string
}
