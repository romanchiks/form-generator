<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<template>
  <v-app class="main-layout">
    <v-app-bar app class="main-layout__header-block header-block"
      ><router-link to="/" class="header-block__header-link header-link"
        ><h1 class="header-link__header">Генератор форм</h1></router-link
      ></v-app-bar
    >
    <router-view></router-view>
    <v-footer class="main-layout__footer footer">
      <div class="footer__content footer-content">
        <p class="footer-content__created created" cols="12">
          {{ new Date().getFullYear() }} — <strong>Trokin Roman </strong>
        </p>
      </div>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.main-layout {
  min-height: 100vh;

  & .header-block {
    & .header-link {
      text-decoration: none;
    }
  }

  & .footer {
    &__content {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
