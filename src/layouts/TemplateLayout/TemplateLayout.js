//TODO: add compiler public path to use in link href
// import '../../../config'
const config = require('../../../config/project.config')

const TemplateLayout = {
  htmlAttributes: { lang: 'en' },
  title: 'Gfycat',
  defaultTitle: 'Default Gfycat',
  titleTemplate: '%s - Create, Share GIFs on Gfycat',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' }
  ],
  link: [
    // { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${config.}` },
    // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '' },
    // { rel: 'icon', type: 'image/png', sizes: '96x96', href: '' },
    // { rel: 'icon', type: 'image/png', sizes: '192x192', href: '' },

    { rel: 'canonical', href: 'https://gfycat.com' }
  ],
  script: [],
  style: []
}

export default TemplateLayout
