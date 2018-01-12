<template>
  <div id="app">
    <!-- <keep-alive> -->
     <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 700)
      } catch (e) {

      }
    }
}

</script>

<style>

</style>
