"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var relationSource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();

    var erd = joint.shapes.erd;
    var rel = new erd.Relationship({
        position: { x: result.initial.x - (result.canvas.left * .75), y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: 'black',
                text: 'Relation',
                'letter-spacing': 0,
              //  style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.outer, .inner': {
                fill: '#3498DB',
                stroke: '#2980B9'
            },
            '.outer': {
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
            }
        }
    });

    item.graph.addCell(rel);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var Relation = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
  	var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="centerDivItems">
        <svg  width="75" height="75">
          <g className={"rotatable"} transform="rotate(0,30,30)">
            <g className={"scalable"} transform="scale(0.75,0.75)">
              <polygon className={"outer"} fill="#3498DB" stroke="#2980B9" style={{strokeWidth:"2"}} points="50,0 100,50 50,100 0,50"></polygon>
              <polygon className={"inner"} fill="#3498DB" stroke="#2980B9" style={{strokeWidth:"2"}} points="40,5 75,40 40,75 5,40" display="none"></polygon>
            </g>
            <text y="1.2em" style={{fontFamily:"Arial", fontSize:"14px"}} transform="translate(8.5,23)">
              <tspan dy="0em" x="2" className={"v-line"}>Relation</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, relationSource, collect)(Relation);
