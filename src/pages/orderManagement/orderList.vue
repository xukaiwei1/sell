<template>
  <div style="width:100%;height:100%">
    <div class="index-left">
      <menu-common :activeIndex="activeIndex"></menu-common>
    </div>

    <div class="top index-right-section" style="padding: 0px;">
      <index-nav-top></index-nav-top>
      <br/>
      <el-card>
        <el-form ref="form" :model="orderManager" label-width="80px">
          <br/>

          <el-row>
            <el-col :span=6><div class="grid-content bg-purple">

              <el-row>
                <el-col :span=8 style="margin-top: 10px">
                  <label class="text-align">订单状态：</label>
                </el-col>
                <el-col :span=16>
                  <el-select v-model="orderManager.status" style="width: 160px" size="small" clearable filterable  placeholder="请选择" >
                    <el-option
                      v-for="item in options"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
            </el-col>

            <el-col :span=6>
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span=8 style="margin-top: 10px">
                    <label class="text-align">开始时间：</label>
                  </el-col>
                  <el-col :span=16>
                    <el-date-picker size="small" style="width: 160px"
                                    v-model="orderManager.startTime"
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
                                    v-model="orderManager.endTime"
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
            prop="order_code"
            label="订单号"
            sortable>
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="weixin_name"
            label="微信号"
          >
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="order_time"
            label="创建时间"
          >
          </el-table-column>


          <el-table-column
          align="center"successnew
          prop="pay_time"
          label="支付时间"
        >
        </el-table-column>

          <el-table-column
            align="center"successnew
            prop="goods_name"
            label="商品名称"
          >
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="goods_attribute"
            label="商品属性"
          >
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="count"
            label="商品个数"
          >
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="allAmount"
            label="金额(元)"
          >
          </el-table-column>

          <el-table-column
            align="center"successnew
            prop="statusStr"
            label="状态"
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
                       :current-page="orderManager.page"
                       :page-sizes="[10, 50, 100]"
                       :page-size="orderManager.rows"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total=orderManager.total>
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
const orderManager = {};
orderManager.init = "/sell/orderManager/init";
orderManager.list = "/sell/orderManager/listOrder";
export default {
  components: {
    IndexNavTop,
    MenuCommon},
  name: 'ProductList',
  created () {
    this.initData();
    this.onSubmit();

  },
  data () {
    return {
      activeIndex: '2-1',
      tableData: [],
      orderManager: {
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

      window.open(orderManager.processHref+row.oaId, '_blank');

    },

    /**
     * @function initCascaderOption
     * @param
     * @desc 在刚进入标签列表页时，初始化
     * @return
     * */
    initData: function () {
      this.$http.post(orderManager.init).then(
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
      console.log('submit!'+this.orderManager);
      this.$http.post(orderManager.list,this.orderManager).then(
        (response) => {
          if (response.state == 'ok') {
            this.tableData = response.orderList.list;
            this.orderManager.total=response.orderList.totalRow;
            this.orderManager.page=response.orderList.pageNumber;
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
      this.$http.post(orderManager.getDownLoadUrl,datas).then(
        (response) =>{
          let url = response.data.fileUrl;
          window.open(url);
        }
      )
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.orderManager.rows=val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.orderManager.page=val;
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
      node.$http.post(orderManager.passData,datas).then(
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
      node.$http.post(orderManager.rejectData,datas).then(
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
