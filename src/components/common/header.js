"use strict";

var React = require('react');

var Header = React.createClass({
	render: function(){
		return(
			<nav className="navbar navbar-default" style={{margin: '0px'}}>
				<div className="container-fluid">
					<a href="#" className="navbar-brand">
						<img src="images/blast-logo.png" style={{marginTop:-18}}/>
					</a>
				</div>
			</nav>
		);
	}
});

module.exports = Header;
