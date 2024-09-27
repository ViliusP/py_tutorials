<template>
    <v-table density="compact" class="prose-table">
        <slot />
    </v-table>
</template>

<style>
.prose-table th[align="left"]{
    text-align: start !important;
}

.prose-table th[align="right"]{
    text-align: end !important;
}

.prose-table th[align="center"]{
    text-align: center !important;
}

.prose-h4 + .prose-table {
    margin-top: 1rem;
    margin-bottom: -0.375;
}
</style>