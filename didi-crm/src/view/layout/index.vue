<template>
    <div class="layout">
        <sideBar></sideBar>
        <topHeader></topHeader>
        <transition name="slide-fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import sideBar from "./components/side-bar";
    import topHeader from "./components/top-header";

    export default {
        name: "index",
        components: {
            sideBar,
            topHeader
        },
        methods: {}
    };
</script>
<style>
    .slide-fade-enter-active {
        transition: all .1s ease;
    }

    .slide-fade-leave-active {
        transition: all .1s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>

<style scoped>
    .layout {
        padding-top: 74px;
        padding-left: 250px;
    }
</style>