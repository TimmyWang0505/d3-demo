var TreeMap = function(options) {
    var width = 600,
        height = 600;

    var svg = d3.select('#' + options.id).append('svg:svg')
        .attr('width', width)
        .attr('height', height);

    var color = d3.scaleOrdinal(d3.schemeCategory10),
        format = d3.format(",d");

    var treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([width, height])
        .round(true)
        .paddingInner(1);

    var root = d3.hierarchy(options.data)
        .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
        .sum(function(d) {return d.size;})
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);

    var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

    cell.append("rect")
        .attr("id", function(d) { return d.data.id; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("fill", function(d) { return color(d.parent.data.id); });

    cell.append("clipPath")
        .attr("id", function(d) { return "clip-" + d.data.id; })
    .append("use")
        .attr("xlink:href", function(d) { return "#" + d.data.id; });

    cell.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
    .selectAll("tspan")
        .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
        .attr("x", 4)
        .attr("y", function(d, i) { return 13 + i * 10; })
        .text(function(d) { return d; });

    cell.append("title")
        .text(function(d) { return d.data.id + "\n" + format(d.value); });
}