<script lang="ts" setup>
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";

</script>

<template>
    <Splitter class="home" style="height: 100%">
        <SplitterPanel :size="20" :minSize="20">
            panel
        </SplitterPanel>
        <SplitterPanel :size="80" :minSize="70">
            workspace
        </SplitterPanel>
    </Splitter>
</template>

<style lang="scss" scoped>
.home {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>