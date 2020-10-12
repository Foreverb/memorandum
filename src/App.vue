<template>
  <div id="app">
    <NavBar/>
    <List/>
    <Dialog v-if="$store.state.showDialog"/>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";
import NavBar from "./components/navBar.vue";
import List from "./components/list.vue";
import Dialog from "./components/editDialog.vue";

@Component({
  components: {
    NavBar,
    List,
    Dialog
  }
})
export default class App extends Vue{
  
}
</script>
<style scoped>
#app{
  min-width: 100vw;
  min-height: 100vh;
  background-image: url("./assets/ba.jpeg")
}
</style>