"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var keySource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();

    var erd = joint.shapes.erd;
    var key = new erd.Key({
        position: { x: result.initial.x - result.canvas.left, y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: 'black',
                text: 'Key',
                'letter-spacing': 0,
              //  style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.outer, .inner': {
                fill: '#E67E22',
                stroke: '#D35400'
            },
            '.outer': {
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
            }
        }
    });

    item.graph.addCell(key);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var Key = React.createClass({
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
              <ellipse className={"outer"} style={{strokeWidth:"2"}} transform="translate(50, 25)" stroke="#D35400" cx="10" cy="5" rx="50" ry="25" fill="#E67E22"></ellipse>
              <ellipse className={"inner"} style={{strokeWidth:"2"}} transform="translate(50, 25)" stroke="#D35400" cx="10" cy="5" rx="45" ry="20" fill="#E67E22" display="none"></ellipse>
            </g>
            <text y="0.8em"  style={{fontFamily:"Arial", fontSize:"14px",fontWeight: "800", textDecoration:"underline"}} transform="translate(30.2421875,13)">
              <tspan dy="0.5em" x="6" className={"v-line"}>Key</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, keySource, collect)(Key);
