<template>
  <div style="width:100%;height:100%">
    <div class="index-left">
      <menu-common :activeIndex="activeIndex"></menu-common>
    </div>

    <div class="top index-right-section" style="padding: 0px;">
      <index-nav-top></index-nav-top>
      <br/>
      <el-card>
        <el-form ref="form" :model="mlGoods" label-width="80px">
          <br/>

          <el-row>
            <el-col :span=6><div class="grid-content bg-purple">

              <el-row>
                <el-col :span=8 style="margin-top: 10px">
                  <label class="text-align">商品类型：</label>
                </el-col>
                <el-col :span=16>
                 <el-input v-model="mlGoodsType.typeName" autocomplete="off" class="common-length"></el-input>
                </el-col>
              </el-row>
            </div>
            </el-col>

            <el-col :span=6>
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span=6 style="margin-top: 10px">
                    <label class="text-align">开始时间：</label>
                  </el-col>
                  <el-col :span=16>
                    <el-date-picker size="small" style="width: 160px"
                                    v-model="mlGoodsType.startTime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    default-time="12:00:00">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </div></el-col>
            <el-col :span=6>
              <div class="grid-content bg-purple">

                <el-row>
                  <el-col :span=8 style="margin-top: 10px" >
                    <label class="text-align">截止时间：</label>
                  </el-col>
                  <el-col :span=16>
                    <el-date-picker size="small" style="width: 160px"
                                    v-model="mlGoodsType.endTime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    default-time="12:00:00">
                    </el-date-picker>
                  </el-col>
                </el-row>

              </div></el-col>


            <el-col :span=6>
              <div class="grid-content bg-purple button-align" style="text-align: left;margin-left: 42px">
                <el-button type="primary" @click="onSubmit" size="small" style="margin-left: 28px;">查询</el-button>
              </div>
            </el-col>
          </el-row>

        </el-form>
      </el-card>


      <el-card>
        <el-table
          size="mini"
          :data="tableData"
          style="width: 100%"
          border
          :default-sort = "{prop: 'created', order: 'descending'}"
        >
          <el-table-column
            align="center"
            prop="type_name"
            label="商品类型"
            sortable>
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="real_name"
            label="创建人"
          >
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="created"
            label="创建时间"
          >
          </el-table-column>


          <el-table-column
          align="center"successnew
          prop="statusStr"
          label="商品状态"
        >
        </el-table-column>

          <el-table-column
            align="center"successnew
            prop="typeKindStr"
            label="商品等级"
          >
          </el-table-column>


          <el-table-column align="center"
                           label="操作"  width="240">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 0 || scope.row.status == 2"
                         size="mini"
                         round
                         :type="scope.row.style"
                         :disabled="scope.row.passBtnDisabled"
                         @click="handlePassData(scope.$index,scope.row)">通过</el-button>

              <el-button v-if="scope.row.status == 0"
                         size="mini"
                         round
                         type="warning"
                         @click="handleRejectData(scope.$index,scope.row)">驳回</el-button>

              <el-button
                size="mini"
                round
                type="primary" :type="scope.row.createButtonStyle" :disabled="scope.row.disabled"
                @click="createMarket(scope.row)">创建</el-button>
            </template>
          </el-table-column>


        </el-table>
        <br>
        <el-pagination class="el-pagination"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="mlGoodsType.page"
                       :page-sizes="[10, 50, 100]"
                       :page-size="mlGoodsType.rows"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total=mlGoodsType.total>
        </el-pagination>
        <br>
        <br>
      </el-card>
    </div>

  </div>
</template>

<script>
import MenuCommon from '../../components/menu'
import IndexNavTop from '../../components/indexNavTop'
const mlGoodsType = {};
mlGoodsType.list = "/sell/mlGoodsType/goodList";
export default {
  components: {
    IndexNavTop,
    MenuCommon},
  name: 'ProductType',
  created () {
    this.initData();
    this.onSubmit();

  },
  data () {
    return {
      activeIndex: '2-1',
      tableData: [],
      mlGoodsType: {
        status:'',
        startTime:'',
        endTime:'',
        total:0,
        page:1,
        rows:10,

      },
      options:'',
    }
  },

  methods:{
    formatter(row, column) {
      return row.address;
    },
    getProcessDetail(row) {

      window.open(mlGoodsType.processHref+row.oaId, '_blank');

    },

    /**
     * @function initCascaderOption
     * @param
     * @desc 在刚进入标签列表页时，初始化
     * @return
     * */
    initData: function () {
      this.$http.post(mlGoodsType.init).then(
        (response) => {
          if (response.state == 'ok' ) {
            this.options = response.orderStatus;


          }
        },
        (error) => {

        }
      )
    },
    onSubmit() {
      console.log('submit!'+this.mlGoodsType);
      this.$http.post(mlGoodsType.list,this.mlGoodsType).then(
        (response) => {
          if (response.state == 'ok') {
            this.tableData = response.goodList.list;
            this.mlGoodsType.total=response.goodList.totalRow;
            this.mlGoodsType.page=response.goodList.pageNumber;
            //this.marketRequest.rows=response.records;
          }
          else {
            this.$utilDialog.likeAlert(this,response.message);

          }
        },
        (error) => {

        }
      )
    },
    getDetail(row){
      let routeUrl = this.$router.resolve({
        path: "/userShareDiskDetail"
      });
      window.open(routeUrl.href + "?id="+ row.id, '_blank');
    },

    createMarket(row){

      if(row.status!=SUCCESSSTATE||(row.status==SUCCESSSTATE&&row.relatedTagdataMarketId!=null)){
        return;
      }
      let routeUrl = this.$router.resolve({
        path: "/new-tag-data-market"
      });
      window.open(routeUrl.href + "?id="+ row.id+"&opType=2", '_blank');
    },



    downloadData(row){
      let datas = {};
      datas.id = row.id;
      this.$http.post(mlGoodsType.getDownLoadUrl,datas).then(
        (response) =>{
          let url = response.data.fileUrl;
          window.open(url);
        }
      )
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mlGoodsType.rows=val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.mlGoodsType.page=val;
      this.onSubmit();
    },

    handlePassData(index,row){
      if(row.relatedTagdataMarketId!=null){
        return;
      }
      this.$utilDialog.utilConfigDialogAndTitle("确定通过吗？",this,index,row,function (res,rowvalue, node) {
        if (res){
          node.passData(node,rowvalue);
        }else{
          node.onSubmit();
        }
      });

    },

    passData(node,row){
      let datas = {};
      datas.id = row.id;
      node.$http.post(mlGoodsType.passData,datas).then(
        (response) =>{
          node.$message({
            type: 'success',
            message: response._msg
          });
          node.onSubmit();
        }
      )
    },


    handleRejectData(index,row){
      if(row.relatedTagdataMarketId!=null){
        return;
      }
      this.$utilDialog.utilConfigDialogAndTitle("确定驳回吗？",this,index,row,function (res,rowvalue, node) {
        if (res){
          node.rejectData(node,rowvalue);
        }else{
          node.onSubmit();
        }
      });

    },

    rejectData(node,row){
      let datas = {};
      datas.id = row.id;
      node.$http.post(mlGoodsType.rejectData,datas).then(
        (response) =>{
          node.$message({
            type: 'success',
            message: response._msg
          });
          node.onSubmit();
        }
      )
    },

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
