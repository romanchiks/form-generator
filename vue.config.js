const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  css: {
    loaderOptions: {
      scss: {
        additionalData: "@import '~@/styles/index.scss';",
      },
    },
  },
});
