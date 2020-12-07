# components

components 组件集

目录结构遵循 antd-design 目录标准

# Publish Issues

```
yarn
lerna publish
```

## 配置提醒

: spackles: **切记！** 在@hzyhhh/components 里，**仅需**导入@types/react 和 @types/react-dom 的类型的依赖，因为在正式环境中，多个 react 会导致依赖冲突，而正确让 react 运行的行为只能是依赖只能有一个 react！

否则，你将会收到以下报错信息：

> 触发这个警告有三种常见的原因：
>
> 1. 你的 React 和 React DOM 可能版本不匹配。
> 2. 你可能打破了 Hook 的规则。
> 3. 你可能在同一个应用中拥有多个 React 副本。

## 连接方式介绍

接下来介绍以下其他连接方式：

1. 对 myComponents 每次改动进行 publish，默认从 npm 获取最新的包进行调试
2. 对 myComponents 每次改动进行`yarn build`,手动替换到 myDemo 的*node_modules*中
3. **通过软连接的形式将目标文件夹的依赖对应起来**（推荐）

以下介绍以下软连接的方式的具体调试步骤

## 调试说明

例如有以下开发场景（以下开发场景均考虑在用 lerna 分包管理的情况下）

开发组件模块 myCompponents

目标调试模块 myDemo

1. 我们需要做的是首先在 myComponents 模块中安装正确依赖的 react，全局安装 parcel-bundler 进行实时开发调试
2. 开发完成在 myComponents 移除正式打包环境的 react 和 react-dom，仅保留各自对应的 type 类型。yarn/npm link 软链接到全局依赖
3. myDemo 中安装正式 react 依赖，引入 myComponents 包(例如@hzyhhh/myComponents),这时进行的是软连接，可以尽情的在两个模块中调试。
4. 一旦 myComponents 内部组件需要改动时，及时在 myComponents 运行`yarn build`,这时因为之前操作的软连接会使打包完的 dist 文件夹自动与调试库内的依赖的模块进行自动更新，HRL
