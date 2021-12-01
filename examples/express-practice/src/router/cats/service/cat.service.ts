import CatRepository from '@/router/cats/repository/cats.repository'
import Cat from '@/router/cat.model'

export default class CatService {
  private readonly catRepo: CatRepository

  constructor(catRepo: CatRepository) {
    this.catRepo = catRepo
  }

  getAll() {
    return this.catRepo.findAll()
  }

  getById(id: number) {
    return this.catRepo.findById(id)
  }

  create(cat: Cat) {
    return this.catRepo.save(cat)
  }

  update(cat: Cat) {
    return this.catRepo.save(cat)
  }

  remove(id: number) {
    return this.catRepo.removeById(id)
  }
}
