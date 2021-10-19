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

`@ManyToOne` 엔티티에 `Cascade` 설정 및 `orpaan` 설정함으로 해당 기능을 사용할 수 있다.
