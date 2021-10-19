import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { User } from '@/users/entity/user.entity'

@Entity('roles')
export class Role extends BaseEntity {
    @Column()
    name: string

    @ManyToOne((type)=> User, (user)=>user.roles)
    @JoinColumn()
    user: User
}