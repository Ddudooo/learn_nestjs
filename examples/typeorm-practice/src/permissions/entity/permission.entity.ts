import { Column, Entity } from 'typeorm'

import { BaseEntity } from '@/common/entity/base.entity'

@Entity()
export class Permission extends BaseEntity {
    @Column()
    name: string
    @Column()
    target: string
    @Column()
    operation: string
}