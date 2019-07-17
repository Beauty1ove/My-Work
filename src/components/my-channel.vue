<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  created () {
    // 获取频道数据
    this.getArticleList()
  },
  methods: {
    fn (value) {
      // value 你选中的值
      this.$emit('input', value)
    },
    // 获取频道数据
    async getArticleList () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      this.options = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
