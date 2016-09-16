"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var isaSource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();
    var erd = joint.shapes.erd;
    var isa = new erd.ISA({
        position: { x: result.initial.x - result.canvas.left, y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: 'black',
                text: 'ISA',
                'letter-spacing': 0,
              //  style: { 'text-shadow': '1px 0 1px #333333' }
            },
            polygon: {
                 fill: '#F1C40F',
                 stroke: '#F39C12',
                 filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
             }
        }
    });

    item.graph.addCell(isa);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var Isa = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
  	var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="centerDivItems">
        <svg  width="90" height="45">
          <g className={"rotatable"} transform="rotate(0,45,22.5)">
            <g className={"scalable"} transform="scale(0.9,0.9)">
              <polygon points="0,0 50,50 100,0" fill="#F1C40F" stroke="#F39C12" style={{strokeWidth:"2"}}></polygon>
            </g>
            <text y="0.8em" style={{fontFamily:"Arial", fontSize:"18px"}} transform="translate(32.9375,2)">
              <tspan dy="0em" x="0" className={"v-line"}>ISA</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, isaSource, collect)(Isa);
