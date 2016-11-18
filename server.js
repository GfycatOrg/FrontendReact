import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router'
import createLocation from 'history'
import routes from 'routes'

const app = express()

app.use( (req, res) => {
  const location = createLocation(req.url)

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }

    if (!renderProps) return res.sendStatus(404)

    let IniticalComponent = (<RoutingContext {...renderProps} />)

    let componentHTML = renderToString(InitialComponent)

    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Gfycat</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `

    res.send(HTML)
  })
})

export default app
