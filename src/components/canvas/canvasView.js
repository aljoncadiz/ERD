"use strict"

var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('lodash');

var ItemTypes = require('../../constants/item');
var Global = require('../../global');
var DropTarget = require('react-dnd').DropTarget;
var joint = require('jointjs');
var _app = require('../app');
var CreateElement = _app.createElement;

var ToolView = require('./toolView');

var createElement = {
   drop: function (props, monitor, component) {
    var canvas = document.getElementById("drawingPane");
   	var item = {
      canvas: canvas.getBoundingClientRect(),
			initial: monitor.getSourceClientOffset()
		};
		return item;
   }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    initialPos: monitor.getSourceClientOffset()
  };
}

var Canvas = React.createClass({

  propTypes: {
    setPaper: PropTypes.func.isRequired,
    setGraph: PropTypes.func.isRequired,
    graphSettings: PropTypes.object.isRequired,
    setSelectedCell: PropTypes.func.isRequired
  },

  componentDidMount: function(){
      var jointGraph = new joint.dia.Graph;
      var paper = new joint.dia.Paper({
            el: $('#drawingPane'),
            width: '100%',
            height: '100%',
            model: jointGraph,
            gridSize: 1,
            defaultLink: new joint.dia.Link({
                 attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
             }),
						 validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
								 // Prevent linking from input ports.
								 if (magnetS && magnetS.getAttribute('type') === 'input') return false;
								 // Prevent linking from output ports to input ports within one element.
								 if (cellViewS === cellViewT) return false;
								 // Prevent linking to input ports.
								 return magnetT && magnetT.getAttribute('type') === 'input';
						 },
						 validateMagnet: function(cellView, magnet) {
								 // Note that this is the default behaviour. Just showing it here for reference.
								 // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
								 return magnet.getAttribute('magnet') !== 'passive';
						 }
          });
          paper.on('cell:pointerdown',function(cellView,evt,x,y){
              var graph = cellView.model.graph;
              var selectedEl = graph.get('cells').find(function(cell){
                if(cell.id == cellView.model.id && (cellView.model.attributes.type != "erd.Start" && cellView.model.attributes.type != "erd.End")){
                    return cell;
                }
                return false;
              });

              if(selectedEl){
                this.props.setSelectedCell(selectedEl);
              }

          }.bind(this));
          paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {

                        var paper = cellView.paper;

                        cellView.model.startBatch('add-link');

                        var link = paper.getDefaultLink(cellView, evt.target);

                        link.set({
                            source: {
                                id: cellView.model.id,
                                selector: cellView.getSelector(evt.target),
                                port: evt.target.getAttribute('port')
                            },
                            target: { x: x, y: y }
                        });

                        paper.model.addCell(link);

                        var linkView = cellView._linkView = paper.findViewByModel(link);

                        linkView.startArrowheadMove('target', { whenNotAllowed: 'remove' });

          });

          paper.on('link:pointerup', function(linkView, evt, x, y) {
              // Find the first element below that is not a link nor the dragged element itself.
              var graph = this.model;
              var sourceCellView = linkView.sourceView;

              var elementBelow = graph.get('cells').find(function(cell) { // this.model refers to the joint graph
                  if (cell instanceof joint.dia.Link) return false; // Not interested in links.
                  if (cell.id === linkView.model.id) return false; // The same element as the dropped one.
                  if (cell.getBBox().containsPoint({x, y})) {
                      return true;
                  }
                  return false;
              });

              // If the two elements are connected already, don't
              // connect them again (this is application specific though).
              if (elementBelow && !_.contains(graph.getNeighbors(elementBelow), sourceCellView.model)) {

                  graph.addCell(new joint.dia.Link({
                      source: { id: elementBelow.id }, target:  { id: sourceCellView.model.id },
                      metadata: [],
                      attrs: {
                                text: { text: 'link' },
                                '.marker-source': { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 10 0 L 0 5 L 10 10 z'},
                              },
                      labels: [
                          {
                            position: 0.5,
                            attrs: {
                              text: { text: '' },
                              rect: { fill: '#E5E7E9' }
                            }
                          }
                      ]
                  }));
                  // remove link instance
                  var linkInstance = graph.get('cells').find(function(cell) { // this.model refers to the joint graph
                      if (cell.id === linkView.model.id) {
                          return cell;
                      }
                      return false;
                  });
                  if(linkInstance){
                    linkInstance.remove();
                  }
              }
          });
          this.props.setPaper(paper);
          this.props.setGraph(jointGraph);
  },

	render: function(){
		var connectDropTarget = this.props.connectDropTarget;
   	var isOver = this.props.isOver;

		return connectDropTarget(
      <div className="row-well parentCanvas">

          <div className="row-well innerCanvas" id="svgParent" style={{width: this.props.graphSettings.graphWidth, height: this.props.graphSettings.graphHeight}}>
              <div className="canvasSpacing"> </div>
              <svg id="drawingPane" height="100%" width="100%" style={{backgroundColor:'#E5E7E9'}}>
      					{this.props.children}
      				</svg>
              <div className="canvasSpacing"> </div>
    			</div>

      </div>
		);
	}
});

module.exports = DropTarget(ItemTypes.ELEMENTS, createElement, collect)(Canvas);
