### 🌎 Rotate the globe

Your users can see the data on a globe, but wouldn't it be awesome to make that globe spin automatically? [Spin me right round](rotate-the-globe.html)

```js

function animate() {
  const camera = view.camera.clone();
  camera.position.longitude += 1;
  view.goTo(camera);
  requestAnimationFrame(function() {
    if (!view.interacting) {
      animate();
    }
  });
}

// start animating on some event (click, view ready, etc.)
animate();

```

----

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

### ⌛ Show when all layers finished drawing

Sometimes you want to wait for all the layers to finish drawing before starting an animation. This snippet can come in handy in those critical moments. [Are my layers there yet?](hello.html)

```js

view.map.layers.forEach(function(layer) {
  view.whenLayerView(layer, function(layerView) {
    layerView.watch("updating", function() {

    });
  })
})
```

---

### 🎥 Pretty print camera

Figuring out the right numbers for camera position, tilt and heading made easy. The view should be set on the window. Run this code snippet in the console: [Show me the camera](hello.html)

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

### 👀 Look around

The one where the camera turns around to see what's behind it. Seriously now, with this code the camera rotates 360 degrees around its position. [Let's have a look around](have-a-look-around.html)

```js

function lookAround() {
  view.goTo({
    position: view.camera.position,
    heading: Math.round((view.camera.heading + 0.1) * 10) / 10
  }, {
    animate: false
  });

  requestAnimationFrame(function() {
    if (!view.interacting) {
      lookAround();
    }
  });
}

lookAround();

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
