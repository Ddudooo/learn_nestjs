import Base from 'src/common/entity/base.entity';
import { Column } from 'typeorm';

export class User extends Base {
  @Column()
  name: string;
}
