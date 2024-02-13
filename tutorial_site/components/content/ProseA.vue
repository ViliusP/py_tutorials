<template>
    <NuxtLink class="a-link" :href="href" :target="target">
        <slot />
    </NuxtLink>
</template>
  
<script setup lang="ts">
defineProps({
    href: {
        type: String,
        default: ''
    },
    target: {
        type: String,
        default: undefined,
        required: false
    }
})
</script>
  
<style>
.a-link {
    color: inherit;
}

.a-link * {
    letter-spacing: 0;
    text-decoration: underline;
}
</style>