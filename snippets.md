### 🌎 Rotate the globe

Your users can see the data on a globe, but wouldn't it be awesome to make that globe spin automatically? [Spin me right round](rotate-the-globe.html)

```js

const handle = scheduling.addFrameTask({
  update: function() {
    if (!view.interacting) {
      const camera = view.camera.clone();
      camera.position.longitude += 0.5;
      view.camera = camera;
    } else {
      handle.remove();
    }
  }
});
```

---

### 👀 Look around

The one where the camera turns around to see what's behind it. Seriously now, with this code the camera rotates 360 degrees around its position. [Let's have a look around](have-a-look-around.html)

```js

const handle = scheduling.addFrameTask({
  update: function() {
    if (!view.interacting) {
      const camera = view.camera.clone();
      camera.heading += 0.05;
      view.camera = camera;
    } else {
      handle.remove();
    }
  }
});

```

---

### ✈️ Create a tour from a set of points

Creating a tour is super easy, you can either do that from a set of camera positions, of slides or just some (view)points. [Take me on a tour](create-a-tour.html)

```js

function startAnimation(slideNo) {
  if (slideNo < webscene.presentation.slides.length) {

    const slide = webscene.presentation.slides.getItemAt(slideNo);
    document.getElementById("description").innerHTML = slide.title.text;

    view.goTo(slide.viewpoint, {duration: 3000})
      .then(function(){

        window.setTimeout(function(){
          startAnimation(slideNo + 1);
        }, 5000)
      })
      .otherwise(function(err){
        console.log(err);
      });
  }
}

window.setTimeout(function(){
  startAnimation(0);
}, 5000);
```

---

### ⌛ Show when all layers finished updating

Sometimes you want to wait for all the layers to finish updating before starting an animation [Are my layers there yet?](layers-finished-updating.html)

```js

let updatedLayers = 0;

view.when(function() {
  view.map.allLayers.forEach(function(layer) {
    view.whenLayerView(layer)
      .then( function(layerView) {
        watchUtils.whenFalseOnce(layerView, "updating", function(value) {
          console.log(`Layer ${layer.title} finished updating.`
          updatedLayers += 1;
          if (updatedLayers === view.map.allLayers.length) {
            statusContainer.innerHTML += "All layers finished updating";
          }
        });
      });
  });
});
```

---

### 🎥 Pretty print camera

Figuring out the right numbers for camera position, tilt and heading made easy. Run this code snippet in the console or try out the demo: [Show me the camera](print-camera.html)

```js

(function() {
  var p = view.camera.position;

  if (p.spatialReference.isWebMercator || p.spatialReference.isWGS84) {
    console.log(`
{
  position: [${p.longitude.toFixed(8)}, ${p.latitude.toFixed(8)}, ${p.z.toFixed(5)}],
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

### 🌗 Fade in/out effect on layers

For those moments when layers fading in or out would be so awesome (in time series for example). [Smoothly fade out my layers](hello.html)

```js

// some snippet will be displayed here
```

---


### 📅 Change daytime with arrow keys

Setting the daytime in an app without any funky widget. [Let there be light](have-a-look-around.html)

```js

// some snippet will be displayed here
```

---
