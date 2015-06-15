function Level(id)
{
  this.nodes = [];
  this.id = id;
}

Level.prototype.contains = function(id)
{

  for(var i in this.nodes)
    if(this.nodes[i].id == id)
      return true;
  return false;
}

Level.prototype.add = function(node)
{
  this.nodes.push(node);
}

Level.prototype.length = function()
{
  return this.nodes.length;
}

function Tree(data)
{
  this.graph = data;
  this.rootNode = data.nodes[0];
  this.levels = [];

  //Root level
  var rootLevel = new Level(0);
  rootLevel.nodes.push(this.rootNode);
  this.levels.push(rootLevel);
}

Tree.prototype.getGraph = function()
{
  console.log(JSON.stringify(this.graph));
}

Tree.prototype.analyse = function()
{
  this.expand(this.levels[0]);
}

Tree.prototype.verifyNode = function(node)
{
  for(var j in this.levels)
    if(this.levels[j].contains(node))
      return true;
  return false;
}

Tree.prototype.expand = function(parentLevel)
{

  var nLevel = new Level(parentLevel.id + 1);

  for(var i in this.graph.edges)
    if(parentLevel.contains(this.graph.edges[i].source))
      for(var j in this.graph.nodes)
        if(this.graph.nodes[j].id == this.graph.edges[i].target)
          if(!this.verifyNode(this.graph.nodes[j].id))
            nLevel.add(this.graph.nodes[j]);

  if(nLevel.length() > 0)
  {
    this.levels.push(nLevel);
    this.expand(nLevel);
  }

}

Tree.prototype.printLevels = function()
{
    for(var i in this.levels)
    {
      console.log("Level " + this.levels[i].id);
      console.log(this.levels[i]);
    }
}

Tree.prototype.generateCoordinates = function()
{
  var xValue = 0;
  var yValue = 0;
  for(var i = (this.levels.length-1); i>=0; i--)
  {
    var level = this.levels[i];
    for(var j in level.nodes)
    {
      level.nodes[j].x = xValue;
      level.nodes[j].y = yValue;
      xValue=xValue + 0.5;
    }

    xValue = level.nodes[0].x + 1;
    yValue = yValue + 1;


  }
}

var sample = {
  "nodes": [
    {
      "id": "n0",
      "label": "Node 0",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Node 1",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n2",
      "label": "Node 2",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n3",
      "label": "Node 3",
      "x": 0,
      "y": 0,
      "size": 3
    }, 
    {
      "id": "n4",
      "label": "Node 4",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n5",
      "label": "Node 5",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n6",
      "label": "Node 6",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n7",
      "label": "Node 7",
      "x": 0,
      "y": 0,
      "size": 3
    }


  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e3",
      "source": "n0",
      "target": "n3"
    },
    {
      "id": "e4",
      "source": "n0",
      "target": "n4"
    },
    {
      "id": "e5",
      "source": "n0",
      "target": "n5"
    },
    {
      "id": "e6",
      "source": "n1",
      "target": "n6"
    },
    {
      "id": "e7",
      "source": "n3",
      "target": "n6"
    },
    {
      "id": "e8",
      "source": "n4",
      "target": "n7"
    }
  ]
};

var dataTree = new Tree(sample);
dataTree.analyse();
dataTree.generateCoordinates();
dataTree.printLevels();
console.log("\n\n");
dataTree.getGraph();
