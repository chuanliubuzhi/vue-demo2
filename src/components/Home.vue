<template>
  <div class="row">
    <div class="col-sm-12 text-center" id="home">
      <div class="background">
        <h1>欢迎大家平常pizza！</h1>
        <h2>这里有你非常喜欢的pizza</h2>
        <button @click="goToMenu" class="btn btn-success">Let's order!</button>
      </div>
    </div>      
  </div>
</template> 
<script>
export default {
  methods:{
      goToMenu:function(){
        //   this.$router.go(-1) 跳转到上一次路由地址
        //   this.$router.replace('/menu') 跳转到指定路由地址
        //   this.$router.replace({name:'menuLink'}) 跳转到路由名字下
        this.$router.push('./menu')  //一般都用这个 跳转到指定地址 this.$router.push({name:'menuLink'})
      }
  }
}
</script>
<style>
  #home{
    background: url('../assets/pizza.jpg') no-repeat;
    background-size: 100%;
    height: 85vh;
    padding: 10%;

  }
  h1,h2{
    margin: 6%;
  }
  .background{
    background: #eee;
    opacity: .8;
    max-width: 70vw;
    margin: 0 auto;
    padding: 20px 0;
  }
</style>
