import { Column, Entity } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'


@Entity('users')
export class User extends BaseEntity{
    @Column()
    name: string
}