<template>
  <div style="width:100%;height:100%">
    <div class="index-left">
      <menu-common :activeIndex="activeIndex"></menu-common>
    </div>
    <div class="index-right">
      <index-nav-top></index-nav-top>
      <div class="index-right-section">
        <div class="section-content">
          <div class="section-content-top">
            <div class="common-marker fl">
            </div>
            <p class="fl">用户列表</p>
          </div>
          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuCommon from '../../components/menu'
import IndexNavTop from '../../components/indexNavTop'
export default {
  components: {
    IndexNavTop,
    MenuCommon},
  name: 'UserList',
  data () {
    return {
      activeIndex: '3-1',
      tableData: []
    }
  }
}
</script>
<style scoped>
  .index-left {
    width:240px;height:100%;
    float:left;
  }
  .index-right{
    height:100%;
    margin-left: 239px;
  }
  .index-right-section{
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    background-color: #F2F3F4;
  }
  .section-content{
    padding: 16px 24px;
    background-color: #ffffff;
    border-radius: 3px;
    min-height: 100%;
  }
</style>
