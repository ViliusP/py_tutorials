<template>
    <div class="table-color-block">
        <!-- Your content here -->
    </div>
</template>
  
<script setup lang="ts">


defineProps({
    color: {
        type: String,
        default: '#ffffff', // Use a default color if none is provided
    },
});
</script>
  
<style>
.table-color-block {
    width: 100%;
    height: 100%;
    background-color: v-bind(color);
    /* Dynamically set the background color */
    box-sizing: border-box;
    /* Ensure padding and border are included in the total width and height */
    margin: 2px;
}
</style>
  