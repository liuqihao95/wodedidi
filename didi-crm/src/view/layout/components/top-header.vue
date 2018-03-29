<template>
    <div id="top-header">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in routerList" :to="item.path" :key="index">{{item.name}}
            </el-breadcrumb-item>
            <el-dropdown class="caidan">
                <el-button type="primary">
                    用户管理<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="outlogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        name: "top-header",
        data() {
            return {
                routerList: []
            }
        },
        methods: {
            outlogin(){
                this.$axios.post('outlogin').then(res=>{
                    alert(res.msg)
                    this.$router.push('/')
                })
            },
            getRouter() {
                this.routerList = this.$route.matched.filter(item => item.name)
            }
        },
        watch: {
            $route() {
                this.getRouter();
            }
        },
        created() {
            this.getRouter();
        }

    }
</script>
<style scoped>
    .caidan{
        float: right;
    }
    #top-header {
        position: fixed;
        top: 0;
        right: 0;
        left: 250px;
        font-size: 14px;
        line-height: 56px;
        padding: 20px;
        background: #fff;
        z-index: 998;
        margin-bottom: 30px;
    }
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>