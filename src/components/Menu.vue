<template>
<div class="row">
  <!-- 菜单 -->
  <div class="col-sm-12 col-md-8">
    <table class="table">
      <thead class="thead-defalt">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>加入</th>
        </tr>
      </thead>
      <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td><strong>{{item.name}}</strong></td>
        </tr>
        <tr v-for="option in item.options" :key="option.size">
          <td>{{option.size}}</td>
          <td>{{option.price}}RMB</td>
          <td><button class="btn btn-sm btn-outline-success" @click="addToBacsket(item,option)">+</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 购物车 -->
  <div class="col-sm-12 col-md-4">
    <div v-if="baskets.length>0">
      <table class="table">
        <thead class="thead-defalt">
          <tr>
            <th>数量</th>
            <th>品种</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody v-for="item in baskets" :key="item.a">
          <tr>
            <td>
              <button class="btn btn-sm jiajian" @click="decreaseQuantity(item)">-</button>
              <span>{{item.quantity}}</span>
              <button class="btn btn-sm jiajian" @click="increaseQuantity(item)">+</button>
            </td>
            <td>{{item.name}}{{item.size}}</td>
            <td>{{item.price * item.quantity}}RMB</td>
          </tr>
        </tbody>
      </table>
      <p>总价:{{total}}RMB</p>
      <button class="btn btn-success btn-block">提交</button>
    </div>
    <div v-else>
      {{basketText}}
    </div>
  </div>
  </div>
</template> 
<script>
// import axios from 'axios'
export default {
  data(){
    return {
      baskets:[],
      basketText:"购物车没有任何东西",
      // getMenuItems:{}  
    }
  },
  created(){
    this.fetchData()
  },
  computed:{
    getMenuItems(){
      // 在vuex中获得getMenuItems属性
      // return this.$store.state.menuItems
      // 通过getters获取数据
      return this.$store.getters.getMenuItems
    },
    total(){
      let totalCost = 0
      for(let index in this.baskets){
        let individalItem = this.baskets[index]
        totalCost += individalItem.quantity * individalItem.price 
      }
      return totalCost
    }
  },
  methods:{
    addToBacsket(item,option){
      let basket = {
        name:item.name,
        size: option.size,
        price: option.price,
        quantity:1
      }

      if(this.baskets.length>0){
        //过滤
        let result = this.baskets.filter((basket)=>{
          return (basket.name ===item.name&& basket.price ===option.price )
        })
        if(result !=null && result.length >0){
          result[0].quantity++
        }else{
          this.baskets.push(basket)
        }
      }else{
        this.baskets.push(basket)
      }

      
    },
    decreaseQuantity(item){
      item.quantity--
      if(item.quantity<=0){
        this.removeFromBasket(item)
      }
      
    },
    increaseQuantity(item){
      item.quantity++
    },
    removeFromBasket(item){
      this.baskets.splice(this.baskets.indexOf(item),1)
    },
    fetchData(){
      // 第一种 fatch方法
      // fetch("https://pizza-app-74df7.firebaseio.com/menu.json")
      //   .then(res=>{
      //    return res.json()
      // })
      //   .then(data => {
      //     this.getMenuItems=data
      //   })

      // 第二种 导入axios 
      // axios.get("menu.json") //因为设置了main.js设置了根目录导向 直接输入对应的文件名既可以
      //       .then(res => this.getMenuItems = res.data)

      // 第三种 在main.js里面配置axios在Vue里面的原型
      // this.http.get("menu.json")
      //           .then(res => this.getMenuItems = res.data)

      // 将请求下来的数据存储到vuex中
      this.http.get("menu.json")
                .then(res => this.$store.commit("setMenuItems",res.data))
    }
  }
} 
</script>
<style>
  .jiajian{
    background-color: #fff;
  }

</style>
