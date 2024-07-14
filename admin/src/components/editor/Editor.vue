<!-- 富文本编辑器组件 -->
<template>
    <div id="myeditor">
        新闻内容编辑：
    </div>
</template>

<script setup>
    import { onMounted, defineEmits,defineProps } from 'vue';
    import E from 'wangeditor'

    const emits = defineEmits(["event"])
    const props = defineProps({
        content: {
            type: String,
            default: ''
        }
    })

    onMounted(() => {
        const editor = new E('#myeditor');
        editor.create();
        // 若有父传content过来，则赋初始值
        props.content && editor.txt.html(props.content)

        editor.config.onchange = function (newHtml) {
            // console.log('change 之后的新的 HTML', newHtml);

            // 将子内容(Editor)传父(NewsAdd)
            /* 
                当每次 onchange 事件触发时，将子内容传父
            */
            emits("event", newHtml)
        }

    })
</script>