/* global localStorage */

import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'

import zlib from 'zlib'

Vue.use(Vuex)

const state = {
  loading: false,
  token: localStorage.getItem('token') || null,
  defaultLang: localStorage.getItem('defaultLang') || 'eng',
  languages: JSON.parse(localStorage.getItem('languages') || 'null'),
  results: JSON.parse(localStorage.getItem('results') || 'null'),
  lastSubtitle: JSON.parse(localStorage.getItem('lastSubtitle') || 'null'),
  lastSubtitleName: JSON.parse(localStorage.getItem('lastSubtitle') || 'null')
}

const mutations = {
  // Search
  SEARCH (state) {
    state.lastSubtitle = null
    state.lastSubtitleName = null
  },
  SEARCH_SUCCESS (state, res) {
    state.results = res.data.map(item => {
      return {
        subID: item.IDSubtitleFile,
        releaseName: item.MovieReleaseName,
        downloadLink: item.SubDownloadLink,
        rating: item.SubRating,
        name: item.MovieName,
        hearingImpaired: !!parseInt(item.SubHearingImpaired, 10),
        hd: !!parseInt(item.SubHD, 10),
        featured: !!parseInt(item.SubFeatured, 10)
      }
    })
  },
  SEARCH_ERROR (state, e) {
  },

  // Do anonymous login and get token
  ANONLOGIN (state) {},
  ANONLOGIN_SUCCESS (state, info) {
    console.log(info)
    state.token = info.token
  },
  ANONLOGIN_ERROR (state, e) {
    console.log(e)
  },

  // Available languages
  GET_LANGUAGES (state) {},
  GET_LANGUAGES_SUCCESS (state, res) {
    state.languages = res.data.map(item => ({
      languageName: item.LanguageName,
      subLanguageID: item.SubLanguageID
    }))
  },
  GET_LANGUAGES_ERROR (state, e) {
    console.log(e)
  },

  // Download subtitle
  DOWNLOAD_SUBTITLE (state, subName) {
    state.lastSubtitleName = subName
  },
  DOWNLOAD_SUBTITLE_SUCCESS (state, res) {
    // process res
    console.log(res)
    let b64data = res.data[0].data
    let gzipData = Buffer.from(b64data, 'base64')


    let bufferedSub = zlib.gunzipSync(gzipData)
    state.lastSubtitle = bufferedSub.toString()
  },
  DOWNLOAD_SUBTITLE_ERROR (state, e) {
    console.log(e)
    state.lastSubtitle = null
    state.lastSubtitleName = null
  },
  BACK_TO_RESULTS (state) {
    state.lastSubtitle = null
    state.lastSubtitleName = null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins
})
