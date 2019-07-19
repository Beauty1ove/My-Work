<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="dialogVisible=true">
      <img src="../assets/images/default.png" alt />
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
            <el-radio-group size="small" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img-item" v-for="item in 8" :key="item">
            <img src="../assets/images/avatar.jpg" alt />
          </div>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false
      },
      // 上传图片后预览的地址
      uploadImageUrl: null
    }
  }
}
</script>

<style scoped lang='less'>
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
