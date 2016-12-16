import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const renderHtmlLayout = (head, body, resolverPayload = {}) => {
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
      head.style.toComponenet(),
      React.createElement(
        'script',
        { dangerouslySetInnerHTML:
          { __html: `__REACT_RESOLVER_PAYLOAD__=${JSON.stringify(resolverPayload)}` }
        }
      ),
      React.createElement('body', null, body)
    )
  )

  return '<!DOCTYPE html>' + html
}
