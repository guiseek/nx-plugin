# @nx-plugin/nest

The Nest plugin for Nx provides extra generators that are common and not provided in the official @nestjs or @nrwl/nest packages.

## Using Nest

```sh
nx generate @nx-plugin/nest:[generator] ...
```

```sh
nx g @nx-plugin/nest:[generator] ... #same
```

## Config generator



```sh
nx generate @nx-plugin/nest:config config
```

--project is used to infer the root of the project where the generators will generate the files.
This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build plugin-nest` to build the library.

## Running unit tests

Run `nx test plugin-nest` to execute the unit tests via [Jest](https://jestjs.io).
