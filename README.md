# SigmajsTreePlugin

Generate coordinates for building a tree-form graph

SigmaJS TreePlugin takes as argument an Sigma JSON object (see sigma.json as example) and calculate coordinates to draw it in a 
tree-like form.

Usage is simple:

```javascript
  var dataTree = new Tree(sample);
  dataTree.analyse();
  dataTree.generateCoordinates();
  data = dataTree.getGraph();
  s = new sigma({ 
      graph: data,
      container: 'container',
      settings: {
          defaultNodeColor: '#ec5148'
  }});
```

Once tree is created, you can get a subtree that goes into depth of the childrens of a given node simply by using the getSubtree
method, like:

```javascript
  var dataTree = new Tree(sample);
  dataTree.analyse();
  dataTree.generateCoordinates();
  //default constructor: gives you subtree of rootnode
  var data = dataTree.getSubtree();
  s = new sigma({ 
      graph: data,
      container: 'container',
      settings: {
          defaultNodeColor: '#ec5148'
  }});
```

But you can also use it like:

```javascript
  var dataTree = new Tree(sample);
  dataTree.analyse();
  dataTree.generateCoordinates();
  // constructor with one given node
  // will return all nodes from level that 
  // contains given node and all the nodes
  // that are children of this node
  var data = dataTree.getSubtree({
      "id": "n1",
      "label": "Another node",
      "x": 0,
      "y": 0,
      "size": 2
    });
  s = new sigma({ 
      graph: data,
      container: 'container',
      settings: {
          defaultNodeColor: '#ec5148'
  }});
```

It's still under construction, but static.html will give you some illustration of what you can do with the plugin.
