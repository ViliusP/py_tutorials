<template>
  <v-list-item class="list-item" tag="li" density="compact">
    <template v-slot:prepend>
      <v-icon size="small">
        <v-icon
          v-for="icon in icons"
          :icon="icon"
          :class="{ 'multiple-icons': icons.length > 1 }"
        />
      </v-icon>
    </template>
    <slot />
  </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
  index?: { type: number | null; default: null };
}>();

const icons = computed(() => {
  if (props.index == null || props.index == undefined)
    return ["mdi-circle-medium"];
  // @ts-ignore
  const adjustedIndex = props.index + 1;
  if (adjustedIndex <= 10) {
    return [`mdi-numeric-${adjustedIndex}`];
  }
  const digits = splitToDigits(adjustedIndex);
  return digits.map((d) => `mdi-numeric-${d}`);
});

function splitToDigits(n: number): number[] {
  var digits = [];
  while (n != 0) {
    digits.push(n % 10);
    n = Math.trunc(n / 10);
  }
  digits.reverse();
  return digits;
}

</script>

<style>
.list-item {
  font-size: 1.375rem !important;
  font-weight: 300;
  line-height: 1.75rem;
  letter-spacing: 0.002em !important;
  font-family: "Noto Sans", "Roboto", sans-serif;
  text-transform: none !important;
}

.multiple-icons {
  min-width: 0.275em;
  width: 0.275em;
}
</style>
