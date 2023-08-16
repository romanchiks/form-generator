<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "JsonPreview",

  props: {
    object: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    ObjectToJSON() {
      return JSON.stringify(this.object, null, "  ");
    },
  },
});
</script>

<template>
  <pre class="json-preview">
    <code class="json-preview__json json">{{ ObjectToJSON }}</code>
  </pre>
</template>

<style lang="scss" scoped>
.json-preview {
  max-height: 500px;
  overflow-y: auto;
  padding: 20px;
  border-radius: 9px;
  background-color: black;
  & .json {
    color: white;
  }
}
</style>
