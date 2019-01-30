<template>
  <div class="view-home">
    <Filters/>
  </div>
</template>

<script>
import Filters from '../components/Filters'
import '@/utils/leancloud'

export default {
  components: {
    Filters
  },
}
</script>
