import { Exclude, Expose } from 'class-transformer'

export default class Cat {
  @Exclude()
  private _id: number | undefined

  name: string

  age: number

  species: string

  isCute: boolean

  friends: string[]

  constructor(name: string, age: number, species: string, isCute: boolean, friends: string[]) {
    this.name = name
    this.age = age
    this.species = species
    this.isCute = isCute
    this.friends = friends
  }

  // eslint-disable-next-line no-undef
  @Expose()
  // @ts-ignore
  get id(): number | undefined {
    // eslint-disable-next-line no-underscore-dangle
    return this._id
  }

  set id(value: number) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = value
  }
}
