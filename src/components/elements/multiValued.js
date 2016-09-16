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
    var multiVal = new erd.Multivalued({
        position: { x: result.initial.x - result.canvas.left, y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: '#000000',
                text: 'MultiValued',
                'letter-spacing': 0,
                //style: { 'text-shadow': '1px 0px 1px #333333' }
            },
            '.inner': {
                fill: '#E67E22',
                stroke: '#D35400',
                rx: 43,
                ry: 21

            },
            '.outer': {
                fill: '#E67E22',
                stroke: '#D35400',
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#222138' }}
            }
        }
    });

    item.graph.addCell(multiVal);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var MultiValued = React.createClass({
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
              <ellipse className={"outer"} transform="translate(50, 25)" stroke="#D35400" style={{strokeWidth:"2"}} cx="10" cy="5" rx="50" ry="25" fill="#E67E22"></ellipse>
              <ellipse className={"inner"} display="block" stroke="#D35400" style={{strokeWidth:"2"}} cx="10" cy="5" rx="45" ry="20" fill="#E67E22" transform="translate(50, 25)"></ellipse>
            </g>
            <text y="0.8em"  style={{fontFamily:"Arial", fontSize:"12px"}} transform="translate(18.375,17)">
              <tspan dy="0.4em" x="5" className={"v-line"}>MultiValued</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, keySource, collect)(MultiValued);
