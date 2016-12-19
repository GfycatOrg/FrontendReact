const fs = require('fs')
const Server = require('./server')
const app = Server.app()
const port = process.env.PORT || 3000

app.listen(port, () => {
  if (port === 'server.sock') fs.chmodSync(port, '777')
	console.log('listening', port)
})
