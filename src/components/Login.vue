<template>
  <div class="row mt-3">
    <div class="col-lg-12 col-md-12">
      <div class="card">
        <div class="card-body">
          <img src="../assets/logo.png" alt="" class="mx-auto d-block">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">email</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import axios from 'axios'
export default {
  data(){
    return {
      email:'',
      password:'',
    }
  },
  beforeRouteEnter:(to,from,next) => {
    next(vm=>vm.$store.dispatch("setUser",null))
  },
  methods:{
    onSubmit(){
      axios.get('user.json')
          .then(res=>{
            // console.log(res.data)
            const data = res.data
            const users = []
            for(let key in data){
              const user = data[key]
              users.push(user)
            }
            // console.log(users)
            // 实现过滤
            let result = users.filter((user)=>{
              return user.email === this.email && user.password ===this.password
            })
            // console.log(result)
            // 判断数组result的长度是否大于0
            if(result !=null && result.length >0){
              this.$store.dispatch("setUser",result[0].email)
              this.$router.push({name:'homeLink'})
            }else{
              alert('账号密码输入错误')
              this.$store.dispatch("setUser",null)
            }
          })
    }
  }
  
}
</script>
