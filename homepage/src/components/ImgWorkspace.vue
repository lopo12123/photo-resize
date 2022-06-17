<script lang="ts" setup>
import { ImgOverviewProp } from "@/components/ImgOverview.vue";
import { onMounted, ref } from "vue";

const props = defineProps<{
    pic: ImgOverviewProp
}>()

const imgRef = ref<HTMLImageElement | null>(null)
const size = ref([ 0, 0 ])

onMounted(() => {
    console.log(imgRef.value, imgRef.value?.width, imgRef.value?.height)
    // size.value = imgRef.value!.width
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
                <div class="key">
                    宽度:
                </div>
                <div class="val">
                    progress
                </div>
            </div>
            <div class="item">
                <div class="key">
                    高度:
                </div>
                <div class="val">
                    progress
                </div>
            </div>
        </div>

        <div class="viewport">
            <img ref="imgRef" :src="pic.base64" alt="">
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
        top: 0;
        right: 0;
    }

    .viewport {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>