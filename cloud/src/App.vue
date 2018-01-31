<template>
  <div id="app">
    <!-- <keep-alive> -->
     <router-view/>
    <!-- </keep-alive> -->
    <play-bar></play-bar>
  </div>
</template>

<script>
import playBar from './components/player';
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
    },
    components: {
      playBar,
    }
}

</script>

<style>

</style>
