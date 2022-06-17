<script lang="ts" setup>
export interface ImgOverviewProp {
    // file name
    filename: string
    // base64 dataUrl of img
    base64: string
    // file size
    size: string
}

const props = defineProps<{
    pic: ImgOverviewProp
}>()

const emits = defineEmits<{
    (ev: 'direct50'): void
    (ev: 'del-img'): void
}>()
</script>

<template>
    <div class="img-overview">
        <div class="img-small">
            <img :src="pic.base64" alt="缩略图" :title="pic.filename">
        </div>

        <div class="detail-single" :title="`filename: ${pic.filename}`">
            {{ pic.filename }}
        </div>

        <div class="detail-single" :title="`filesize: ${pic.size}`">
            {{ pic.size }}
        </div>

        <div class="detail-single">
            <div class="btn" title="从列表移除"
                 @click="emits('del-img')">
                移除
            </div>
        </div>

        <div class="detail-single">
            <div class="btn" title="直接下载50*50的图片"
                 @click="emits('direct50')">
                50 * 50
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.img-overview {
    position: relative;
    width: 100%;
    height: 6.875rem;
    padding: 0.3125rem;
    border: solid 1px #ccc;
    border-radius: 0.375rem;
    user-select: none;
    cursor: pointer;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 0.625rem;
    grid-column-gap: 0.625rem;

    .img-small {
        width: 100%;
        height: 100%;
        border: dashed 1px #ccc;
        border-radius: 0.3125rem;
        grid-row: 1 / 3;
        grid-column: 1 / 2;

        img {
            max-height: 100%;
            max-width: 100%;
        }
    }

    .detail-single {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .btn {
            height: 1.5rem;
            padding: 0 0.3125rem;
            border: solid 1px orange;
            border-radius: 0.3125rem;
            color: #777;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                border-color: orangered;
            }
        }
    }
}
</style>