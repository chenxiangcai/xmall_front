const fs = require('fs')
module.exports = {
  devServer: {
    before (app, serve) {
      app.get('/api/goods/home', (req, res) => {
        // eslint-disable-next-line handle-callback-err
        fs.readFile('./db/home.json', 'utf8', (err, data) => {
          if (!err) res.json(JSON.parse(data))
        })
      })
    }
  }
}
