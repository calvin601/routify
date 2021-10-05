# Routify 3

## !IMPORTANT!

**This repo is under heavy development and everything from code to documentation is far from complete.
If you have questions about how to use Routify 3, please visit us on Discord. If you want to try building the docs your self, you can run `cd site && npm install && npm run dev`**

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
*   [RoutifyBasePlugin](#routifybaseplugin)
    *   [Properties](#properties-3)
*   [RoutifyBuildtimePluginType](#routifybuildtimeplugintype)
    *   [Properties](#properties-4)
*   [MetaContext](#metacontext)
    *   [Properties](#properties-5)
*   [UrlTransformFn](#urltransformfn)
    *   [Parameters](#parameters-1)
*   [UrlTransform](#urltransform)
    *   [Properties](#properties-6)
*   [QueryHandler](#queryhandler)
    *   [Properties](#properties-7)
*   [QueryHandlerParse](#queryhandlerparse)
    *   [Parameters](#parameters-2)
*   [QueryHandlerStringify](#queryhandlerstringify)
    *   [Parameters](#parameters-3)
*   [ComponentGuardFn](#componentguardfn)
    *   [Parameters](#parameters-4)
*   [ComponentPreloadFn](#componentpreloadfn)
    *   [Properties](#properties-8)
*   [MixedModule](#mixedmodule)
*   [PathNode](#pathnode)
    *   [Properties](#properties-9)
*   [UrlState](#urlstate)
*   [FragmentContext](#fragmentcontext)
    *   [Properties](#properties-10)
*   [NodeTreeExport](#nodetreeexport)
    *   [Properties](#properties-11)
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
*   `routesDir` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)** defaults to { default: 'src/routes' }
*   `extensions` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** defaults to \['.svelte', '.html', '.md', '.svx'],
*   `plugins` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** 
*   `watch` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** rebuild Routify routes on changes

### RoutifyRuntimeOptions

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `init` **function (RoutifyRuntime): void** 
*   `urlTransform` **([UrlTransform](#urltransform) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[UrlTransform](#urltransform)>)** 
*   `queryHandler` **([QueryHandler](#queryhandler) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[QueryHandler](#queryhandler)>)** 
*   `beforeRouteChange` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 
*   `afterRouteChange` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

### RoutifyExternalMetaHelper

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `instance` **RoutifyRuntime** 
*   `options` **any** //todo
*   `tempPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

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

###

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### MetaContext

Modify the context available to meta files

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `instance` **RoutifyBuildtime** 
*   `node` **RNodeBuildtime** 
*   `options` **[RoutifyBuildtimeOptions](#routifybuildtimeoptions)** 
*   `tempPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### UrlTransformFn

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

*   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### UrlTransform

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `toInternal` **[UrlTransformFn](#urltransformfn)** 
*   `toExgternal` **[UrlTransformFn](#urltransformfn)** 

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
