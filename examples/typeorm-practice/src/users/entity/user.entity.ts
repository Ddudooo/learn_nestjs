import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { UserRoleMap } from '@/user_to_role/userRoleMap.entity'


@Entity('users')
export class User extends BaseEntity{
    @Column()
    name: string

    @OneToMany(()=> UserRoleMap, roleMap=> roleMap.user, { cascade: true })
    roleMaps: UserRoleMap[]
}