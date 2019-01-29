<template>
  <svg class="icon" aria-hidden="true" :style="{fontSize:size,color:color}">
      <use :xlink:href="`#ic-${name}`"></use>
  </svg>
</template>

<script>
  export default {
    props:['name','size','color']
  }
</script>

<style scoped>

</style>
