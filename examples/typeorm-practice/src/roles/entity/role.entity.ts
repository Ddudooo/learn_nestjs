import { Column, Entity, ManyToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { User } from '@/users/entity/user.entity'

@Entity('roles')
export class Role extends BaseEntity {
    @Column()
    name: string

    // @OneToMany(()=> UserRoleMap, (roleMap)=>roleMap.role, { cascade: true })    
    // roleMaps: UserRoleMap[]

    @ManyToMany(() => User, (user)=> user.roles)
    users: User[]
}
