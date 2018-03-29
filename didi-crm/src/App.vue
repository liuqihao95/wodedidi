<template>
    <div id="app">
        <transition name="slide-fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App"
    };
</script>

<style>
    @import "./style/init.css";

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }

</style>
