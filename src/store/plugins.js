/* global localStorage */

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    console.log(mutation.type)
    switch (mutation.type) {
      case 'ANONLOGIN_SUCCESS':
        localStorage.setItem('token', state.token)
        break
      case 'ANONLOGIN_ERROR':
        localStorage.removeItem('token')
        break
      case 'GET_LANGUAGES_SUCCESS':
        localStorage.setItem('languages', JSON.stringify(state.languages))
        break
      case 'GET_LANGUAGES_ERROR':
        localStorage.removeItem('languages')
        break
    }
  })
}

export default [localStoragePlugin]
