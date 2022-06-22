<script lang="ts" setup>
import { ref } from "vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import ImgOverview from "@/components/ImgOverview.vue";
import type { ImgOverviewProp } from "@/components/ImgOverview.vue";
import ImgWorkspace from "@/components/ImgWorkspace.vue";

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
const activeImgIdx = ref(0);
/**
 * @description 图片列表
 */
const panelItems = ref<ImgOverviewProp[]>([])
const loadImages = () => {
    const ipt = document.createElement('input');
    ipt.type = 'file';
    ipt.accept = ".jpg,.jpeg,.png";
    ipt.multiple = true;

    // 移动端限制 页面需存在该 dom 才能触发事件
    ipt.style.position = 'absolute'
    ipt.style.left = '-500px'
    ipt.style.top = '-500px'
    document.body.appendChild(ipt)

    ipt.onchange = () => {
        const files = ipt.files;

        if(!files) {
            alert('无文件');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    panelItems.value.push({
                        filename: files[i].name,
                        base64: reader.result as string,
                        size: getSizeWithUnit(files[i].size)
                    })
                }
                reader.onerror = (e) => {
                    console.log(`error occurred when reading "${ files[i].name }": `, e);
                }
                reader.readAsDataURL(files[i]);
                document.body.removeChild(ipt)
            } catch (e) {
                console.log(`error occurred when solving "${ files[i].name }": `, e);
            }
        }
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
 * @description 清空列表
 */
const clearImg = () => {
    panelItems.value = []
    activeImgIdx.value = -1;
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
        const ctx = canvas.getContext('2d')!;
        // ctx.fillStyle = '#fff';
        // ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = `resized_${ w }_${ h }_${ filename }`;
        anchor.click();
    }
}
</script>

<template>
    <Splitter class="desktop" style="height: 100%">
        <SplitterPanel class="panel-container" :size="20" :minSize="20">
            <div class="panel-title">
                <div class="btn" @click="loadImages">导入</div>
                <div class="btn" @click="clearImg">清空</div>
            </div>
            <ImgOverview :class="['single-img', activeImgIdx === idx ? 'active' : 'default']"
                         v-for="(item, idx) in panelItems" :key="idx" :pic="item"
                         @direct50="downloadImg(item.filename, item.base64,50, 50)"
                         @del-img="deleteImg(idx)"
                         @click="updateWorkspace(idx)"/>
        </SplitterPanel>
        <SplitterPanel class="workspace-container" :size="80" :minSize="70">
            <ImgWorkspace v-if="activeImgIdx >= 0 && activeImgIdx < panelItems.length"
                          :pic="panelItems[activeImgIdx]" :key="activeImgIdx"
                          @download-img="downloadImg"/>
        </SplitterPanel>
    </Splitter>
</template>

<style lang="scss" scoped>
@use "src/styles/mixin";

.desktop {
    position: relative;
    width: 100%;
    height: 100%;

    .panel-container {
        @include mixin.scrollBarStyle(#aaa7);
        padding: 10px;
        overflow: hidden auto;

        .panel-title {
            position: sticky;
            z-index: 10;
            top: 0;
            color: #777;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
                text-decoration: underline dashed;
                user-select: none;
                cursor: pointer;
            }
        }

        .single-img {
            margin: 10px 0;
        }

        .active {
            border-color: green;
        }
    }

    .workspace-container {
        .wrapper {
            width: 100%;
            height: 100%;
            padding: 10px;
            overflow: auto;
        }
    }
}
</style>
