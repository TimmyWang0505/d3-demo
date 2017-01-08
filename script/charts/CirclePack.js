/**
 * options:
 * id：string(D3 svg所在的Div container Id)
 * data: obj (显示结构数据)
 */
var CirclePack = function(options) {
    var diameter = 600;
    var id = options.id;
    var dataSrc = options.data;
    var format = d3.format(',d');
    var pack = d3.pack().size([diameter - 14, diameter - 14]);
    var svg = d3.select('#' + id)
        .append('svg:svg')
        .style('width', diameter + 'px')
        .style('height', diameter + 'px');
    var g = svg.append('g')
        .attr('transform', 'translate(2,2)');

    var d = d3.hierarchy(dataSrc).sum(function(d) {return d.size;})
        .sort(function(a, b) {return b.value - a.value});

    var node = g.selectAll('.node').data(pack(d).descendants()).enter().append('g')
        .attr('transform', function(d) {return 'translate(' + d.x + ',' + d.y + ')'});

    node.append('title')
        .text(function(d) { return d.data.name + '\n' + format(d.value)});

    node.append('circle').attr('r', function(d) {return d.r})
        .style('fill', 'rgb(31, 119, 180)')
        .style('fill-opacity', '0.25')
        .style('stroke', 'rgb(31, 119, 180)')
        .style('stroke-width', '1px');

    // node.filter(function(d) { return !!d.children;}).append('text')
    // .style('font', '20px sans-serif')
    // .style('text-anchor', 'middle')
    // .text(function(d) { return d.data.name + '(' + format(d.value) + ')'});

    node.filter(function(d) { return !d.children;}).append('text')
        .style('font', '10px sans-serif')
        .style('text-anchor', 'middle')
        .text(function(d) { return d.data.name + '(' + format(d.value) + ')'});

}