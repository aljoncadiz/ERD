"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var derSource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();

    var erd = joint.shapes.erd;
    var der = new erd.Derived({
        position: { x: result.initial.x - result.canvas.left, y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: '#000000',
                text: 'Derived',
                'letter-spacing': 0,
                //style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.inner': {
                fill: '#E67E22',
                stroke: 'none',
                'display': 'block'
            },
            '.outer': {
                fill: '#E67E22',
                stroke: '#D35400',
                'stroke-dasharray': '3,1',
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
            }
        }
    });

    item.graph.addCell(der);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var Derived = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
  	var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="centerDivItems">
        <svg width="110" height="50">
          <g className={"rotatable"} transform="rotate(0,45,22.5)">
            <g className={"scalable"} transform="scale(0.9,0.9)">
              <ellipse className={"outer"} stroke="#D35400" style={{strokeWidth:"2", strokeDasharray:"3,5"}} cx="10" cy="5" rx="50" ry="25" fill="#E67E22" transform="translate(50, 25)"></ellipse>
              <ellipse className={"inner"} transform="translate(50, 25)" stroke="#D35400" style={{strokeWidth:"2"}} cx="10" cy="5" rx="45" ry="20" fill="#E67E22" display="none"></ellipse>
            </g>
              <text y="0.8em" style={{fontFamily:"Arial", fontSize:"14px"}} transform="translate(20.5,14.5)">
                <tspan dy="0.4em" x="8" className={"v-line"}>Derived</tspan>
              </text>
            </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, derSource, collect)(Derived);
