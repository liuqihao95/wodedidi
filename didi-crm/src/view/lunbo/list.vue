<template>
    <div id="lunboList">
        <el-table
                :data="tableData"
                border
                style="width: 70%; margin:0 auto">
            <el-table-column
                    label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="img-item">
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="goEditor(scope.row._id)" type="primary">编辑</el-button>
                    <el-button @click="godelete(scope.row._id)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getImage() {
                this.$axios.get('getImage').then(res => {
                    if(res.ret){
                        this.tableData = res.data;
                    }
                    else{
                        this.$alert(res.msg, '刘淇浩提示您', {
                            dangerouslyUseHTMLString: true,
                        });
                        this.$router.push('/')
                    }
                })
            },
            goEditor(id) {
                this.$router.push({path: "/lunbo/editor", query: {id}});
            },
            godelete(id) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$axios.post("delImage", {id}).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.getImage();
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
            this.getImage()
        }

    }
</script>

<style scoped>
    .img-item {
        width: 100px;
        height: 50px;
    }

</style>
