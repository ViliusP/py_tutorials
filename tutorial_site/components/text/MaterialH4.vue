<template>
  <h4 class="material-h4" v-bind="$attrs">
    <slot />
  </h4>
</template>

<style>
.material-h4 {
	font-size: 1.45rem !important;
	font-weight: 500;
	line-height: 1.6rem;
	letter-spacing: 0.0073529412em !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}
</style>
