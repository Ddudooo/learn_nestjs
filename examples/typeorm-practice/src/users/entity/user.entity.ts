import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { UserRoleMap } from '@/user_to_role/userRoleMap.entity'
import { Name } from '@/users/entity/name.type'


@Entity('users')
export class User extends BaseEntity{
    // @Column((type) => Name)
    // name: Name
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(()=> UserRoleMap, roleMap=> roleMap.user, { cascade: true })
    roleMaps: UserRoleMap[]
}