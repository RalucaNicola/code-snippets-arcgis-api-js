### 💪 Get the view

Once you get to the view, it will allow you to access the webscene, layers, layerviews etc.

```js
// get the view in your application
const view = require("esri/views/View").views.getItemAt(0);
```

---

### 👀 Show me the layers

```js
function showLayers() {
  view.map.allLayers.forEach(function (index, layer) {
    console.log(index, " -> ", layer.title);
  });
}
```

### 👻 Layer doesn't show up

Step 1: check that the LayerView gets created

```js
const layer = view.map.allLayers.filter(function(layer) {
  return layer.title === "no-show-layer";
});

view.whenLayerView(layer)
  .then(function(layerView) {
    console.log(layerView);
  })
  .catch(function(error) {
    // if there were problems with the layerview, you'll get an error here
    console.log(error);
  });
```

Further steps: check that your layer doesn't have `min/maxScale`, is underground etc.

---

### 🎥 Pretty print camera

Print it in the console and set it in your app afterwards.

```js

(function() {
  const p = view.camera.position;

  if (p.spatialReference.isWebMercator || p.spatialReference.isWGS84) {
    console.log(`
{
  position: [
    ${p.longitude.toFixed(8)},
    ${p.latitude.toFixed(8)},
    ${p.z.toFixed(5)}
  ],
  heading: ${view.camera.heading.toFixed(2)},
  tilt: ${view.camera.tilt.toFixed(2)}
}`);
  }
  else {
    console.log(`
{
  position: {
    x: ${p.x.toFixed(5)},
    y: ${p.y.toFixed(5)},
    z: ${p.z.toFixed(3)},
    spatialReference: ${p.spatialReference.wkid}
  },
  heading: ${view.camera.heading.toFixed(2)},
  tilt: ${view.camera.tilt.toFixed(2)}
}`);
  }
})();

```

---

### Pretty print extent

You might need the extent to set a [clippingArea](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html#clippingArea) on your local view.

```js

(function() {
  const e = view.extent;

  console.log(`
{
  xmin: ${e.xmin.toFixed(4)},
  xmax: ${e.xmax.toFixed(4)},
  ymin: ${e.ymin.toFixed(4)},
  ymax: ${e.ymax.toFixed(4)},
  spatialReference: ${e.spatialReference.wkid}
}`);
})();

```

---

### ⌛ Show when layers finished updating

```js

// show when each layer finished updating
let updatedLayers = 0;

view.when(function() {
  view.map.allLayers.forEach(function(layer) {
    view.whenLayerView(layer)
      .then( function(layerView) {
        watchUtils.whenFalseOnce(layerView, "updating", function(value) {
          console.log(`Layer ${layer.title} finished updating.`);
          updatedLayers += 1;
          if (updatedLayers === view.map.allLayers.length) {
            console.log("All layers finished updating");
          }
        });
      });
  });
});

// show when everything finished updating (will work reliably with 4.12)
watchUtils.whenFalseOnce(view, "updating", function() {
  console.log("Start your animation here");
})
```

---

### 🌗 Change daytime with arrow keys

Setting the daytime in an app without a widget. Use this code snippet in the console. [Let there be light](change-daytime.html)

```js

(function() {
  view.when(function () {
    view.on("key-down", function(event) {
      if (event.key === "ArrowRight") {
        let lighting = view.environment.lighting.clone();
        lighting.date.setMinutes(lighting.date.getMinutes() + 30);
        view.environment.lighting = lighting;
        daytimeContainer.innerHTML = lighting.date;
        event.stopPropagation();
      }
      if (event.key === "ArrowLeft") {
        let lighting = view.environment.lighting.clone();
        lighting.date.setMinutes(lighting.date.getMinutes() - 30);
        view.environment.lighting = lighting;
        daytimeContainer.innerHTML = lighting.date;
        event.stopPropagation();
      }
    });
  });
})();
```

