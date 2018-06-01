<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <new-pizza></new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- 品种展示 -->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <tr>
          <th>品种</th>
          <th>删除</th>
        </tr>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button class="btn btn-outline-danger btn-sm" @click="deleteData(item)">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 

<script>
import newPizza from './NewPizza'
export default {
  methods:{
    deleteData(item){
      fetch("https://pizza-app-74df7.firebaseio.com/menu/" + item.id + "/.json",{
        method:"DELETE",
        headers:{
          'Content-type':"application-json"
        }
      })
      .then(res=>res.json())
      // .then(data=> this.$router.push({name:'menuLink'}))
      .then(data=> {
        this.$store.commit('removeMenuItems',item)
      })
    }
  },
  data(){
    return {
      // getMenuItems:[]
    }
  },
  components:{
    newPizza: newPizza
  },
  computed:{
    getMenuItems:{
        // 在vuex中获得getMenuItems属性
        get(){
          // return this.$store.state.menuItems
          // 通过getters获取数据
           return this.$store.getters.getMenuItems
        },
        set(){
          
        }
    }
  },
  created(){
    fetch("https://pizza-app-74df7.firebaseio.com/menu.json")
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      let menuArray=[]
      for(let key in data){
        
        data[key].id = key
        menuArray.push(data[key])
      }
      // this.getMenuItems = menuArray
      this.$store.commit('setMenuItems',menuArray)
    })  
  }
  // data(){
  //   return {
  //     name:"Henry",
  //   }
  // },
  // beforeRouteEnter:(to,from,next)=>{
  //   next(vm =>{
  //      alert("Hello " + vm.name)
  //   })
  // }
  // beforeRouteLeave(to,from,next){
  //   if(confirm('确定离开？') == true){
  //     next()
  //   }else{
  //     next(false)
  //   }
  // }
}
</script>
