<template>
  <div id="app">
    <Nav/>
    <div class="main-content">
      <router-view/>
    </div>
    <ImageViewer/>
  </div>
</template>

<script>
import ImageViewer from './components/ImageViewer'
import Nav from './components/Nav'

export default {
  components:{
    ImageViewer,
    Nav
  }
}
</script>

<style lang="scss">
.main-content{
  background: #f5f5f5;
}
</style>
