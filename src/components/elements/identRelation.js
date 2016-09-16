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
    var identRel = new erd.IdentifyingRelationship({

        position:  { x: result.initial.x - (result.canvas.left * .75), y: result.initial.y - result.canvas.top },
        metadata: [],
        attrs: {
            text: {
                fill: '#000000',
                text: 'I.Relation',
                'letter-spacing': 0,
                //style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.inner': {
                fill: '#3498DB',
                stroke: '#2980B9'
            },
            '.outer': {
                fill: '#3498DB',
                stroke: '#2980B9',
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
            }
        }
    });

    item.graph.addCell(identRel);
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
              <polygon className={"inner"} display="auto" fill="#3498DB" stroke="#000000" style={{strokeWidth:"2"}} points="50,5 95,50 50,95 5,50"></polygon>
            </g>
            <text y="1.2em" style={{fontFamily:"Arial", fontSize:"12px"}} transform="translate(16,25.5)">
              <tspan dy="0em" x="-5" className={"v-line"}>I. Relation</tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, relationSource, collect)(Relation);
