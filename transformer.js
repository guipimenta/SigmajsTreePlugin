function Node(id, label, x, y, size)
{
	this.id = id;
	this.label = label;
	this.x = x;
	this.y = y;
	this.size = size;
}

function Edge(id, source, target)
{
	this.id = id;
	this.source = source;
	this.target = target;
}

function level(levelId, nodes, levelY, levelX)
{
	this.id = levelId;
	this.nodes = nodes;
	this.y = levelY;
	this.x = levelX;
}

function sigmaConverter(graph)
{
	
	// Setting up converter
	this.nodes = graph.nodes;
	this.edges = graph.edges;
	this.graph = graph;

	this.nNodes = graph.nodes.length;

	this.rootNode = graph.nodes[0];
	this.rootLevel = new level(0, [this.rootNode], this.rootNode.y, this.rootNode.x);
	this.levels = [this.rootLevel];
}

sigmaConverter.prototype.addEdge = function (source, target)
{
	var id = "e" + (this.graph.edges.length + 1);
	var edge = new Edge(id, source, target);

	this.graph.edges.push(edge);
}

sigmaConverter.prototype.addNode = function()
{
	var id = "n" + (this.graph.nodes.length);
	
	this.graph.nodes.push(
	{
      "id": id,
      "label": "Node " + id,
      "x": 0,
      "y": 0,
      "size": 1
    });
}

sigmaConverter.prototype.convert = function()
{
	
	this.generateCoordinates([this.rootNode], this.rootLevel);
	console.log(this.graph);
}

sigmaConverter.prototype.generateCoordinates = function(parentNodes, parentLevel)
{
	//var child = this.getChild(parentNode.id);
	

	var levelNodes=[]
	for(var node in parentNodes)
	{
	
		var childs = this.getChild(parentNodes[node].id);
		for (var child in childs)
			levelNodes.push(childs[child]);
	}

	var brotherNode = null;
	
	var cLevel = new level(parentLevel.id + 1, new Array, parentLevel.y, parentLevel.x + 0.1);

	for(var node in levelNodes)
	{
		levelNodes[node].x = cLevel.x;
		if(brotherNode)
			levelNodes[node].y = brotherNode.y + 0.05;
		else
			levelNodes[node].y = cLevel.y;
			

		brotherNode = levelNodes[node];
		cLevel.nodes.push(levelNodes[node]);
	}

	this.updateGraph(levelNodes);

	if(levelNodes.length > 0)
		this.generateCoordinates(levelNodes, cLevel);

	
}

sigmaConverter.prototype.updateGraph = function(levelNodes)
{
	for(var node in levelNodes.nodes)
		for(var node in this.graph.nodes)
			if(this.graph.nodes[node].id == levelNodes[node].id)
			{
				this.graph.nodes[node].x = levelNodes[node].x;
				this.graph.nodes[node].y = levelNodes[node].y;
			}
}

// Serches for each
sigmaConverter.prototype.getChild = function(nodeId)
{

	var child = [];
	for(var edge in this.edges)
		if(this.edges[edge].source == nodeId)
			for(var node in this.nodes)
				if(this.nodes[node].id == this.edges[edge].target)
					child.push(this.nodes[node]);
	return child;
}


sigmaConverter.prototype.getGraph = function()
{
	return this.graph;
}

// var converter = new sigmaConverter(sample);
// converter.convert();
// console.log(converter.getGraph());
