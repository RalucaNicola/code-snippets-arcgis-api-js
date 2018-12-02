### 🌎 Rotate the globe

Your users can see the data on a globe, but wouldn't it be awesome to make that globe spin automatically?[Spin me right round](./examples/rotate-the-globe.html)

```js

function animate() {
  const camera = view.camera.clone();
  camera.position.longitude += 1;
  view.goTo(camera);
  requestAnimationFrame(function() {
    animate(view);
  });
}

```

----

### ✈️ Create a tour from a set of points

Creating a tour is super easy, you can either do that from a set of camera positions, of slides or just some (view)points. [Take me on a tour](./hello.html)

```js

// some snippet wil be displayed here
```

---

### ⌛ Show when all layers finished drawing

Sometimes you want to wait for all the layers to finish drawing before starting an animation or baking a cake. This snippet can come in handy in those critical moments. [Are my layers there yet?](./hello.html)

```js

// some snippet will be displayed here
```

---

### 🎥 Pretty print camera

Figuring out the right numbers for camera position, tilt and heading made easy. With this snippet. [Show me the camera](./hello.html)

```js

// some snippet will be displayed here
```

---

### 👀 Look around

The one where the camera turns around to see what's behind it. Seriously now, with this code the camera rotates 360 degrees around its position. [Let's have a look around](./hello.html)

```js

// some snippet will be displayed here
```

---

### 🌗 Fade in/out effect on layers

For those moments when layers fading in or out would be so awesome (in time series for example). [Smoothly fade out my layers](./hello.html)

```js

// some snippet will be displayed here
```

---


### 📅 Animate lighting conditions throught a year

The title says it all. You can also limit this to one day. [Let there be light](./hello.html)

```js

// some snippet will be displayed here
```

---