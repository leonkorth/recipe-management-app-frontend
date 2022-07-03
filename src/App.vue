<template>
  <navbar></navbar>
  <router-view/>
</template>
<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar }
}
</script>
<style lang="scss">
@import "src/assets/style/overall.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //background-color: $bg-main;
}

h1 {
  color: darkslategrey;
}

input {
  margin: 10px;
}
nav {
  padding: 30px;
  &.a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
a{
  &.navbar-brand {
    color: darkslategrey;
    font-weight: bold;
  }
  &.nav-link {
    color: darkslategrey;
  }
  &.router-link-exact-active {
    color: #42b983;
  }
}

/*

nav a.router-link-exact-active {
  color: #42b983;
}
*/
button.btn {
  background-color: $button;
  border-color: $button-border;
  &:hover {
    background: #0fc499;
    border-color: $bg-main;
  }
}
.logo{
  width: 25px;
  height: auto;
}




</style>
