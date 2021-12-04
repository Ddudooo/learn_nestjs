import { EntityRepository, Repository } from 'typeorm'
import { Cat } from './entities/cat.entity'

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {}
