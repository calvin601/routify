import { get } from 'svelte/store'
import '../../../typedef.js'
import { createHook, urlFromAddress } from '../utils.js'

export class AddressReflector {
    /** @param {Router} router */
    constructor(router) {
        this.router = router
        this.log = this.router.log

        if (!history.onPushstate) {
            this.log.debug('polyfill history hooks')
            polyfillHistory()
        }
    }
    install() {
        // install hooks
        const { applyUrlTransforms, activeUrl } = this.router

        const hooks = [
            history['onPushstate']((data, title, url) => {
                if (!data.updateRoutify) return false
                url = applyUrlTransforms(url)
                activeUrl.push(url, 'address')
            }),
            history['onReplacestate']((data, title, url) => {
                if (!data.updateRoutify) return false
                url = applyUrlTransforms(url)
                activeUrl.replace(url, 'address')
            }),
            history['onPopstate'](() => {
                activeUrl.pop(urlFromAddress(), 'address')
            }),
            // when internal url changes, reflect it in the address bar
            this.router.afterUrlChange(this.reflect.bind(this)),
        ]

        this.log.debug(`initialize router with url from address`)
        activeUrl.replace(urlFromAddress(), 'address')

        this.unregisterHooks = hooks
    }
    uninstall() {
        this.unregisterHooks.forEach(unreg => unreg())
    }
    reflect({ url, mode = 'pushState', origin }) {
        this.log.debug('pushing internal url to browser', { url, mode, origin })
        if (origin !== 'address') {
            // apply each urlTransform.external
            const { urlTransforms } = this.router
            url = urlTransforms.reduce(
                (url, { external }) => external(url),
                url,
            )

            history[`${mode}Native`]({ _origin: 'routify' }, '', url)
        }
    }
}

function polyfillHistory() {
    const hooks = {
        onPushstate: createHook(),
        onReplacestate: createHook(),
        onPopstate: createHook(),
    }
    Object.assign(history, hooks)

    const { pushState, replaceState } = history
    history['pushStateNative'] = pushState
    history['replaceStateNative'] = replaceState

    history.pushState = (data, title, url) => {
        for (const hook of hooks.onPushstate.hooks) hook(data, title, url)
        pushState.bind(history)(data, title, url)
    }
    history.replaceState = (data, title, url) => {
        for (const hook of hooks.onReplacestate.hooks) hook(data, title, url)
        replaceState.bind(history)(data, title, url)
    }

    window.addEventListener('popstate', event => {
        for (const hook of hooks.onPopstate.hooks) hook(event)
    })

    return true
}