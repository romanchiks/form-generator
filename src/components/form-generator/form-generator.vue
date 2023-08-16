<script>
import { defineComponent } from "vue";

import { FIELDS_MAP } from "./config";

function valuePropValidator(field) {
  return (
    "id" in field &&
    "type" in field &&
    field["type"] in FIELDS_MAP &&
    "value" in field
  );
}

const COMPONENT_TYPES_WITH_CHANGE_EVENT = ["select", "checkbox", "file"];

export default defineComponent({
  name: "FormGenerator",

  // + change:{field.id}
  emits: ["update:value", "change", "submit"],

  props: {
    value: {
      type: Array,
      required: true,
      validator: (value) => value.every(valuePropValidator),
    },
    showHeader: { type: Boolean, default: false },
    showSubmitBtn: { type: Boolean, default: false },
    showResetBtn: { type: Boolean, default: false },
    fieldsConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      formFields: this.value.slice(),
      fieldsMap: FIELDS_MAP,
    };
  },

  computed: {},

  watch: {
    value(newValue) {
      this.formFields = newValue.slice();
    },
  },

  methods: {
    async submitForm() {
      if (!(await this.validateForm())) return;
      this.$emit("submit", this.formFields);
    },

    resetForm() {
      this.$refs.form.reset();
    },

    async validateForm() {
      return await this.$refs.form.validate();
    },

    changeFieldValue(value, fieldID) {
      this.$emit(`change:${fieldID}`, value);
      this.$emit("change", { fieldID, value });
      this.$emit("update:value", this.formFields);
    },

    getFieldProp(propName, field) {
      if (propName in this.fieldsConfig) return this.fieldsConfig[propName];
      if (propName in field) return field[propName];
      return undefined;
    },

    getFieldListers(fieldType, fieldID) {
      const listeners = {};
      if (COMPONENT_TYPES_WITH_CHANGE_EVENT.includes(fieldType)) {
        listeners.change = (event) => this.changeFieldValue(event, fieldID);
      } else {
        listeners.input = (event) => this.changeFieldValue(event, fieldID);
      }
      return listeners;
    },

    getFieldRules(field) {
      if (
        field.id in this.fieldsConfig &&
        "rules" in this.fieldsConfig[field.id]
      ) {
        return this.fieldsConfig[field.id].rules;
      }
      if (field.required) {
        return [(v) => !!v || "Поле обязательно для заполнения"];
      }
      return undefined;
    },
  },
});
</script>

<template>
  <v-form ref="form" class="form-generator">
    <h3 v-if="showHeader" class="form-generator__header header">
      <slot name="header"></slot>
    </h3>
    <div class="form-generator__form-fields form-fields">
      <div
        v-for="(field, index) in formFields"
        :key="field.id"
        :name="field.id"
        class="form-fields__form-field form-field"
      >
        <slot :name="field.id" v-bind="{ field, index }"
          ><component
            v-model="field.value"
            v-bind="field.id in fieldsConfig ? fieldsConfig[field.id] : {}"
            v-on="getFieldListers(field.type, field.id)"
            :is="fieldsMap[field.type]"
            :disabled="getFieldProp('disabled', field)"
            :required="getFieldProp('required', field)"
            :items="getFieldProp('items', field)"
            :rules="getFieldRules(field)"
            :key="field.id"
            ><slot
              :name="field.id + '-data'"
              v-bind="{ field, index }"
            ></slot></component
        ></slot>
      </div>
    </div>
    <div class="form-generator__controls controls">
      <slot v-if="showSubmitBtn" name="submit-btn">
        <v-btn
          @click="submitForm()"
          color="#A5D6A7"
          class="controls__submit-btn submit-btn"
          ><slot name="submit-btn-data">Отправить</slot></v-btn
        >
      </slot>
      <slot v-if="showResetBtn" name="reset-btn"
        ><v-btn
          @click="resetForm()"
          color="#EF9A9A"
          class="controls__reset-btn reset-btn"
          ><slot name="reset-btn-data">Сбросить значения</slot></v-btn
        ></slot
      >
    </div>
  </v-form>
</template>

<styles lang="scss" scoped>
.form-generator {
  display: flex;
  flex-direction: column;
  gap: 15px;

  & .header {
    font-size: 1.5rem;

    @media (max-width: 1200px) {
      text-align: center;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px 10px;

    @media (max-width: 1200px) {
      justify-content: center;
    }
  }
}
</styles>
