import { createConnection } from 'typeorm'

import { Role } from '@/roles/entity/role.entity'
import { User } from '@/users/entity/user.entity'


/**
 * 어플리케이션 시작 엔트리 포인트.
 */
async function application() {
  const connection = await createConnection()
  console.log(await connection.isConnected)  
  const testUser = new User()
  testUser.firstName = 'first'
  testUser.lastName = 'last'
  testUser.age = 20

  const testRole = new Role()
  testRole.name = 'testRole'

  testUser.roles = [testRole]
  
  const userRepo = connection.getRepository(User)

  await userRepo.save(testUser)
}
console.log('starting...')
application()
