<template>
  <div id="app">
    <div class="wrapper">
        <SideBar/>
        <div class="content">
          <div>
            <Header/>
            <router-view></router-view>
          </div>
        </div>
    </div>
    <EmployeeDetail />
    <MesageBox />
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import Header from './components/Header.vue';
import MesageBox from './components/MessageBox.vue';
import EmployeeDetail from './components/EmployeeDetail.vue';

export default {

  components: {
    SideBar, Header, EmployeeDetail, MesageBox,
  },
}
</script>

<style src="./css/app.css"></style>
<style src="./css/googlefont.css"></style>
