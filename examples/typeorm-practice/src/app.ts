import { createConnection } from 'typeorm'

/**
 * 어플리케이션 시작 엔트리 포인트.
 */
async function application() {
  const connection = await createConnection()
  console.log(await connection.isConnected)
  
}
console.log('starting...')
application()