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
            <p class="fl">创建商品</p>
          </div>
          <div class="section-content-body">
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">商品编号：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-long-length" placeholder="请输入内容"></el-input>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">店铺：</el-col>
                <el-col :span="20">
                  <el-select v-model="postData.num" placeholder="请选择" class="common-long-length">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">分类：</el-col>
                <el-col :span="20">
                  <el-select v-model="postData.num" placeholder="请选择" class="common-long-length">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">标题：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" type="textarea"
                            :autosize="{minRows: 4, maxRows: 4}" class="common-long-length" placeholder="请输入内容"></el-input>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">图片：</el-col>
                <el-col :span="20">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">状态：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-long-length" placeholder="请输入内容"></el-input>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">推荐状态：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-long-length" placeholder="请输入内容"></el-input>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">总库存：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-length" placeholder="请输入内容"></el-input>
                  件
                </el-col>
              </el-col>
            </el-row>

            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">原价：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-length" placeholder="请输入内容"></el-input>
                  元
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">最低价：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-length" placeholder="请输入内容"></el-input>
                  元
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space">
              <el-col :span="24">
                <el-col :span="3" class="text-r common-line-height">商品数据：</el-col>
                <el-col :span="20">
                  <el-input v-model="postData.num" size="medium" class="common-long-length" placeholder="请输入内容"></el-input>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="common-row-space" style="margin-top: 50px;">
              <el-button type="warning" style="margin-left:500px;">确定</el-button>
              <el-button style="margin-left:30px;">取消</el-button>
            </el-row>
          </div>
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
  name: 'Index',
  data () {
    return {
      activeIndex: '1-1',
      options: [],
      postData: {
        num: ''
      }
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
.section-content{
  padding: 16px 24px;
  background-color: #ffffff;
  border-radius: 3px;
  min-height: 100%;
}
</style>
