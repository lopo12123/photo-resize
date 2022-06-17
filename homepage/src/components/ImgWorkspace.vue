<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Slider from "primevue/slider";
import { ImgOverviewProp } from "@/components/ImgOverview.vue";

defineProps<{
    pic: ImgOverviewProp
}>()

const emits = defineEmits<{
    (ev: 'download-img', filename: string, base64: string, w: number, h: number): void
}>()

const imgBox = ref<HTMLDivElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const originSize = ref([ 50, 50 ])
const currSize = ref([ 0, 0 ])

const reset = () => {
    currSize.value = originSize.value
    updateImgSize()
}

const updateImgSize = () => {
    const box = imgBox.value
    if(!!box) {
        box.style.width = currSize.value[0] + 'px'
        box.style.height = currSize.value[1] + 'px'
    }
}

onMounted(() => {
    imgRef.value!.onload = () => {
        const img = imgRef.value
        if(!!img) {
            originSize.value = [ img.width, img.height ]
            currSize.value = [ img.width, img.height ]
            updateImgSize()
        }
    }
})
</script>

<template>
    <div class="img-workspace">
        <div class="infos">
            <div class="single-info" :title="pic.filename">
                {{ pic.filename }}
            </div>
            <div class="single-info" :title="pic.size">
                {{ pic.size }}
            </div>
        </div>

        <div class="operates">
            <div class="item">
                <div class="key">宽度:</div>
                <div class="val">
                    <input class="num" type="number"
                           v-model="currSize[0]"
                           @change="updateImgSize">px
                </div>
            </div>
            <div class="item">
                <Slider class="bar" v-model="currSize[0]"
                        :min="10" :max="300"
                        @change="updateImgSize"/>
            </div>
            <div class="item">
                <div class="key">高度:</div>
                <div class="val">
                    <input class="num" type="number"
                           v-model="currSize[1]"
                           @change="updateImgSize">px
                </div>
            </div>
            <div class="item">
                <Slider class="bar" v-model="currSize[1]"
                        :min="10" :max="300"
                        @change="updateImgSize"/>
            </div>
            <div class="item">
                <div class="btn" @click="reset"
                     :title="`将图片重置为原始尺寸(${originSize[0]}*${originSize[1]})`">
                    重置
                </div>
                <div class="btn" @click="emits('download-img', pic.filename, pic.base64, currSize[0], currSize[1])"
                     :title="`下载当前尺寸图片(${currSize[0]}*${currSize[1]})`">
                    下载
                </div>
            </div>
        </div>

        <div class="viewport">
            <div class="img-box" ref="imgBox">
                <img ref="imgRef" :src="pic.base64" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.img-workspace {
    position: relative;
    width: 100%;
    height: 100%;

    .infos {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 3rem;
        max-width: 3rem;
        transform: rotate(-45deg);

        .single-info {
            width: 100%;
            height: 1.5rem;
            font-size: 0.75rem;
            font-style: italic;
            line-height: 1.5rem;
            user-select: none;
            opacity: 0.7;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    .operates {
        position: absolute;
        z-index: 10;
        top: 1rem;
        right: 1rem;


        .item {
            width: 10rem;
            height: 2rem;
            color: #777;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .num {
                width: 5rem;
                height: 1.875rem;
                margin: 0 0.625rem;
                border: none;
                border-bottom: solid 1px #ccc;
                outline: none;
                color: #777;
                font-style: italic;

                &::-webkit-inner-spin-button {
                    display: none;
                }
            }

            .bar {
                width: 100%;
            }

            .btn {
                text-decoration: underline dashed;
                user-select: none;
                cursor: pointer;
            }
        }
    }

    .viewport {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        .img-box {
            width: fit-content;
            height: fit-content;

            img {
                position: relative;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
