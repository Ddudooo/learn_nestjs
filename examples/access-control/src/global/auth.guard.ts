import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    // 이부분에서 유저별 권한 추가
    const test = {
      roles: ['ADMIN_UPDATE_OWN_USER', 'USER_CREATE_ANY_USER'],
      username: 'test',
    }
    req.user = test
    return true
  }
}
