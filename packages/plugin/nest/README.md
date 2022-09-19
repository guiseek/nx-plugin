# @nx-plugin/nest

The Nest plugin for Nx provides extra generators that are common and not provided in the official @nestjs or @nrwl/nest packages.

## Using nest generators

```sh
nx generate @nx-plugin/nest:[generator] ...

nx g @nx-plugin/nest:[generator] ... #same
```


### Authn

<details>
  <summary>
    <code>nx generate @nx-plugin/nest:authn auth --jwt</code>
  </summary>

```sh
>  NX  Generating @nx-plugin/nest:authn

CREATE libs/auth/README.md
CREATE libs/auth/package.json
CREATE libs/auth/src/index.ts
CREATE libs/auth/tsconfig.json
CREATE libs/auth/tsconfig.lib.json
CREATE libs/auth/project.json
UPDATE workspace.json
UPDATE tsconfig.base.json
CREATE libs/auth/.eslintrc.json
CREATE libs/auth/jest.config.ts
CREATE libs/auth/tsconfig.spec.json
CREATE libs/auth/src/lib/auth.module.ts
CREATE libs/auth/src/lib/auth.controller.ts
CREATE libs/auth/src/lib/auth.service.ts
CREATE libs/auth/src/lib/dto/auth-request.dto.ts
CREATE libs/auth/src/lib/guards/local-auth.guard.ts
CREATE libs/auth/src/lib/interfaces/auth-request.interface.ts
CREATE libs/auth/src/lib/interfaces/user.interface.ts
CREATE libs/auth/src/lib/repositories/user.repository.ts
CREATE libs/auth/src/lib/strategies/local.strategy.ts
CREATE libs/auth/src/lib/config/constants.ts
CREATE libs/auth/src/lib/guards/jwt-auth.guard.ts
CREATE libs/auth/src/lib/strategies/jwt.strategy.ts
UPDATE package.json
```

</details>

---

### Config

```sh
nx generate @nx-plugin/nest:config config
```
