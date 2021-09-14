# 메모

## yarn berry 설정

❗ `yarn` 버전을 최신 버전으로 하고 진행

```shell
> yarn set version latest
```

프로젝트 루트에서

```shell
> yarn set version berry
```

### 기존 프로젝트 변경시

`.npmrc` 파일 `.yarnrc.yml`로 수정
`package.lock.json` 파일 제거
`node_modules` 폴더 제거
`package.json` 내부 `eslintConfig` => `.eslintrc.json`으로 변경

### Plng'n'Play (`PnP`) 방식 미적용시

`.yarnrc.yml` 파일 내부 설정에서 아래 내용 추가

```yml
nodeLinker: node-modules
```

기존 방식대로 모듈 관리

### `.gitignore` 추가

```plaintext
# Zero-Install
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Not use Zero-Install
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
```

## VSCode 설정

프로젝트 루트에서 진행 

```shell
> yarn dlx @yarn/sdks vscode
```

`ctrl`+`shift`+`p`

`Select TypeScript Version`

`Use Workspace Version`

해당 설정 이후로도 스크립트 파일에서 모듈을 읽어오지 못해 오류 발생할 수 있다.

이 경우에는 확장 프로그램으로 `ZipFS` 를 설치.

이 후로는 정상적으로 이전과 같이 동작할것. (`Go to Definition` 과 같은 기능들.)