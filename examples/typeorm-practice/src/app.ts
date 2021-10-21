import { createConnection } from 'typeorm'

import { Role } from '@/roles/entity/role.entity'
import { UserRoleMap } from '@/user_to_role/userRoleMap.entity'
import { User } from '@/users/entity/user.entity'

/**
 * 어플리케이션 시작 엔트리 포인트.
 */
async function application() {
  const connection = await createConnection()
  console.log(await connection.isConnected)
  // await connection.synchronize()
  const testUser = new User()
  testUser.name.firstName = 'test'
  testUser.name.lastName = 'test'
  const testRole = new Role()
  testRole.name = 'testRole'

  await connection.getRepository(User).save(testUser)
  await connection.getRepository(Role).save(testRole)
  const testUserRoleMap = await connection.getRepository(UserRoleMap).save({user: testUser, role: testRole})
  console.log(testUserRoleMap)
}
console.log('starting...')
application()