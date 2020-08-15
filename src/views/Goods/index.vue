<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a href="javascript:;"
           @click="navHandle(i)"
           :class="currentIndex === i ? 'active':''"
           v-for="(item,i) in navList" :key="i">{{item.title}}
        </a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min">
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max">
          <el-button type="primary" size="small" style="margin-left: 10px;" @click="SelectPriceInterval">确定</el-button>
          <el-button type="info" size="small" style="margin-left: 10px;" @click="clearPriceInterval">清空</el-button>
        </div>
      </div>
    </div>
    <div>
      <div class="goods-box w">
        <mall-goods v-for="goods in goodsList" :key="goods.id" :goods="goods"></mall-goods>
      </div>
      <div class="w">
        <el-pagination
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MallGoods from '@/components/MallGoods'
export default {
  components: {
    MallGoods
  },
  data () {
    return {
      max: '',
      min: '',
      navList: [
        { title: '综合排序' },
        { title: '价格从低到高' },
        { title: '价格从高到低' }
      ],
      currentIndex: 0,
      goodsList: [],
      currentPage: 1,
      size: 20,
      sort: '',
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  watch: {
    $route: 'getGoodsList'
  },
  methods: {
    toSort (v) {
      this.sort = v
      this.getGoodsList()
    },
    reset () {
      this.max = ''
      this.min = ''
      this.sort = ''
      this.currentPage = 1
      this.getGoodsList()
    },
    handleSizeChange (size) {
      this.size = size
      this.getGoodsList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getGoodsList()
    },
    SelectPriceInterval () {
      this.getGoodsList()
    },
    clearPriceInterval () {
      this.reset()
    },
    navHandle (i) {
      this.currentIndex = i
      switch (i) {
        case 0 : // 默认排序
          this.reset()
          break
        case 1: // 低到高
          this.toSort(1)
          break
        case 2: // 高到低
          this.toSort(-1)
          break
        default:
          break
      }
    },
    async getGoodsList () {
      const url = this.$route.query.cid ? `/api/goods/allGoods?page=${this.currentPage}&size=${this.size}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}&cid=${this.$route.query.cid}` : `/api/goods/allGoods?page=${this.currentPage}&size=${this.size}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`
      const { data: res } = await this.$http.get(url)
      this.goodsList = res.data
      this.total = res.total
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 30px 0 0;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  overflow: hidden;
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>
