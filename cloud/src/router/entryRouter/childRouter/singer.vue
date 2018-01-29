<template>
  
</template>
<script>
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
  created () {
    this.singerId = this.$route.params.singerId;
  },
  mounted () {
    this.getSingerinfo(this.singerId);
    console.log(this.$route.params)
  }
}
</script>
