# vite-async-component-loader

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
