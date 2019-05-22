const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true, typeInterval: 1 })

nightmare
  .goto('https://www.blackrock.com/tools/pretrade')
  .wait('#signOnBean')
  .type('#userName', '')
  .type('#password', '')
  .click('#submitLogin')
  .wait('.application')
  .cookies.get()
  .end()
  .then((cookies) => {
    const cookie = cookies.find(c => c.name === 'JSESSION_blk-tools02');
    console.log(cookie);
  })
  .catch(error => {
    console.error('Search failed:', error)
  })