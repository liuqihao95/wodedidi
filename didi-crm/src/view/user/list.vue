<template>
  <div id="userlist">
        <el-table
                :data="arr"
                border
                style="width: 70%;margin:20px auto">
            <el-table-column
                 type="index">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="用户名"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    width="220">
            </el-table-column>
            <el-table-column
                    label="性别"
                    width="150">
                 <template slot-scope="scope">
                    <p v-if="scope.row.sex==1">男</p>
                    <p v-if="scope.row.sex==0">女</p>
                </template>
            </el-table-column>
             <el-table-column
                    label="用户类型"
                    prop="type">
                    <template slot-scope="scope">
                    <p v-if="scope.row.type==1">员工</p>
                    <p v-if="scope.row.type==0">客户</p>
                </template>
            </el-table-column>
        </el-table>
        <h6>{{pn}}</h6>
        <div class="wrp">
            <div class="btn">
                <el-button type="success" @click="numjian">上一页</el-button>
                <el-button type="success" @click="numjia">下一页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      pn: 1
    };
  },
  methods: {
      numjian() {
      if (this.pn > 1) {
        this.pn--;
        this.getmsg();
      } else {
        this.$message({
          message: "已经是第一页，后面没有",
          type: "success"
        });
      }
    },
    numjia() {
      if (this.arr.length == 5) {
        this.pn++;
        this.getmsg();
      } else {
        this.$message({
          message: "已经是最后一页，后面没有",
          type: "success"
        });
      }
    },
    getmsg() {
      let pn = this.pn;
      this.$axios.get("getUser", { pn }).then(res => {
          if(res.ret){
              this.arr = res.data;
          }
          else{
              this.$alert(res.msg, '刘淇浩提示您', {
                  dangerouslyUseHTMLString: true,
              });
              this.$router.push('/')
              // this.$message({
              //     showClose: true,
              //     message: res.msg,
              //     type: 'error'
              // })
          }
        // this.arr = res.data;
      });
    }
  },
  mounted() {
    this.getmsg();
  }
};
</script>

<style scoped>
#userlist {
  text-align: center;
}
.wrp {
  margin-left: 80px;
  width: 70%;
}
.btn {
  width: 20%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

h1 {
  height: 47px;
}

.img-item {
  width: 100px;
  height: 50px;
}
h6 {
  width: 70%;
  text-align: center;
  font-size: 20px;
  padding: 20px 0;
  margin-left: 80px;
  font-weight: 700;
}
</style>
