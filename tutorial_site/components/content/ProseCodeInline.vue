<template>
    <code class="px-2 py-1 bg-grey-darken-4 rounded"><slot /></code>
</template>

<script setup>
const props = defineProps();

// Console log all props
console.log(props);

</script>