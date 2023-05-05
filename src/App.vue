<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";

// css reset
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
#app {
  padding: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  //prevent view shake
  margin-left: calc(100vw - 100%);

  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
}
</style>
