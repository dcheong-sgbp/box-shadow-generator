# Usage & API

It is a standard custom element, so it works with no wrapper in plain HTML, React, Vue, Svelte and Astro.

## Plain HTML

```html
<script src="box-shadow.js"></script>
<box-shadow-generator></box-shadow-generator>
```

## React

```jsx
import "@sgbp/box-shadow";
export default function Page() { return <box-shadow-generator />; }
```

## Vue

```vue
<script setup>
import "@sgbp/box-shadow";
</script>

<template>
  <box-shadow-generator />
</template>
```

---

Prefer to just use it without installing anything? The
[live CSS Box Shadow Generator](https://sgbp.tech/tools/box-shadow-generator) is hosted and ready to go.
