<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 当el-table元素中注入data对象数组后，
   在el-table-column中用prop属性来对应对象中的键名即可填入数据，
      用label属性来定义表格的列名。可以使用width属性来定义列宽。-->
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
             <template slot-scope="scope">
             {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <!-- scope.row代表每行数据 -->
            <el-button
              @click="toggleStatus(scope.row)"
              type="success"
              v-if="!scope.row.comment_status"
              size="small"
            >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" type="danger" v-else size="small">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      comments: [],
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // scope.row  实参传给  row  算data.results
    async toggleStatus (row) {
      const {
        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      // 修改当前状态
      row.comment_status = data.allow_comment
    }
  }
}
</script>
<style scoped lang="less" >
</style>
