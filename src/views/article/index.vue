<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
      <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 频道下拉渲染 -->
        <el-form-item label="频道：">
        <!-- 放置频道组件 -->
        <!-- v-model :value @input -->
        <!-- v-model 的语法糖本质，作用双向数据绑定，只能给表单元素绑定。
         设置值    v-bind:value="数据名字"
         返回值    v-on:input="数据名字=当前元素值"
         -->
        <my-channel v-model="reqParams.channel_id"></my-channel>

        </el-form-item>
        <!-- 内容管理列表渲染 -->
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <!-- 日期处理 -->
        </el-form-item>
        <el-form-item>
          <!-- 点击按钮实现搜索功能 -->
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <!-- 1插槽内容 -->
    <!-- <my-test>content</my-test>
    <my-test>内容</my-test> -->
    <!-- 2不写时默认 后备内容，也就是slot内的内容 -->
    <!-- <my-test></my-test> -->
    <!-- 3具名插槽 -->
    <!-- <my-test>
      <div slot="content">content</div>
      <div slot="footer">footer</div>
    </my-test> -->
    <!-- 作用域插槽 -->
    <!-- <my-test> -->
      <!-- 在此插槽上可以接收content插槽上所有自定义的属性的集合 -->
 <!-- <div slot="content" slot-scope="scope" >content 得到组件内部数据：{{scope.msg}}</div> -->
    <!-- 以上为2.6.0之前的写法 -->
    <!-- <template v-slot:content="scope">content 得到组件内部数据：{{scope.msg}}</template> -->
    <!-- </my-test> -->

    <el-card>
      <div slot="header">
        根据筛选条件共查询到{{total}} 条结果
      </div>
       <el-table :data="articles">
      <!-- 3-3封面列 -->
      <el-table-column  label="封面">
        <template slot-scope="scope">
         <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
          <div slot="error">
          <img src="../../assets/images/error.gif"  style="width:120px;height:80px" alt="">
          </div>
        </el-image>
        </template>
      </el-table-column>
<!-- 3-3-4其他列 -->
      <el-table-column  prop="title" label="标题"></el-table-column>
      <el-table-column label="状态">
        <!-- 插入额外的内容 -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
          <el-tag v-if="scope.row.status===1">待审核</el-tag>
          <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
          <el-tag v-if="scope.row.status===4" type="danger">删除</el-tag>
        </template>
      </el-table-column>

      <el-table-column  prop="pubdate" label="发布时间"></el-table-column>
      <el-table-column  label="操作" width="120px">
        <template slot-scope="scope">
        <!-- 插入额外的内容 -->
        <el-button plain @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
         <el-button plain @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align:center;margin-top:20px">
      <!-- @current-change  页码改变事件 -->
      <!-- 更新过数据后  当前页码也需要修改  选中对应的按钮 current-page -->
       <el-pagination
       background
       layout="prev, pager, next"
       :total="total"
       :page-size="reqParams. per_page"
       :current-page="reqParams.page"
       @current-change="changePager"
       >
        </el-pagination>
    </div>
    </el-card>

  </div>
</template>
<script>
// 局部组件
// import MyTest from '@/components/my-test'
// import MyBread from '@/components/my-bread'
export default {
  // created () {
  //   this.$http.get('articles').then(res => {
  //     console.log(res.data)
  //   })
  // }
  // components: {
  //   'my-test': MyTest,
  //   'my-bread': MyBread
  // },
  data () {
    return {
      // 筛选项表单数据，提交给后台参数
      // axios提交的数据，值为null
      reqParams: {
        status: null, // 默认值为全选中
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 日期数据
      dateArr: [],
      // 1-1准备文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 编辑函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      //  弹出确认框  点击确认后  发出删除请求  响应更新列表
      this.$confirm('亲，确认要永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        await this.$http.delete(`articles/${id}`)
        // 这两句代码没有执行，上面的代码报错。控制台没有错误是因为未把错误抛出
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 日期选择后的事件
    changeDate (dateArr) {
      // 严谨一些，清空数据考虑在内
      // console.log(dateArr)
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 内容管理筛选函数
    search () {
    // 筛选项是双向绑定  拿着对应的数据发请求即可  注意：重新筛选后页码从第一页开始显示
      this.reqParams.page = 1
      this.getArticles()
    },
    // 获取分页事件对应函数
    changePager (newPage) {
      //  修改获取数据的页码
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 2-2
    // 获取列表方法
    async getArticles () {
      // axios get传参  第二传参是对象 {params:指定传参对象}  发请求的时候自动拼接地址栏后
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang="less" >
.el-card{
  margin-bottom: 20px;
}
</style>
