import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

export const renderHtmlLayout = (head, content, scripts, resolverPayload = {}) => {
  const renderedContent = renderToString(<content />)
  const body = [
    <div key='body' id='root' dangerouslySetInnerHTML={{__html: renderedContent}} />,
    scripts
  ]

  const html = React.createElement(
    'html',
    head.htmlAttributes.toComponent(),
    React.createElement(
      'head',
      null,
      head.title.toComponent(),
      head.meta.toComponent(),
      head.base.toComponent(),
      head.link.toComponent(),
      head.script.toComponent(),
      head.style.toComponent(),
      React.createElement(
        'script',
        { dangerouslySetInnerHTML:
          // { __html: `__REACT_RESOLVER_PAYLOAD__=${JSON.stringify(resolverPayload)}` }
          { __html: `___INITIAL_STATE__=${JSON.stringify(resolverPayload)}` }
        }
      )
    ),
    React.createElement(
      'body',
      null,
      body
    )
  )

  return '<!DOCTYPE html>' + renderToStaticMarkup(html)
}
