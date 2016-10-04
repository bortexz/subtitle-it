<template>
  <div>
    <nav class='panel results'>
      <a class='panel-block result' v-for='result in results'
        @click='downloadSubtitle(result)'
        >
        <div class='result-text'>
          <strong>{{result.name}}</strong><br>
          {{result.releaseName}}
        </div>
        <div class='result-icons'>
          <span class='icon' v-if='result.hearingImpaired'>
            <i class='fa fa-deaf'></i>
          </span>
          <span class='icon' v-if='result.featured'>
            <i class='fa fa-check-circle-o'></i>
          </span>
          <span class='icon' v-if='result.hd'>
            <i>HD</i>
            <!--
              Waiting for HD font-awesome icon: https://github.com/FortAwesome/Font-Awesome/issues/518
             -->
          </span>
        </div>
      </a>
    </nav>
  </div>
</template>

<script>
  import {downloadSubtitle} from '../store/actions'

  export default {
    vuex: {
      getters: {
        results: state => state.results
      },
      actions: {
        downloadSubtitle
      }
    }
  }
</script>

<style lang='sass'>
  .results {
    border-radius: 0px;
    overflow-y: scroll;
    height: 240px;
  }

  .result {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .result-icons {
    display: flex;
    justify-content: row;
    flex-wrap: nowrap;
  }

  .result:hover {
    background-color: #d6d6d6 !important;
  }
</style>

