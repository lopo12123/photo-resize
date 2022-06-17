<script lang="ts" setup>
import { ref } from "vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import ImgOverview from "@/components/ImgOverview.vue";
import type { ImgOverviewProp } from "@/components/ImgOverview.vue";

const getSizeWithUnit = (valInByte: number) => {
    const UnitMap = [ 'B', 'KB', 'MB' ];
    let unit = 0;
    while (valInByte >= 1024 && unit < 3) {
        valInByte /= 1024;
        unit += 1;
    }
    return valInByte.toFixed(2) + UnitMap[unit];
}

// region 列表
/**
 * @description 当前操作的图片下标
 */
const activeImgIdx = ref(-1);
/**
 * @description 图片列表
 */
const panelItems = ref<ImgOverviewProp[]>([
    {
        filename: 'test.png',
        base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZEAYAAACUeVkgAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAABMBJREFUWMPtV2tMVEcU/mZ35wIWq5hIEPfOuuvuUh9ppdgYQmMqUWMfWmKJVgNCfKBttSmUhhrqi9AKBkgjvqq00ZaShtrWWKX+IBKj9qHWCCxy7z5QiiI+aH3QqLDs9Ic7F8PaFuha0sbv39y5853znXPmzAzwCH8NzgGAEOUmSzPMS0gQ48H2q99Qd7BDlC1dqiiMSRLnYjzYfvUZp07GPQ1QqpyQu+ixpiZNyFi5iladP9+QPL4SkKRg29UFmzCcXrPT+NRUPE7GkkSzGd/wGqTfuMEPkhUkyWTSv/f71zQ+JeXfCesAcG8P6PXqVFZAzzmdSrt8Rppw967YI8px+Tcp9s4d5U02jda63TUcAAyGwfY7AI2lcjldkpYmSkk5zA5J9du2iXkVLF/6cft2rdSa5A6atWjRYPsNj9tiBoYNU8rkQsO1yZPV4WwvbVVVkYmGZIs5tIAx8b8Yi3ntf/96wTdQfwLaoWul6VUaHxvrTffNJKZZs3RJZDzG2mz8ABIRbrdjD9/Nb9tsWE6ySUFkZADjNP4zdu/a9cSllpGdCzMyek8ro+SrUsXOnaghcUhftixg/Ue8iL975QrSSDoJc7nISziMDqfTt4+fhcfl0o3QD+fRVVUxlvNzu0pqa8WygBrtPseP47lNm0g4+R7F06fzar/iZShBlNfLY8l2fNvcjC58waNPnyZu7sAet5svJr/q6pzOrhWG1YbcykpsBDofELmudMNqmrtmDY3vft1L6+vJJ3yE70m7nVvJRKRZregmuYi32cgqlGD2lCm8GvPQlpBA/DHnq3wcbycm3mObMeNPU9RYGn1TqrbblQ9YFv2spUWr6f3sWSl83bqg1GUfIOxpe87vj/Cvz0RnD5hDQxNNJqWMyfSEx6MR5jBGPy8oeGgCZjImZefkaAF8Wd5C9zU3NyQbM0OMVuuAicUmVd9gS6nicmmCjsgX6a7CwmAJUMrkQtqWl9f7AHUuYCxko8UStEi5Vo5eFWY1GrVu4zfYyGVO+fr1AxYwRz5GOzZs0AT4zyFhr688fT7ZbVsult52X7hAdL7jvDE1VXwna0kIeeUfROwpkkgWmc0an8N3mTelpAh7QRci0D1f/4Nuw32RegcLMMnhGKgO8hOiYGlo6PmiH6fbOnp0f3n6LUS3l69H64QJmiOcHMVrgUIakk18SGVUlFonx0rVWVliHED4JTEgp75eDLmeM9RNnPjQhfCNKMXVHkPeJXqu+9jhUMpiFgNDh4quo0/11XgPqiqXSDteKC42ED7Hu9PjEV2vro4xICKi+6iuVTe/JyP8RRxBR0+g+op+P3TUhWySFOZw8FHoxjMWC77icRian0/s5DDGZWfzzQA2R0RAwnD+YWsrWvh3oOXlkMnz6EpJQSeuk7eio/E+P4fl168jEnbUFhUBZAiQm0suQY+TTU0xFb+c6bzd/8z8LcQ7Qh0p75esnZ1aGxbdxsimSrnt7SIjLcXGTCAsrPf6xkbGKM3IUDLlSrr28uUAHj//w3q3QPRzzaCBFUtzb90S/b+/l777L520LS9P49PauomH8DFjgi5Ee4OPkq9KFbNneyItbY99+oBL4wAh+NQdxlNSRlLSf/aN/wj/N/wB4ChQmpZ99MUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDYtMTVUMTU6MTQ6MTArMDg6MDADtLeaAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA2LTE1VDE1OjE0OjEwKzA4OjAwcukPJgAAAEh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fMGhyZDRtYmFsc25oL3N0YXIuc3ZnkL+m4AAAAABJRU5ErkJggg==',
        size: '0B',
    }
])
const loadFiles = () => {
    const ipt = document.createElement('input');
    ipt.type = 'file';
    ipt.multiple = true;

    ipt.onchange = () => {

    }

    ipt.click()
}
// endregion

/**
 * @description 更新工作区内容
 * @param idx
 */
const updateWorkspace = (idx: number) => {
    activeImgIdx.value = idx;
    // 绘制 ...
}
/**
 * @description 删除图片
 * @param idx
 */
const deleteImg = (idx: number) => {
    panelItems.value.splice(idx, 1)
    if(activeImgIdx.value > idx) activeImgIdx.value -= 1;
    else if(activeImgIdx.value === idx) activeImgIdx.value = -1;
}

/**
 * @description 下载特定尺寸的图片
 */
const downloadImg = (filename: string, base64: string, w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const img = new Image();
    img.src = base64;

    img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        const anchor = document.createElement('a');
        anchor.href = canvas.toDataURL();
        anchor.download = `resized_${ w }_${ h }_${ filename }`;
        anchor.click();
    }
}
</script>

<template>
    <Splitter class="home" style="height: 100%">
        <SplitterPanel class="panel-container" :size="20" :minSize="20">
            <div class="panel-title">
                panel
            </div>
            <ImgOverview :class="['single-img', activeImgIdx === idx ? 'active' : 'default']"
                         v-for="(item, idx) in panelItems" :key="idx" :pic="item"
                         @direct50="downloadImg(item.filename, item.base64,50, 50)"
                         @del-img="deleteImg(idx)"
                         @click="updateWorkspace(idx)"/>
        </SplitterPanel>
        <SplitterPanel class="workspace-container" :size="80" :minSize="70">
            workspace
        </SplitterPanel>
    </Splitter>
</template>

<style lang="scss" scoped>
@use "src/styles/mixin";

.home {
    position: relative;
    width: 100%;
    height: 100%;

    .panel-container {
        @include mixin.scrollBarStyle(#aaa7);
        padding: 10px;
        overflow: hidden auto;

        .panel-title {

        }

        .single-img {
            margin: 10px 0;
        }

        .active {
            border-color: green;
        }
    }

    .workspace-container {

    }
}
</style>