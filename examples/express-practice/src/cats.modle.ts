export type CatType = {
  id: number
  name: string
  age: number
  species: string
  isCute: boolean
  friends: string[]
}

export const cats: CatType[] = [
  {
    id: 1,
    name: '러시안 블루',
    age: 5,
    species: 'Russian Blue',
    isCute: true,
    friends: ['some', 'friend', 'etc...']
  },
  {
    id: 2,
    name: '나비',
    age: 2,
    species: 'Korean Short hair',
    isCute: true,
    friends: ['some', 'friend', 'etc...']
  },
  {
    id: 3,
    name: '김고양이',
    age: 5,
    species: '몰?루',
    isCute: true,
    friends: ['some', 'friend', 'etc...']
  },
  {
    id: 4,
    name: '이고양이',
    age: 7,
    species: 'UNKNOWN',
    isCute: false,
    friends: ['some', 'friend', 'etc...']
  },
  {
    id: 5,
    name: '고양이',
    age: 15,
    species: 'Munchkin',
    isCute: false,
    friends: ['some', 'friend', 'etc...']
  },
]