<template>
    <div class="wrp">
        <div id="login">
            <el-form  :model="postData" label-width="80px">
                <el-form-item label="用户名" class="ipt">
                    <el-input v-model="postData.name"></el-input>
                </el-form-item>
                <el-form-item label="密码"  class="ipt">
                    <el-input v-model="postData.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="denglu" @click="toindex">登录</el-button>
                    <el-button type="primary" class="denglu" @click="">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                postData:{
                    name:'admin',
                    pwd:'123456'
                }
            }
        },
        methods:{
            toindex(){
                this.$axios.post('login',this.postData).then(res=>{
                    if(res.ret){
                        this.$router.push('/admin')
                    }else{
                        alert(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .wrp{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url("../../static/img/03.jpeg")no-repeat;
        background-size:100% ;

    }
    #login{
        position: absolute;
        left: 50%;
        right: 0;
        top: 50%;
        bottom: 0;
        width: 300px;
        height: 190px;
        transform: translateY(-50%) translateX(-50%);
        padding: 30px 50px 10px 0px;
        background: url(../../static/img/02.jpg) no-repeat;
        background-size:100% ;
    }
    .denglu{
        display: inline-block;
        margin: 0 0 0 25px;
        opacity:0.8;
    }

</style>
<style>
    #login .el-form-item >label{
        color: #ff6700;
    }
    .el-form-item input{
        opacity:0.6;
    }
</style>