const OS = require('opensubtitles-api')
const LIMIT_RESULTS = '500' // Before implementing some pagination

const OpenSubtitles = new OS({
  useragent: 'OSTestUserAgent',
  username: '',
  passowrd: '',
  ssl: true
})

export function getLanguages () {
  return OpenSubtitles.api.GetSubLanguages()
}

export function anonLogin () {
  return OpenSubtitles.login()
}

export function search (token, opts) {
  return OpenSubtitles.api.SearchSubtitles(token, [{
    query: opts.query,
    season: opts.season || undefined,
    episode: opts.episode || undefined,
    sublanguageid: opts.language || 'eng',
    limit: LIMIT_RESULTS
  }])
}

export function downloadSubtitle (token, subID) {
  return OpenSubtitles.api.DownloadSubtitles(token, [subID])
}
