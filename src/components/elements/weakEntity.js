"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var weakEntitySource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();
    var erd = joint.shapes.erd;
    var ent = new erd.WeakEntity({
        position: { x: result.initial.x - result.canvas.left, y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: 'black',
                text: 'WeakEntity',
                'letter-spacing': 0,
              //  style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.inner': {
                fill: '#2ECC71',
                stroke: '#27AE60',
                points: '155,5 155,55 5,55 5,5'
            },
            '.outer': {
                fill: '#2ECC71',
                stroke: '#27AE60',
                points: '160,0 160,60 0,60 0,0',
                filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 1, color: '#333333' }}
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


var WeakEntity = React.createClass({
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
              <polygon className={"outer"} fill="#2ECC71" stroke="#27AE60" style={{strokeWidth:"2"}}points="180,0 180,100 0,100 0,0"></polygon>
              <polygon className={"inner"} display="auto" fill="#2ECC71" stroke="#000000" style={{strokeWidth:"2"}} points="162,5 162,95 5,95 5,5"></polygon>
            </g>
            <text y="1.6em" style={{fontFamily:"Arial", fontSize:"14px"}} transform="translate(18.09375,12.5)">
              <tspan dy="0em" x="20" className={"v-line"}>Weak&nbsp;entity</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, weakEntitySource, collect)(WeakEntity);
