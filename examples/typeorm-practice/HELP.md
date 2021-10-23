# TYPEORM 연습

## 연관관계 설정

### `@OneToMany` - `@ManyToOne`

전형적인 일대다 관계

[공식 페이지](https://typeorm.io/#/many-to-one-one-to-many-relations)

```typescript
@OneToMany(
    (type) => Child,
    (child) => child.parent,
)
```

```typescript
@ManyToOne(
    (type) => Parent,
    (parent) => parent.children , { nullable: false, onDelete: 'CASCADE'}
)
```

`@ManyToOne` 엔티티에 `Cascade` 설정 및 `orphan` 설정함으로 해당 기능을 사용할 수 있다.

### 다대다 관계 Many to Many

[공식 문서](https://typeorm.io/#/many-to-many-relations)

`@ManyToMany` 데코레이터를 통해 구현할 경우

`@JoinTable` 데코레이터가 필수다.

중간 매핑 테이블이 암시적으로 생성.

다대다 관계시 중간 테이블이 암시적으로 사용되는것이 맘에 안들경우

중간 테이블을 엔티티로 격상하여 사용할 수 있다.

`@ManyToMany` -> `@OneToMany | @ManyToOne, @ManyToOne | @OneToMany`

오히려 `@ManyToMany`에 관련 기본 API들이 많다...

`@ManyToMany`로 작성해야 자연스럽게 써지는 API...