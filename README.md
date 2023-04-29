# vite-async-component-loader

[![NPM version](https://img.shields.io/npm/v/vite-async-component-loader?color=34A88C&label=)](https://www.npmjs.com/package/vite-async-component-loader)

Vite plugin that easiest way loads component files as asynchronous components.

## Usage

It will automatically turn this

```vue
<script setup lang="ts">
import LazyComponent from './Component.vue?async'
</script>

<template>
  <LazyComponent />
</template>
```

into this

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const LazyComponent = defineAsyncComponent(() => import('./Component.vue'))
</script>

<template>
  <LazyComponent />
</template>
```

## Install

```bash
npm install -D vite-async-component-loader
```

## Setup
  
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AsyncComponentLoader from 'vite-async-component-loader'

export default defineConfig({
  plugins: [
    AsyncComponentLoader()
  ]
})
```

## License

[MIT License](https://github.com/Mini-ghost/vite-async-component-loader/blob/main/LICENSE) © 2023-PRESENT [Alex Liu](https://github.com/Mini-ghost)
