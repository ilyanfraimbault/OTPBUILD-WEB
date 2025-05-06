# OTP Build

OTP Build is a web application for League of Legends players to explore top-tier champion builds and stats from the best one-trick ponies (OTPs). The application provides focused insights based on real data from high-level players who specialize in specific champions.

## Features

- Search for League of Legends players by their Riot ID (GameName#TagLine)
- View detailed champion builds and statistics from one-trick pony players
- Get insights on optimal item builds, runes, and playstyles for specific champions
- User-friendly interface with responsive design

## Technologies Used

- Vue 3 with Composition API
- TypeScript
- Vite
- Axios for API requests
- Vue Router

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
