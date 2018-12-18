### 🌎 Rotate the globe

Showing world wide data on a globe is cool. But showing it on a globe that rotates is even cooler. With this code snippet the globe rotates until the user interacts with it. [Spin me right round](rotate-the-globe.html)

```js

const handle = scheduling.addFrameTask({
  update: function() {
    if (!view.interacting) {
      const camera = view.camera.clone();
      camera.position.longitude -= 0.5;
      view.camera = camera;
    } else {
      handle.remove();
    }
  }
});
```

---

### 👀 Look around

The one where the camera turns around to see what's behind it. Seriously now, with this code the camera rotates 360 degrees around its position (until the user interacts with the view). [Let's have a look around](have-a-look-around.html)

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

Sometimes you want to wait for all the layers to finish updating before starting an animation or doing some other funky 3D things. [Are my layers there yet?](layers-finished-updating.html)

```js

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
```

---

### 🎥 Pretty print camera

Figuring out the right numbers for camera position, tilt and heading made easy. Run this code snippet in the console or try out the demo: [Show me the camera](print-camera.html)

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

// Super bonus: print the extent ⌐■_■
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

### Fade in/out effect on layers

Code snippet to be used in those moments when fading layers in or out would be so awesome. [Fade layers in and out](fade-in-out-layers.html)

```js

function fadeIn(layer) {
  const opacity = parseFloat((layer.opacity + 0.05).toFixed(2));
  layer.opacity = opacity;
  if (layer.opacity < 1) {
    window.requestAnimationFrame(function () {
      fadeIn(layer);
    });
  }
}

function fadeOut(layer) {
  const opacity = parseFloat((layer.opacity - 0.05).toFixed(2));
  layer.opacity = opacity;
  if (layer.opacity > 0) {
    window.requestAnimationFrame(function () {
      fadeOut(layer);
    });
  }
}
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

---
