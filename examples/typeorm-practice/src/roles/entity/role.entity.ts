import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { UserRoleMap } from '@/user_to_role/userRoleMap.entity'

@Entity('roles')
export class Role extends BaseEntity {
    @Column()
    name: string

    @OneToMany(()=> UserRoleMap, (roleMap)=>roleMap.role, { cascade: true })    
    roleMaps: UserRoleMap[]
}