import { dirname, isAbsolute, join, resolve } from 'node:path'
import { genDynamicImport, genImport } from 'knitwork'

import type { Plugin } from 'vite'

function AsyncComponentLoader(): Plugin {
  const DYNAMIC_COMP_REGEX = /\.vue\?async$/

  return {
    name: 'vite-async-component',
    enforce: 'pre',

    resolveId(id, importer) {
      if (DYNAMIC_COMP_REGEX.test(id) && importer) {
        id = !isAbsolute(id) ? join(dirname(importer), id) : id
        return `\0${resolve(id)}`
      }

      return null
    },

    async load(id) {
      if (!DYNAMIC_COMP_REGEX.test(id))
        return

      const path = id.replace('\0', '').split('?')[0]

      const imports: string[] = [
        genImport('vue', ['defineAsyncComponent']),
        genDefineAsyncComponent('AsyncComponent', path),
        'export default AsyncComponent;',
      ]

      return imports.join('\n')
    },
  }
}

function genDefineAsyncComponent(variable: string, src: string) {
  return `const ${variable} = defineAsyncComponent(${genDynamicImport(src)});`
}

export default AsyncComponentLoader
