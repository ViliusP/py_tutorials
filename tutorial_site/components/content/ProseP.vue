<script setup lang="ts">
import MaterialP from "~/components/text/MaterialP.vue";
</script>

<template>
    <MaterialP class="prose-p text-justify">
        <slot />
    </MaterialP>
</template>

<style>
.prose-p {
    margin-top: 1.375rem;
    margin-bottom: 1.375rem;
}

.prose-p + ul, .prose-p ol {
    margin-top: -1.375rem;
    margin-bottom: -0.375;
}

.prose-h4 + .prose-p {
    margin-top: 1rem;
    margin-bottom: -0.375;
}

</style>