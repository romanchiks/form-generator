import { VCheckbox } from "vuetify/lib";
import { VDatePicker } from "vuetify/lib";
import { VTimePicker } from "vuetify/lib";

export const FIELDS_MAP = {
  textarea: () => import("vuetify/lib/components/VTextarea"),
  input: () => import("vuetify/lib/components/VTextField"),
  select: () => import("vuetify/lib/components/VSelect"),
  checkbox: VCheckbox,
  file: () => import("vuetify/lib/components/VFileInput"),
  date: VDatePicker,
  time: VTimePicker,
};
