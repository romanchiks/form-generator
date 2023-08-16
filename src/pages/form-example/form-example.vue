<script>
import { defineComponent } from "vue";
import { cloneDeep } from "lodash";

import { FormGenerator } from "@/components/form-generator";
import { JsonPreview } from "@/components/json-preview";

export default defineComponent({
  name: "FormExample",

  components: { FormGenerator, JsonPreview },

  data() {
    return {
      breadCrumbs: [
        {
          text: "Главная страница",
          disabled: false,
          to: "/",
        },
        {
          text: "Пример формы",
          disabled: true,
        },
      ],
      formFields: [
        {
          id: "field-1",
          type: "select",
          items: [
            "Услуга 1",
            "Услуга 2",
            "Услуга 3",
            "Услуга 4",
            "Услуга 5",
            "Услуга 6",
          ],
          value: null,
          required: true,
        },
        {
          id: "field-2",
          type: "input",
          value: null,
          required: true,
        },
        {
          id: "field-3",
          type: "date",
          value: null,
        },
        {
          id: "field-4",
          type: "time",
          value: null,
          required: true,
        },
        {
          id: "field-5",
          type: "checkbox",
          value: null,
          required: true,
        },
        {
          id: "field-6",
          type: "file",
          value: null,
        },
        {
          id: "field-7",
          type: "textarea",
          value: null,
        },
      ],
      fieldsConfig: {
        "field-1": {
          label: "Выберите услугу",
        },
        "field-2": {
          label: "Марка автомобиля",
          rules: [
            (v) => !!v || "Поле обязательно для заполнения",
            (v) => v?.length > 2 || "Слишком короткое название",
          ],
        },
        "field-3": {
          locale: "ru",
          label: "Выберите дату",
        },
        "field-4": {
          format: "24hr",
          label: "Выберите время",
        },
        "field-5": {
          label: "Согласен на обработку персональных данных",
        },
        "field-6": {
          label: "Выберите файл",
        },
        "field-7": {
          label: "Комментарий",
          rows: 5,
          rules: [(v) => v?.length < 1000 || "Слишком длинный комментарий"],
        },
      },
      submittedForm: {},
    };
  },

  methods: {
    changeLogger(event) {
      console.log(`Изменено поле ${event.fieldID}`);
      console.log(event.value);
    },

    changeField1Logger(value) {
      console.log('Отдельный лог для изменения поля "field-1":');
      console.log(value);
    },

    submitForm(fixedFormState) {
      this.submittedForm = cloneDeep(fixedFormState);
    },
  },
});
</script>

<template>
  <v-main
    ><div class="form-example">
      <v-breadcrumbs
        :items="breadCrumbs"
        class="form-example__breadcrumbs breadcrumbs"
      ></v-breadcrumbs>
      <section class="form-example__form-sheet form-sheet">
        <h2 class="visually-hidden">
          Пример использования компонента "генератор форм"
        </h2>
        <form-generator
          v-model="formFields"
          :fields-config="fieldsConfig"
          :show-header="true"
          :show-submit-btn="true"
          :show-reset-btn="true"
          @change="changeLogger"
          @change:field-1="changeField1Logger($event)"
          @submit="submitForm($event)"
        >
          <template #header>Пример формы</template>
        </form-generator>
      </section>
      <section class="form-example__preview preview">
        <h2 class="preview__header header">Результат отправки:</h2>
        <json-preview
          class="preview__json json"
          :object="submittedForm"
        ></json-preview>
      </section></div
  ></v-main>
</template>

<style lang="scss" scoped>
.form-example {
  max-width: 1200px;
  padding: 20px;

  & .breadcrumbs {
    padding: 0;
    margin-bottom: 30px;
  }

  &__form-sheet {
    margin-bottom: 30px;
  }

  &__preview {
    margin-bottom: 50px;
  }

  & .preview {
    &__header {
      margin-bottom: 30px;
    }
  }
}
</style>
