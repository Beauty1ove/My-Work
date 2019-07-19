<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="search">
      <img :src="value||dafaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- v-model="activeName"  activeName是选项卡标签的name属性的值-->
      <!-- label="用户管理"  选项卡标签的文字 -->
      <!-- el-tab-pane 标签的内容  就是选项卡对应的内容 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <div style="margin-bottom:10px">
            <el-radio-group size="small" v-model="reqParams.collect" @change="search">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="img-item"
            :class="{selected:selectedImageUrl===item.url}"
            @click="toggle(item.url)"
            v-for="item in images"
            :key="item.url"
          >
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="total"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dafaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片后预览的地址
      uploadImageUrl: null,
      images: [],
      total: 0,
      selected: false,
      selectedImageUrl: null,
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('user')).token
      },
      dafaultImage
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        // 如果是 素材 使用 selectedImageUrl 做为封面图
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 如果是 上传图片  使用 uploadImageUrl 做为封面图
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    toggle (url) {
      this.selectedImageUrl = url
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.image-container{
  display: inline-block;
  margin-right: 20px;
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      //css的时候 .img-item.selected::before{} 加上selected class加遮罩层
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    // 属性的作用：图片填充的规则，等比例缩放 完整显示在容器内
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
