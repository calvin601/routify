# Routify 3

## !IMPORTANT!

\*\*This repo is under heavy development and everything from code to documentation is far from complete.

[DOCS - work in progress](https://v3.ci.routify.dev/docs#)

If you have questions about how to use Routify 3, please see the [docs](https://v3.ci.routify.dev/docs#) or visit us on Discord.

## Install

Create a new Routify project with

    npx @roxi/routify@next create myapp

## Using Routify

#### Creating a router

Basic

```html
<script>
    import { Router } from '@roxi/routify'
    import routes from '../.routify/routes.default.js'
</script>

<Router {routes} />
```

Create instance manually

```html
<script>
    import { Routify, Router } from '@roxi/routify'
    import routes from '../.routify/routes.default.js'
    const instance = new Routify({ routes, /* options */ })
</script>

<Router {instance} />
```

#### Creating nodes

```javascript
// create a root node
const rootNode = instance.superNode.createChild('my-root-node')

// create a page node
rootNode.createChild('im-page-1', module)
rootNode.createChild('im-page-2', module)

// Note: module can be a module or its path
```

#### Appending nodes

```javascript
// create a root node
const rootNode = instance.createNode('my-root-node')
instance.superNode.appendChild(rootNode)

// create a page node
const childNode = instance.createNode('my-child-node')
rootNode.appendChild(childNode)
```

## Structure *(draft)*

*   Global *(class)*
    *   Instance *(class)*
        *   nodeIndex *(array)*
        *   superNode *(class)*
        *   Router\* *(module)*
            *   Router *(class)*
                *   params
                *   activeUrl\*\* *(ActiveUrl)*
                *   activeRoute\*\* *(Route)*
                    *   fragments *(RouteFragment\[])*
            *   module\* *(module)*
                *   module\* *(module)*
                    *   module\* *(module)* ...

<small>
*: module

\*\*: Store </small>

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [RoutifyBuildtimePayload](#routifybuildtimepayload)
*   [RoutifyCallback](#routifycallback)
    *   [Parameters](#parameters)
*   [RoutifyBuildtimeOptions](#routifybuildtimeoptions)
    *   [Properties](#properties)
*   [RoutifyRuntimeOptions](#routifyruntimeoptions)
    *   [Properties](#properties-1)
*   [RoutifyExternalMetaHelper](#routifyexternalmetahelper)
    *   [Properties](#properties-2)
*   [RoutifyLoadContext](#routifyloadcontext)
    *   [Parameters](#parameters-1)
    *   [Properties](#properties-3)
*   [RoutifyBasePlugin](#routifybaseplugin)
    *   [Properties](#properties-4)
*   [RoutifyBuildtimePluginType](#routifybuildtimeplugintype)
    *   [Properties](#properties-5)
*   [MetaContextSplit](#metacontextsplit)
    *   [Parameters](#parameters-2)
*   [MetaContext](#metacontext)
    *   [Properties](#properties-6)
*   [UrlRewriteFn](#urlrewritefn)
    *   [Parameters](#parameters-3)
*   [UrlRewrite](#urlrewrite)
    *   [Properties](#properties-7)
*   [QueryHandler](#queryhandler)
    *   [Properties](#properties-8)
*   [QueryHandlerParse](#queryhandlerparse)
    *   [Parameters](#parameters-4)
*   [QueryHandlerStringify](#queryhandlerstringify)
    *   [Parameters](#parameters-5)
*   [ComponentGuardFn](#componentguardfn)
    *   [Parameters](#parameters-6)
*   [ComponentPreloadFn](#componentpreloadfn)
    *   [Properties](#properties-9)
*   [MixedModule](#mixedmodule)
*   [PathNode](#pathnode)
    *   [Properties](#properties-10)
*   [UrlState](#urlstate)
*   [FragmentContext](#fragmentcontext)
    *   [Properties](#properties-11)
*   [NodeTreeExport](#nodetreeexport)
    *   [Properties](#properties-12)
*   [BrowserAdapter](#browseradapter)

### RoutifyBuildtimePayload

COMMON

Type: {instance: RoutifyBuildtime, tools: any}

### RoutifyCallback

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `first` **{instance: Routify}** 

Returns **(T | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<T>)** 

### RoutifyBuildtimeOptions

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `Node` **RNodeBuildtime** 
*   `routifyDir` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** defaults to '.routify'
*   `clearRoutifyDir` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
*   `filemapper` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

    *   `filemapper.moduleFiles` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** defaults to \['\_module.svelte', '\_reset.svelte']
    *   `filemapper.resetFiles` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** defaults to \['\_reset.svelte']
    *   `filemapper.fallbackFiles` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** defaults to \['\_reset.svelte']
*   `routesDir` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)** defaults to { default: 'src/routes' }
*   `extensions` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp))>** defaults to \['.svelte', '.html', '.md', '.svx'],
*   `plugins` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** 
*   `watch` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** rebuild Routify routes on changes

### RoutifyRuntimeOptions

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `init` **function (RoutifyRuntime): void** 
*   `urlRewrite` **([UrlRewrite](#urlrewrite) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[UrlRewrite](#urlrewrite)>)** 
*   `queryHandler` **([QueryHandler](#queryhandler) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[QueryHandler](#queryhandler)>)** 
*   `beforeRouteChange` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 
*   `afterRouteChange` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

### RoutifyExternalMetaHelper

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `instance` **RoutifyRuntime** 
*   `options` **any** //todo
*   `tempPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### RoutifyLoadContext

Type: [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Parameters

*   `context` **[RoutifyLoadContext](#routifyloadcontext)** 

#### Properties

*   `route` **Route** 
*   `node` **RNodeRuntime** 

###

### RoutifyBasePlugin

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** name of plugin
*   `before` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)?** name of plugin(s) to run before
*   `after` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)?** name of plugin(s) to run after

### RoutifyBuildtimePluginType

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `build` **function ([RoutifyBuildtimePayload](#routifybuildtimepayload)): ([Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any)?** 
*   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
*   `meta` **[RoutifyExternalMetaHelper](#routifyexternalmetahelper)?** 

### MetaContextSplit

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `value` **any** the value to be split
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** defaults to hashed value

### MetaContext

Modify the context available to meta files

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `instance` **RoutifyBuildtime** 
*   `node` **RNodeBuildtime** 
*   `options` **Partial<[RoutifyBuildtimeOptions](#routifybuildtimeoptions)>** 
*   `split` **[MetaContextSplit](#metacontextsplit)?** dynamically import the value
*   `persist` **Persist?** persist the return of a callback on disk. Return persisted data on subsequent calls
*   `tempPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** temporary path for the respective file, eg. ./.routify/cached/src/routes/index.svelte/

### UrlRewriteFn

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `ctx` **{router: Router}** 

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### UrlRewrite

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `toInternal` **[UrlRewriteFn](#urlrewritefn)** 
*   `toExternal` **[UrlRewriteFn](#urlrewritefn)** 

### QueryHandler

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `parse` **[QueryHandlerParse](#queryhandlerparse)** 
*   `stringify` **[QueryHandlerStringify](#queryhandlerstringify)** 

### QueryHandlerParse

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `search` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

### QueryHandlerStringify

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `search` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### ComponentGuardFn

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `route` **Route** 

### ComponentPreloadFn

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

###

#### Properties

*   `guard` **[ComponentGuardFn](#componentguardfn)?** 
*   `preload` **[ComponentPreloadFn](#componentpreloadfn)?** 

###

### MixedModule

Type: any

### PathNode

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `urlFragment` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `node` **RNodeRuntime** 

### UrlState

Type: (`"pushState"` | `"replaceState"` | `"popState"`)

### FragmentContext

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `route` **Route** 
*   `node` **RNodeRuntime** 
*   `load` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)?** preload functionality for pages and modules
*   `localParams` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), any>** 

### NodeTreeExport

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
*   `module` **any** 
*   `rootName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
*   `file` **any?** 
*   `children` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[NodeTreeExport](#nodetreeexport)>** 

### BrowserAdapter

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
