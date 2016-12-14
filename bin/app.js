const Server = require('./server')
const app = Server.app()
const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log('listening', port)
})
