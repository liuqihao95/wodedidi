<template>
    <div id="lunboAdd">
        <el-upload
                class="avatar-uploader"
                action="https://upload-z1.qiniup.com"
                :show-file-list="false"
                :data="{token:token}"
                :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <div>
            <el-button type="primary" class="btn" @click="postImg" v-if="$route.name=='轮播图添加'">提交</el-button>
        </div>
        <div>
            <el-button type="danger" class="btn" v-if="$route.name=='轮播图编辑'" @click="repostImg">保存并提交</el-button>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: "",
                imageUrl: ""
            };
        },
        methods: {
            handleAvatarSuccess(res) {
                this.imageUrl = "http://image.yaojunrong.com/" + res.key;
            },
            getToken() {
                this.$axios.qiniuGet().then(res => {
                    this.token = res.data;
                });
            },
            repostImg() {
                let params = {img: this.imageUrl, id: this.$route.query.id};
                this.$axios.post("updateImage", params).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: "提交成功",
                            type: "success"
                        });
                        this.$router.push({path: "/lunbo"});
                    } else {
                        this.$message.error("错了哦，这是一条错误消息");
                    }
                });
            },
            postImg() {
                let params = {img: this.imageUrl};
                this.$axios.post("addImage", params).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: "提交成功",
                            type: "success"
                        });
                        this.$router.push({path: "/lunbo"});
                    } else {
                        this.$message.error("错了哦，这是一条错误消息");
                    }
                });
            }
        },
        mounted() {
            this.getToken();
        }
    };
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }



</style>
<style scoped>
    button {
        display: block;
        margin: 0 auto;
    }

    #lunboAdd {
        width: 178px;
        margin: 0 auto;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

