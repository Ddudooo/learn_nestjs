# TODO

- [ ] 작업 전 추가할 설정 확인 후 추가

  - [ ] Typescript 설정
  - [ ] TypeOrm 설정
  - [ ] 기타 환경 설정

- [ ] 기본적인 유저 CRUD API
- [ ] 역할기반 접근 제한 추가
- [ ] 역할 데이터베이스 기반으로 설정
- [ ] 역할 동적 바인딩

---

## Access Control 

권한 관련 확인중...

[AccessControl](https://onury.io/accesscontrol/)
[NestJS::Guards](https://docs.nestjs.com/guards)

---

* 작업에 대한 액세스 행위 정의
* 응용 프로그램에서 요청된 리스소스 및 작업 사이에 추상된 레이어 제공

주로... CRUD와 연관됨

대부분의 응용프로그램에서 CRUD가 기본 작업

| ACTION | REST           | DATABASE |
| :----- | :------------- | :------- |
| CREATE | POST           | INSERT   |
| READ   | GET            | SELECT   |
| UPDATE | PUT 또는 PATCH | UPDATE   |
| DELETE | DELETE         | DELETE   |


리소스는 액세스 중인 고유한 사물(명사)을 식별하는 단위

일반적으로 추상적 정의로

**리소스가 실제로 무엇인지 그리고 그 리소스가 구현되는 방법은 개발자가 내리는 디자인 결정**


`AccessControl.js` 의 리소스에 대한 제어 예

```javascript
ac.grant('유저')                                      // 유저는
  .createAny('계정')                                  // 계정을 생성할 수 있고
  .updateOwn('계정', ['*', '!패스워드', '!이메일'])   // 자신이 만든 계정에 대해 비밀번호 및 이메일을 제외한 정보를 수정할 수 있음
  .updateOwn('인증정보') // 또한 자기 인증 정보 (이메일, 패스워드)를 수정할 수 있음

  // 유저 > 계정 > 인증정보
```

좀 더 활용 용도에 맞는지 확인중...