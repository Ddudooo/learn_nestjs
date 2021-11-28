// eslint-disable-next-line max-classes-per-file
import { plainToInstance } from 'class-transformer'
import Cat from '@/router/cat.model'

export const initCats = [
  {
    name: '러시안 블루',
    age: 5,
    species: 'Russian Blue',
    isCute: true,
    friends: ['some', 'friend', 'etc...'],
  },
  {
    name: '나비',
    age: 2,
    species: 'Korean Short hair',
    isCute: true,
    friends: ['some', 'friend', 'etc...'],
  },
  {
    name: '김고양이',
    age: 5,
    species: '몰?루',
    isCute: true,
    friends: ['some', 'friend', 'etc...'],
  },
  {
    name: '이고양이',
    age: 7,
    species: 'UNKNOWN',
    isCute: false,
    friends: ['some', 'friend', 'etc...'],
  },
  {
    name: '고양이',
    age: 15,
    species: 'Munchkin',
    isCute: false,
    friends: ['some', 'friend', 'etc...'],
  },
]

class CatRepository {
  private readonly cats: Cat[] = []

  private sequence: number = 0

  constructor() {
    initCats.forEach(cat => {
      this.save(plainToInstance(Cat, cat))
    })
  }

  findAll() {
    return this.cats
  }

  findById(id: number | string) {
    return this.cats.find(cat => cat.id === parseInt(<string>id, 10))
  }

  save(cat: Cat) {
    if (cat.id) {
      // something
      const found = this.findById(cat.id)
      // eslint-disable-next-line no-unused-vars
      if (found) {
        const merged = {
          ...found,
          ...cat,
        }
        const index = this.cats.indexOf(found)
        const saved = plainToInstance(Cat, merged)
        this.cats.splice(index, 1, saved)
        return saved
      }
      throw new Error(`고양이를 찾을 수 없습니다. - ${cat.id}`)
    }
    // eslint-disable-next-line no-param-reassign
    cat.id = this.sequence
    this.cats.push(cat)
    this.sequence += 1
    return cat
  }

  removeById(id: number | string) {
    const found = this.findById(id)
    if (found) {
      const index = this.cats.indexOf(found)
      this.cats.splice(index, 1)
      return true
    }
    return false
  }
}

export const catRepo = new CatRepository()
