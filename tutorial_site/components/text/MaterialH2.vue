<template>
    <h2 class="material-h2" v-bind="$attrs">
      <slot />
    </h2>
  </template>
  
  <style>
.material-h2 {
	font-size: 2.8rem !important;
	font-weight: 400;
	line-height: 3.25rem;
	letter-spacing: 0 !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}
  </style>
  