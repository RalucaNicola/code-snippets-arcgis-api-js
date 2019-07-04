
# A collection of code snippets for ArcGIS API for JavaScript

This repository contains code snippets that might come in handy when programming 3D applications with ArcGIS API for JavaScript.

## Development code snippets

These are the ones that you use often and that follow the same pattern: setting renderers, symbols, labels, visual variables etc. To avoid to always go to the documentation and copy the examples there is a [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=Esri.arcgis-jsapi-snippets) that you can install.

<details>
<summary>How to use it</summary>

![VSCode-demo](./code-snippet.gif)
</details>

In VSCode, go to Extensions, search for `arcgis api for javascript` and press the install button. Check out the list of code snippets that we added there. In your app, type in the prefix of the code snippet you want to add and press Tab . That should create the code snippet with the placeholders just like in the animated gif above.

## Debugging code snippets

[These code snippets](./debug-snippets/snippets.md) are useful to figure out what's going on in the browser. What is my camera position? Why is the layer not showing up? Getting access to the view will grant you super powers, like access to the layers and their views etc.

You will most likely use these code snippets in the browser. Therefore it's useful to also store them in the browser. Google Chrome has a useful feature in the dev tools called `Snippets`, where you can keep all of these snippets handy.

<details>
<summary>Here's how it works</summary>

![Chrome-demo](./debug-snippets/chrome-snippets.gif)
</details>

## Fun code snippets

These are the code snippets that you use to spice up your app. You might only need them once every 10 apps or so, but they provide some nice effects. For example rotating the globe, fading layers in or out, animating between several points etc. View them all live [here](https://ralucanicola.github.io/code-snippets-arcgis-api-js/fun-snippets/index.html).

[![fun-snippets](./fun-snippets/snippet-page.png)](https://ralucanicola.github.io/code-snippets-arcgis-api-js/fun-snippets/index.html)

Feel free to make a PR to contribute with your own snippets or suggest
new code snippets with an [issue](https://github.com/RalucaNicola/code-snippets-arcgis-api-js/issues) :)
