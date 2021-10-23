import { Entity, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'
import { Role } from '@/roles/entity/role.entity'
import { User } from '@/users/entity/user.entity'

// @Entity()
// export class UserRoleMap extends BaseEntity{
//     @ManyToOne(() => User, user => user.roleMaps, { onDelete: 'CASCADE'})
//     user: User
//     @ManyToOne(() => Role, role => role.roleMaps, { onDelete: 'CASCADE'})
//     role: Role
// }