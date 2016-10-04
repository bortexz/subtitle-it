<template>
  <div class='columns search-container'>
    <form v-on:submit.prevent>
      <label class="label">Search</label>
      <p class="control">
        <input class="input input-name" type="text" placeholder="Name" v-model='query'>
        <input class="input input-season" type="number" placeholder="Sea." v-model='season'>
        <input class="input input-episode" type="number" placeholder="Ep." v-model='episode'>
        <span class="select">
          <select class='input-language' v-model='language'>
            <option v-for='lang in languages' v-bind:value='lang.subLanguageID'>{{lang.languageName}}</option>
          </select>
        </span>
        <button class='button is-info' @click='search({query, season, episode, language})'>Search</button>
      </p>
      <p class="control">

      </p>
    </form>
  </div>
</template>

<script>

import {search} from '../store/actions'

export default {
  vuex: {
    actions: {
      search
    },
    getters: {
      languages: state => state.languages,
      languageDefault: state => state.languageDefault || 'eng'
    }
  },
  data: function() {
    return {
      query: '',
      season: null,
      episode: null,
      language: this.languageDefault
    }
  }
}
</script>

<style>
.input-name {
  width: 150px;
}

.input-season {
  width: 60px;
}

.input-episode {
  width: 60px;
}

.input-language {
  width: 100px;
}

.search-container {
  height: 100px;
  margin: 0px;
}

form {
  padding: 20px;
}
</style>
