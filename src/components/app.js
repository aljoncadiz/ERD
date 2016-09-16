/*eslint-disable strict */ //disable strict check

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');



var Board = require('./board');

exports.createElm = function(type, x_coords, y_coords){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
}


var App = React.createClass({
	render: function(){
		return (
			<div>
				<Board />
			</div>
		);
	}
});

module.exports = App;
