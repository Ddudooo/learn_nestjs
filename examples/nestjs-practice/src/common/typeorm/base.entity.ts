import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: new Date(),
  })
  createAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: new Date(),
  })
  updateAt: Date

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt!: Date

  @VersionColumn()
  version: number
}
