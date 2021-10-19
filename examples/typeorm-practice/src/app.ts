import { createConnection } from 'typeorm'

import { ormConfig } from '@/config/ormConfig'

/**
 * 어플리케이션 시작 엔트리 포인트.
 */
async function application() {
  const connection = await createConnection({...ormConfig})
  console.log(await connection.isConnected)
  connection.synchronize()
}
console.log('starting...')
application()