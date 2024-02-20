<template>
    <p class="prose-p text-justify">
        <slot />
    </p>
</template>

<style>
.prose-p {
    font-size: 1.375rem !important;
    font-weight: 300;
    line-height: 2rem;
    letter-spacing: 0.002em !important;
    font-family: "Noto Sans", "Roboto", sans-serif;
    text-transform: none !important;
    margin-top: 1.375rem;
    margin-bottom: 1.375rem;
}

.prose-p + ul, .prose-p ol {
    margin-top: -1.375rem;
    margin-bottom: -0.375;
}
</style>