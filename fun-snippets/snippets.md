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

The one where the camera turns around to see what's behind it. Seriously now, with this code the camera rotates around its position (until the user interacts with the view). [Let's have a look around](have-a-look-around.html)

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
