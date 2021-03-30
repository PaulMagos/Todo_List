<template>
  <div id="app" class="container w3-card-4 w3-white w3-round">
    <div class="w3-padding-16"></div>
    <img class="logo" src="./assets/logo1.png" alt="logo">
    <TodoComponent/>
  </div>
</template>


<script>
import TodoComponent from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoComponent,
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 100px;
}
</style>
