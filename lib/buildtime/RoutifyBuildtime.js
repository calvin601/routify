import { Routify } from '../common/Routify.js'
import { deepAssign } from '../common/utils.js'
import { bundlerPlugin } from './plugins/bundler/index.js'
import { exporterPlugin } from './plugins/exporter/index.js'
import { filemapperPlugin } from './plugins/filemapper/index.js'
import { metaFromFilePlugin } from './plugins/metaFromFile/index.js'
import { watcherPlugin } from './plugins/watcher/index.js'
import { hookHandler } from './utils.js'

const getDefaults = () => ({
    routifyDir: '.routify',
    filemapper: {
        moduleFiles: ['_module.svelte', '_reset.svelte'],
        resetFiles: ['_reset.svelte'],
        routesDir: {
            default: 'src/routes',
        },
    },
    extensions: ['.svelte', '.html', '.md', '.svx'],
    plugins: [
        filemapperPlugin,
        metaFromFilePlugin,
        bundlerPlugin,
        exporterPlugin,
        watcherPlugin,
    ],
    watch: false,
})

export class RoutifyBuildtime extends Routify {
    constructor(options) {
        super(deepAssign({}, getDefaults(), options))
        // normalize routifyDir
        const { filemapper } = this.options
        if (typeof filemapper.routesDir === 'string')
            filemapper.routesDir = { default: filemapper.routesDir }
    }

    on = {
        buildStart: hookHandler(),
        buildComplete: hookHandler(),
        fileAdded: hookHandler(),
        fileRemoved: hookHandler(),
        fileChanged: hookHandler(),
        fileWatcherReady: hookHandler(),
    }

    async build() {
        this.on.buildStart.callCallbacks()
        this.nodeIndex.splice(0)

        const instance = this
        for (const plugin of this.plugins) {
            const shouldRun =
                typeof plugin.condition === 'undefined' ||
                (await plugin.condition({ instance }))
            if (shouldRun) await plugin.build({ instance })
        }
        this.on.buildComplete.callCallbacks()
    }

    start = this.build
}