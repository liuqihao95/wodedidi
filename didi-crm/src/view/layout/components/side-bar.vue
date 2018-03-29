<template>
    <div id="side-bar">
        <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true">
            <el-submenu index="1">
                <template slot="title">
                    <span>新闻管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/news">新闻列表</el-menu-item>
                    <el-menu-item index="/news/add">新闻添加</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true">
            <el-submenu index="2">
                <template slot="title">
                    <span>工程管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/project">工程列表</el-menu-item>
                    <el-menu-item index="/project/add">工程添加</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true">
            <el-submenu index="3">
                <template slot="title">
                    <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/lunbo">轮播图列表</el-menu-item>
                    <el-menu-item index="/lunbo/add">轮播图添加</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true">
            <el-submenu index="3">
                <template slot="title">
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/user">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "side-bar"
    }
</script>

<style scoped>
    #side-bar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 250px;
        background: #545c64;
    }

    .el-menu {
        border-right: none;
    }
</style>