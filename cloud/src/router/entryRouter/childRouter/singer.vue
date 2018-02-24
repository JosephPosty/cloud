<template>

</template>
<script>
import playBar from '../../.././components/player.vue';
export default {
  data () {
    return {
      singerId: '',

    }
  },
  methods: {
    getSingerinfo (id) {
      let that = this;
      that.$http.get(BASE + '/artists?id='+ id).then((data) => console.log(data))
    }
  },
  components: {
    playBar,
  },
  created () {
    this.singerId = this.$route.params.singerId;
  },
  mounted () {
    this.getSingerinfo(this.singerId);
    console.log(this.$route.params)
  }
}
</script>
