import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { Role } from '@/roles/entity/role.entity'


@Entity('users')
export class User extends BaseEntity{
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    // @OneToMany(()=> UserRoleMap, roleMap=> roleMap.user, { cascade: true })
    // roleMaps: UserRoleMap[]

    @ManyToMany((type) => Role, role=> role.users, { cascade: true})
    @JoinTable({
      name: 'user_role',
      joinColumn: { name: 'role_id', referencedColumnName: 'id'},
      inverseJoinColumn: { name: 'role_id'}
    })
    roles: Role[]
}