<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="formDate" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="formDate.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="formDate.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{num}}</b> 条结果：
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" icon="el-icon-edit" plain type="primary" circle></el-button>
            <el-button @click="del(scope.row.id)" icon="el-icon-delete" plain type="danger" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pager"
          :current-page="formDate.page"
          :page-size="formDate.per_page"
          :total="num"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formDate: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      options: [],
      time: [],
      articles: [],
      num: 0
    }
  },
  created () {
    // 获取文件列表数据
    this.getArticle()
  },
  methods: {
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.formDate })
      this.articles = data.results
      this.num = data.total_count
    },
    search () {
      this.formDate.page = 1
      this.getArticle()
    },
    changeDate (values) {
      this.formDate.begin_pubdate = values[0]
      this.formDate.end_pubdate = values[1]
    },
    pager (newPage) {
      // 提交当前页码给后台 才能获取对应的数据
      this.formDate.page = newPage
      this.getArticle()
    },
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    del (id) {
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 40px;
}
.box {
  text-align: center;
  margin-top: 30px;
}
</style>
