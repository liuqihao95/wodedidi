<template>
    <div id="projectAdd">
        <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-upload
                        class="avatar-uploader"
                        action="https://upload-z1.qiniup.com"
                        :show-file-list="false"
                        :on-success="upload"
                        :data="{token:token}">
                    <img v-if="formData.img" :src="formData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <label id="container">
                    <input type="file" name="file" id="btn">
                    <span>上传图片</span>
                </label>
            </el-form-item>
            <el-form-item>
                <editor v-model="formData.content" @getText="getText"></editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" v-if="$route.name=='工程案例添加页'" @click="postData">提交</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="btn" v-if="$route.name=='工程案例编辑页'" @click="saveAndPost">保存并提交
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import editor from "@/components/edit/editor";
    import qiniu from "../../until/qiniu";

    export default {
        name: "projectAdd",
        data() {
            return {
                formData: {
                    title: "",
                    address: "",
                    img: "",
                    content: "",
                    contentText: ""
                },
                token: "",
                imgae: ""
            };
        },
        components: {
            editor
        },
        methods: {
            upload(res) {
                this.formData.img = "http://image.yaojunrong.com/" + res.key;
                // this.formData.content += '<img src="'+${this.formData.img}"''/>'
                // this.formData.content += `<img src="${this.formData.img}"/>`;
            },
            getText(val) {
                this.formData.contentText = val;
            },
            postData() {
                this.$axios.post("addProject", this.formData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: "提交成功",
                            type: "success"
                        });
                        this.$router.push({path: "/project"});
                    } else {
                        this.$message.error("错了哦，这是一条错误消息");
                    }
                });
            },
            getToken() {
                this.$axios.qiniuGet().then(res => {
                    this.token = res.data;
                    qiniu({token: res.data}, data => {
                        this.formData.content += `<img src="${data.url}"/>`;
                    });
                });
            },
            regetmsg() {
                this.$axios.get("getProject", {id: this.$route.query.id}).then(res => {
                    this.formData = res.data[0];
                });
            },
            saveAndPost() {
                let params = {
                    ...this.formData,
                    id: this.$route.query.id
                };
                this.$axios.post("updateProject", params).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        this.$router.push({path: "/project"});
                    } else {
                        console.log(res);
                        this.$message.error("错了哦，这是一条错误消息");
                    }
                });
            }
        },
        mounted() {
            if (this.$route.name == "工程案例编辑页") {
                this.getToken();
                this.regetmsg();
            } else {
                this.getToken();
            }
        },
        watch: {
            $route() {
                this.formData = {
                    title: "",
                    author: "",
                    img: "",
                    content: "",
                    contentText: ""
                };
            }
        }
    };
</script>
<style scoped>
    #container input {
        display: none;
    }

    #container span {
        display: inline;
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
        transition: 0.1s;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        text-align: center;
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