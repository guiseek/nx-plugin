# NxPlugin

### Setup

Create repository

```sh
npx create-nx-workspace@latest my-project
```

Install nx (optinal)

```sh
npm i -g nx
```

## Autnn

### Back-end

Add Nest Plugin

```sh
npm i -D @nrwl/nest
```

Create Nest Application

```sh
nx g @nrwl/nest:application api
```

Add Nest extra features

```sh
npm i -D @nx-plugin/nest
```

Create Nest auth library

```sh
nx generate @nx-plugin/nest:authn auth --directory=server --jwt
```

### Front-end

Add Angular Plugin

```sh
npm i -D @nrwl/angular
```

Create Angular Application

```sh
nx g @nrwl/angular:application app --backendProject=api --e2eTestRunner=none
```

Add Angular extra features

```sh
npm i -D @nx-plugin/angular
```

Create Angular auth library

```sh
nx generate @nx-plugin/angular:authn auth --directory=client
```

---
###### Powered by 
### [nx.dev](https://nx.dev)
