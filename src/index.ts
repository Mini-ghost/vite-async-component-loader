import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { genDynamicImport, genImport } from 'knitwork'
import type { Plugin } from 'vite'
import { writeDeclaration } from './declaration'

function AsyncComponentLoader(): Plugin {
  const DYNAMIC_COMP_REGEX = /\.vue\?async$/

  const componentPaths = new Map<string, string>()

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

      componentPaths.set(basename(id), relative(process.cwd(), path))

      const imports: string[] = [
        genImport('vue', ['defineAsyncComponent']),
        genDefineAsyncComponent('AsyncComponent', path),
        'export default AsyncComponent;',
      ]

      return imports.join('\n')
    },

    transform() {
      writeDeclaration('./src/async-components.d.ts', componentPaths)
    },
  }
}

function genDefineAsyncComponent(variable: string, src: string) {
  return `const ${variable} = defineAsyncComponent(${genDynamicImport(src)});`
}

export default AsyncComponentLoader
