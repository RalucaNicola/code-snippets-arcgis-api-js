### 💪 Get the view

Once you get to the view, it will allow you to access the webscene, layers, layerviews etc.

```js
const view = require("esri/views/View").views.getItemAt(0);
```

---

### 👀 Show me the layers

```js
view.map.allLayers.forEach((layer, index) => {
  console.log(index, " -> ", layer.title);
});
```

### 👻 Layer doesn't show up

Step 1: check that the LayerView gets created

```js
const layer = view.map.allLayers.getItemAt(index);

view.whenLayerView(layer)
  .then(layerView => console.log(layerView))
  // if there were problems with the layerview, you'll get an error here
  .catch(console.error);
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

// Code from Jesse van den Kieboom

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

// Code from Jesse van den Kieboom

```

---

### ⌛ Show when a layer finished updating

```js

view.whenLayerView(layer)
  .then(layerView => {
    layerView.watch("updating", value => {
      if (!value) {
        console.log(`Layer ${layer.title} finished updating.`);
      }
    });
  })
  .catch(console.error);

```

---

### ⌛ Show when the view finished updating

```js

// works reliably only with version 4.12

view.when(() => {
  view.watch("updating", value => {
    const status = value ? "Updating" : "Finished updating"
    console.log(status);
  });
});

```

---

### 🌗 Change daytime with arrow keys

Setting the daytime in an app without a widget. Use this code snippet in the console.

```js
view.when(() => {
  view.on("key-down", event => {
    if (event.key === "ArrowRight") {
      let lighting = view.environment.lighting.clone();
      lighting.date.setMinutes(lighting.date.getMinutes() + 30);
      view.environment.lighting = lighting;
      event.stopPropagation();
    }
    if (event.key === "ArrowLeft") {
      let lighting = view.environment.lighting.clone();
      lighting.date.setMinutes(lighting.date.getMinutes() - 30);
      view.environment.lighting = lighting;
      event.stopPropagation();
    }
  });
});
```

