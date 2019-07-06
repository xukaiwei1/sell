<template>
  <div style="height:100%;">
    <div class="index-logo">
    </div>
    <div style="height:100%;margin-top: 64px">
      <el-menu
        style="height:100%;"
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @select="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">创建商品</el-menu-item>
            <el-menu-item index="1-2">商品列表</el-menu-item>
            <el-menu-item index="1-3">商品类型</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">订单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-news"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'menuCommon',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    activeIndex: String
  },
  methods: {
    handleOpen (val) {
      console.log(val)
      switch (val) {
        case '1-1':
          this.$router.push('/index')
          break
        case '1-2':
          this.$router.push('/product-list')
          break
         case '1-3':
          this.$router.push('/product-type')
          break
        case '2-1':
          this.$router.push('/order-list')
          break
        case '3-1':
          this.$router.push('/user-list')
          break
      }
    },
    handleClose () {

    }
  }
}
</script>
<style>
  .index-logo {
    width:239px;
    height:64px;
    position: absolute;
    background: #545c64;
    top:0;
    z-index: 100;
  }
</style>
