import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { Role } from '@/roles/entity/role.entity'


@Entity('users')
export class User extends BaseEntity{
    @Column()
    name: string

    @OneToMany(type=> Role, role=> role.user)
    roles: Role[]
}