"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');
var DragSource = require('react-dnd').DragSource;
var joint = require('jointjs');

var elementSource = {

  beginDrag: function (props) {
    var item = {graph: props.graph}
    return item;
  },

  endDrag: function(props, monitor, component){

    var item = monitor.getItem();
    var result = monitor.getDropResult();

    var erd = joint.shapes.erd;
    var strt = new erd.Start({

        position: { x: result.initial.x - (result.canvas.left * 0.57), y: result.initial.y - result.canvas.top},
        metadata: [],
        attrs: {
            text: {
                fill: '#000000',
                text: 'Start',
                'font-weight': 800,
                'letter-spacing': 0,
                //style: { 'text-shadow': '1px 0 1px #333333' }
            },
            '.outer': {
                fill: '#80D5B9',
                stroke: '#5B9E88',
                filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
            }
        }
    });

    item.graph.addCell(strt);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};


var Start = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
  	var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="centerDivItems">
        <svg width="55" height="55">
            <g className="rotatable" transform="rotate(0,25,25)">
                <g className="scalable" transform="scale(1,1)">
                    <ellipse className="outer" stroke="#5B9E88" style={{strokeWidth:"2"}} cx="27" cy="27" rx="25" ry="25" fill="#80D5B9"></ellipse>
                    <ellipse className="inner" stroke="#5B9E88" style={{strokeWidth:"2"}} cx="27" cy="27" rx="20" ry="20" fill="#80D5B9" display="none"></ellipse>
                </g>
                <text y="2.8em" style={{fontFamily:"Arial", fontSize:"14px", fontWeight:"800"}} fill="#000000" transform="translate(-15,-8)">
                    <tspan dy="0em" x="23" className="v-line">Start</tspan>
                </text>
            </g>
        </svg>
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.ELEMENTS, elementSource, collect)(Start);
