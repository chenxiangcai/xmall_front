<template>
  <el-input-number v-model="num" @change="handleChange" :min="1" :max="999"></el-input-number>
</template>

<script>
export default {
  name: 'BuyNum',
  data () {
    return {
      num: 1
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('handleGoodsNum', val)
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
