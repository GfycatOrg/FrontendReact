const Server = require('./server')
const app = Server.app()
const port = 3000

app.listen(port, () => {
  console.log('listening', port)
})
