import {search as OSSearch,
  anonLogin as OSLogin,
  getLanguages as OSGetLanguages,
  downloadSubtitle as OSDownloadSubtitle} from '../opensubtitles/api'

function _login (store) {
  return new Promise((resolve, reject) => {
    OSLogin().then(res => {
      if (res.status === '401 Unauthorized') {
        let err = new Error('401 Unauthorized')
        store.dispatch('ANONLOGIN_ERROR', err)
        reject(err)
      }
      store.dispatch('ANONLOGIN_SUCCESS', res)
      resolve()
    }).catch(e => {
      store.dispatch('ANONLOGIN_ERROR', e)
      reject(e)
    })
  })
}

export const search = (store, opts) => {
  store.dispatch('SEARCH')
  OSSearch(store.state.token, opts).then(res => {
    if (res.status === '401 Unauthorized') {
      _login(store).then(() => {
        search(store, opts)
      }).catch(e => {
        console.log('login catch', e)
        store.dispatch('SEARCH_ERROR')
      })
    } else {
      store.dispatch('SEARCH_SUCCESS', res)
    }
  }).catch(e => {
    console.log('last catch', e)
    store.dispatch('SEARCH_ERROR')
  })
}

export const login = (store) => {
  store.dispatch('ANONLOGIN')
  _login(store)
}

export const getLanguages = ({dispatch}) => {
  dispatch('GET_LANGUAGES')
  OSGetLanguages().then(res => {
    dispatch('GET_LANGUAGES_SUCCESS', res)
  }).catch(e => {
    dispatch('GET_LANGUAGES_ERROR', e)
  })
}

export const downloadSubtitle = ({dispatch, state}, sub) => {
  console.log(sub)
  dispatch('DOWNLOAD_SUBTITLE', sub.releaseName)
  OSDownloadSubtitle(state.token, sub.subID).then(res => {
    dispatch('DOWNLOAD_SUBTITLE_SUCCESS', res)
  }).catch(err => {
    dispatch('DOWNLOAD_SUBTITLE_ERROR', err)
  })
}

export const backToResults = store => {
  store.dispatch('BACK_TO_RESULTS')
}
