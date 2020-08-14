<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="scss">
@import "assets/style/index";
  .main{
    width: 100%;
    background-color: #ededed;
    overflow: hidden;
  }
</style>
