"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var entitySource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();
    var erd = joint.shapes.erd;
    var ent = new erd.Entity({
        position: { x: result.initial.x - result.canvas.left, y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: 'black',
                text: 'Entity',
                'letter-spacing': 0,
              //  style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.outer, .inner': {
                fill: '#2ECC71',
                stroke: '#27AE60'
            },
            '.outer': {
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
            }
        }
    });

    item.graph.addCell(ent);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var Entity = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
  	var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="centerDivItems">
        <svg  width="150" height="60">
          <g className={"rotatable"} transform="rotate(0,45,18)">
            <g className={"scalable"} transform="scale(0.9,0.6)">
              <polygon className={"outer"} fill="#2ECC71" stroke="#27AE60" style={{strokeWidth:"2"}} points="200,0 200,100 0,100 0,0"></polygon>
              <polygon className={"inner"} fill="#2ECC71" stroke="#27AE60" style={{strokeWidth:"2"}} points="95,5 95,55 5,55 5,5" display="none"></polygon>
            </g>
            <text className={"noselect"} y="1.6em" style={{fontFamily:"Arial", fontSize:"14px"}} transform="translate(27.5,10)">
              <tspan dy="0em" x="25" className={"v-line"}>Entity</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, entitySource, collect)(Entity);
