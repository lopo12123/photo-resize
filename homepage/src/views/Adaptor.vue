<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()
const userAgent = navigator.userAgent

if(/android|iphone|ipad|blackberry/i.test(userAgent)) {
    router.push({ name: 'Mobile' })
}
else {
    router.push({ name: 'Desktop' })
}
</script>

<template>
    <div class="adaptor">
        [WAIT] detecting...
    </div>
</template>

<style lang="scss" scoped>
.adaptor {
    position: relative;
    width: 100vw;
    height: 100vh;
    color: #777;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
