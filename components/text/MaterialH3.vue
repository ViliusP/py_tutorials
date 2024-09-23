<template>
  <h3 class="material-h3" v-bind="$attrs">
    <slot />
  </h3>
</template>

<style>
.material-h3 {
	font-size: 1.5rem !important;
	font-weight: 600;
	line-height: 1.625rem;
	letter-spacing: 0,0073529412em !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}
</style>
