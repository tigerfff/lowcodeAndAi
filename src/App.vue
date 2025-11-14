<template>
  <div id="app" class="h-full">
    <Editor />
  </div>
</template>

<script>
import Editor from './views/Editor.vue'

export default {
  name: 'App',
  components: {
    Editor,
  },
}
</script>

<style>
/* 全局样式已在 style.css 中定义 */
</style>
