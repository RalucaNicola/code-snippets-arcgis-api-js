### 🌎 Rotate the globe

Showing world wide data on a globe is cool. But showing it on a globe that rotates is even cooler. With this code snippet the globe rotates until the user interacts with it. [Spin me right round](rotate-the-globe.html)

```js

function rotate() {
  if (!view.interacting) {
    const camera = view.camera.clone();
    camera.position.longitude -= 0.2;
    view.goTo(camera, { animate: false });
    requestAnimationFrame(rotate);
  }
}
```

---

### 👀 Look around

The one where the camera turns around to see what's behind it. Seriously now, with this code the camera rotates around its position (until the user interacts with the view). [Let's have a look around](have-a-look-around.html)

```js

function lookAround() {
  if (!view.interacting) {
    const camera = view.camera.clone();
    camera.heading += 0.05;
    view.goTo(camera, { animate: false });
    requestAnimationFrame(lookAround);
  }
}

```

---

### ✈️ Create a tour from a set of points

Animate the camera between slides, (view)points or features. [Take me on a tour](create-a-tour.html)

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

### Focus view after it loaded

This effect is about dislaying a blurry view until it finishes updating. Once all the data is displayed, the view gets focused. [Focus on view](blur-focus.html)

```js

const webscene = new WebScene({
  portalItem: {
    id: "0614ea1f9dd043e9ba157b9c20d3c538"
  }
});

const view = new SceneView({
  container: "viewDiv",
  map: webscene
});

view.when(function() {
  watchUtils.whenFalseOnce(view, "updating", function() {
    view.container.style.filter = "blur(0px)";
  });
});

// Idea from Jesse van den Kieboom
```

---

### Switch between 2D and 3D

For those special moments when you have a 2D map and a 3D scene and you want to switch between them. [Switch between 2D and 3D](switch-2d-3d.html)

```js

const webmap = new WebMap({
  portalItem: {
    id: "7ee3c8a93f254753a83ac0195757f137"
  }
});

const webscene = new WebScene({
  portalItem: {
    id: "c8cf26d7acab4e45afcd5e20080983c1"
  }
});

const mapView = new MapView({
  container: "mapViewDiv",
  map: webmap
});

const sceneView = new SceneView({
  container: "sceneViewDiv",
  map: webscene
});

let is2D = true;

// button that switches between 2D and 3D views
const switchButton = document.getElementById("switch-view");
switchButton.addEventListener("click", function () {
  is2D = !is2D;
  switchButton.innerHTML = is2D ? "Switch to 3D" : "Switch to 2D";
  switchView();
});

function switchView() {
  const newView = is2D ? mapView : sceneView;
  const oldView = is2D ? sceneView : mapView;

  newView.extent = oldView.extent;

  if (newView === sceneView) {
    newView.goTo({
      rotation: oldView.rotation,
      tilt: 0
    }, { animate: false })
    .then(function() {
      animateOpacity(newView, oldView);
      newView.goTo({
        tilt: 60
      }, {speedFactor: 0.3});
    });
  } else {
    oldView.goTo({
      tilt: 0
    })
    .then(function() {
      animateOpacity(newView, oldView);
      newView.rotation = 360 - oldView.camera.heading;
    });
  }
}

function animateOpacity(newView, oldView) {
  newView.container.classList.remove("switch-off");
  newView.container.classList.add("switch-on");

  oldView.container.classList.remove("switch-on");
  oldView.container.classList.add("switch-off");
}

// Idea from Jesse van den Kieboom
```

---
