<template>
  <div id='app'>
    <TopBar></TopBar>
    <div>
      <Search v-if='ready'></Search>
      <div v-else>
        Loading...
      </div>
      <Results v-if='results && !subtitle'></Results>
      <Subtitle v-if='subtitle'></Subtitle>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'
import TopBar from './TopBar.vue'
import Results from './Results.vue'
import Subtitle from './Subtitle.vue'

import {login, getLanguages} from '../store/actions'

import store from '../store/store'

// Initialize state from localStorage or API
const token = store.state.token
if (!token) {
  login(store)
}
const languages = store.state.languages
if (!languages) {
  getLanguages(store)
}

export default {
  components: {
    Search,
    TopBar,
    Results,
    Subtitle
  },
  vuex: {
    getters: {
      ready: state => state.token && state.languages,
      results: state => state.results,
      subtitle: state => state.lastSubtitle
    }
  }
}
</script>

<style lang='sass'>
  $fa-font-path: "../styles/vendor/fonts/";

  @import '../../node_modules/bulma/bulma';
  @import '../styles/vendor/font-awesome-4.6.3/scss/font-awesome';

  html {
    overflow-y: auto;
  }

  body {
    height: 400px;
  }
</style>
<style lang='css' src='../styles/fileicon.css'></style>§
