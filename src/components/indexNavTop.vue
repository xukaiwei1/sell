<template>
  <div class="index-right-top">
    <span class="fr pointer" @click="logOut">退出</span>
  </div>
</template>

<script>
export default {
  name: 'IndexNavTop',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    logOut () {
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
  .index-right-top{
    height:64px;
    background: #fff;
    color:#7e8c8d;
    line-height: 64px;
    padding-right: 30px;
    box-shadow: -1px -1px 2px #00002e;
  }
</style>
