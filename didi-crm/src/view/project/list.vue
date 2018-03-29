<template>
    <div id="newslist">
        <el-table
                :data="arr"
                border
                style="width: 70%;margin-left:80px">
            <el-table-column
                    prop="title"
                    label="标题"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="220">
            </el-table-column>
            <el-table-column
                    label="头图"
                    width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="img-item">
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="goEditor(scope.row._id)" type="primary">编辑</el-button>
                    <el-button @click="godelete(scope.row._id)" type="danger">删除</el-button>
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
        name: "newslist",
        data() {
            return {
                arr: [],
                title: "",
                pn: "1"
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
                if (this.arr.length == 3) {
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
                this.$axios.get("getProject", {pn: this.pn}).then(res => {
                    if(res.ret){
                        this.arr = res.data;
                    }
                    else{
                        this.$alert(res.msg, '刘淇浩提示您', {
                            dangerouslyUseHTMLString: true,
                        });
                        this.$router.push('/')
                    }
                });
            },
            goEditor(id) {
                this.$router.push({path: "/project/editor", query: {id}});
            },
            godelete(id) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$axios.post("delProject", {id}).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.getmsg();
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        },
        mounted() {
            this.getmsg();
        }
    };
</script>

<style scoped>
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