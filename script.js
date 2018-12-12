
  fetch('./snippets.md')
  .then(function(response) {
    return response.text();
  })
  .then(function(snippets) {
    const reader = new commonmark.Parser({smart: true});
    const parsed = reader.parse(snippets);
    walker = parsed.walker();

    const container = document.getElementsByClassName("container")[0];

    const snippetList = [];
    let snippet = {};

    while ((event = walker.next())) {
      node = event.node;
      console.log(node);
      if (event.entering) {

        if (node.type === "thematic_break") {
          snippetList.push(snippet);
          snippet = {};
        }

        if (node.type === "heading") {
          node = walker.next().node;
          if (node.type === "text") {
            snippet.heading = node.literal;
          }
        }

        if (node.type === "paragraph") {
          node = walker.next().node;
          snippet.description = "";
          while (node.type === "text") {
            snippet.description += node.literal;
            node = walker.next().node;
          }
        }

        if (node.type === "link") {
          snippet.demo = {
            url: node.destination
          }
          node = walker.next().node;
          snippet.demo.text = "";
          while (node.type === "text") {
            snippet.demo.text += node.literal;
            node = walker.next().node;
          }
        }

        if (node.type === "code_block") {
          snippet.code = node.literal;
        }

      }
    }
    console.log(snippetList);

    snippetList.forEach(function(item) {
      const template = `
      <div class="snippet">
        <span class="snippet-title">${item.heading}</span>
        <div class="snippet-main">
          <p>${item.description}</p>
          <pre><code class="js">
            ${item.code}
          </code></pre>
          <a href="${item.demo.url}" target="_blank">${item.demo.text}</a>
        </div>
      </div>
      `;

      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = template;
      container.appendChild(htmlElement);
      const block = htmlElement.getElementsByTagName("code")[0];
      hljs.highlightBlock(block);
    });
  });
