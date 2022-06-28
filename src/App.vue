<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  methods: {
  }
}
</script>

<style>
@import '../public/styles/common.css';

html {
  overflow-y: scroll;
}
body,
html {
  height: 100%;
}
#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafcfe;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
