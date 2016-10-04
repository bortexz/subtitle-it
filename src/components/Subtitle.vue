<template>
  <div class='subtitle'>
    <div class='subtitle-drag file-icon file-icon-lg' data-type='subs' draggable='true' @dragstart='dragstart'></div>
    <button class='button is-primary' @click='download'>Download</button>

    <button class='button is-info' @click='backToResults'>Back</button>
  </div>
</template>

<script>
  import {backToResults} from '../store/actions'

  export default {
    vuex: {
      getters: {
        subtitle: state => {
          let blob = new Blob([state.lastSubtitle], {type: "application/octet-stream"})
          return URL.createObjectURL(blob)
        },
        subtitleName: state => state.lastSubtitleName
      },
      actions: {
        backToResults
      }
    },
    methods: {
      dragstart (e) {
        console.log(e.dataTransfer.files)
        e.dataTransfer.allowEffect = 'move'
        e.dataTransfer.setData("DownloadURL", "application/octet-stream:" + this.subtitleFileName + ":" + this.subtitle)
      },
      download (e) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = this.subtitle;
        a.download = this.subtitleFileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    },
    computed: {
      subtitleFileName () {
        return this.subtitleName + '.srt'
      }
    }
  }
</script>

<style lang='sass'>
.subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 200px;

  justify-content: space-around;
}

.subtitle-drag {

}
</style>
