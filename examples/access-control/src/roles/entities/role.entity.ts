import Base from '@/common/entity/base.entity'
import { Column } from 'typeorm'

export class Role extends Base {
  @Column()
  name: string
}
