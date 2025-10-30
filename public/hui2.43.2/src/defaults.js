import locale from '@hui/locale'
import { version } from '../package.json'
import Components from './components.js'
import Plugins from './plugins.js'

export const makeInstaller = (components, plugins) => {
  const install = (app, opts = {}) => {
    locale.use(opts.locale)
    locale.i18n(opts.i18n)

    components.forEach((component) => {
      if (Array.isArray(component)) {
        component.forEach((svg) => {
          app.component(svg.name, svg)
        })
      }
      else {
        app.component(component.name, component)
      }
    })

    plugins.forEach((plugin) => {
      app.use(plugin)
    })
  }

  return {
    version,
    install,
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue)
  install(window.Vue)

export default makeInstaller(Components, Plugins)
