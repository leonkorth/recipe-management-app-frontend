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
  background-color: $bg-main;
}
br {
  display: block;
  margin: 5px 0;
}

html {
  height: 100%;
  background-color: $bg-main;
}
h1 {
  color: darkslategrey;
}

input {
  margin: 10px;
}
a{

  &.navbar-brand {
    color: darkslategrey;
    font-weight: bold;
    &:hover {
    color: #203636;
    }
  }
  &.nav-link {
    color: $nav-text;
    &:hover {
      color: $nav-text-hover;
    }
  }
  &.router-link-exact-active {
    color: darkslategrey;
    font-weight: 530;
    &:hover {
      color: $nav-text-hover;
    }
    &:focus {
      color: $nav-text-hover;
    }
  }
}
nav {
  padding: 30px;
  background-color: $bg-nav;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
}



button.btn {
  background-color: $button;
  border-color: $button-border;
  &:hover {
    background: #6ea157;
    border-color: $bg-main;
  }
  &:focus {
    background: #6ea157;
    border-color: $bg-main;
    box-shadow: none !important;
  }
  &.btn-danger {
    background-color: $button-warning;
    border-color: $button-warning-border;
    &:hover {
      background-color: #d13d11;
    }
  }
}
.logo{
  width: 25px;
  height: auto;
}

</style>
