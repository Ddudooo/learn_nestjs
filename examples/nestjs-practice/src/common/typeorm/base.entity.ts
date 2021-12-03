import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @CreateDateColumn('timestamptz')
  createAt: Date

  @UpdateDateColumn('timestamptz')
  updateAt: Date

  @DeleteDateColumn('timestamptz')
  deletedAt: Date

  @VersionColumn('integer')
  version: number
}
