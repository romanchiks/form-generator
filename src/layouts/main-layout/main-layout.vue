<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<template>
  <v-app class="main-layout">
    <v-app-bar app class="main-layout__header header"
      ><h1 class="">Генератор форм</h1></v-app-bar
    >
    <router-view></router-view>
    <v-footer class="main-layout__footer footer">
      <p class="footer__created created" cols="12">
        {{ new Date().getFullYear() }} — <strong>Trokin Roman </strong>
      </p>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.main-layout {
  min-height: 100vh;

  &__footer {
    display: flex;
    justify-content: center;
  }
}
</style>
