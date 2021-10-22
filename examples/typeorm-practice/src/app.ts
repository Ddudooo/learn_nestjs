import { createConnection } from 'typeorm'

import { Role } from '@/roles/entity/role.entity'
import { UserRoleMap } from '@/user_to_role/userRoleMap.entity'
import { Name } from '@/users/entity/name.type'
import { User } from '@/users/entity/user.entity'

/**
 * 어플리케이션 시작 엔트리 포인트.
 */
async function application() {
  const connection = await createConnection()
  console.log(await connection.isConnected)  
  // const testUser = new User()
  // testUser.name.firstName = 'test'
  // testUser.name.lastName = 'test'
  // const testRole = new Role()
  // testRole.name = 'testRole'

  const userRepo = connection.getRepository(User)
  const roleRepo = connection.getRepository(Role)
  const userRoleMapRepo = connection.getRepository(UserRoleMap)
  // const createdUser = await userRepo.save(testUser)
  // const createdRole = await roleRepo.save(testRole)
  // const testUserRoleMap = await userRoleMapRepo.save({
  //   user: createdUser, role: createdRole
  // })
  // console.log(testUserRoleMap)
  /*
  안됨....
  먼가 답답하네
  되는게 없어
  // const testName = new Name()
  // testName.firstName = 'first'
  // testName.lastName = 'last'
  // const createdUserRole = await userRoleMapRepo.save({
  //   user: { 
  //     name: testName,
  //     age: 10
  //   },
  //   role: {
  //     name : 'testRole'
  //   }
  // })
  // console.log(createdUserRole)
  */
  
}
console.log('starting...')
application()