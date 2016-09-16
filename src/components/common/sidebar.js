"use strict";

var React = require('react');
var Entity = require('../elements/entity');
var WeakEntity = require('../elements/weakEntity');
var Relation = require('../elements/relation');
var Key = require('../elements/key');
var Isa = require('../elements/isa');
var IdentRelation = require('../elements/IdentRelation');
var Normal  = require('../elements/normal');
var MultiVal = require('../elements/multiValued');
var Derived = require('../elements/derived');
var Start = require('../elements/start');
var End = require('../elements/end');

require('bootstrap');

var SideBar = React.createClass({
	render: function(){
		return(
			<div className="row">
				<div className="sidebar-overlay"></div>

				<aside id="sidebar" style={{height: '100%', backgroundColor: '#333' }} className="sidebar sidebar-default open">
					<ul className="nav sidebar-nav">
								<li>
										<Start id="start" graph={this.props.graph}/>
								</li>
								<li>
										<End id="end" graph={this.props.graph}/>
								</li>
								<li>
				            <Entity id="entity" graph={this.props.graph}/>
								</li>
								<li>
				            <WeakEntity id="weakEntity" graph={this.props.graph}/>
								</li>
								<li>
				            <Relation id="relationship" graph={this.props.graph}/>
								</li>
								<li>
				            <IdentRelation id="identRelationship" graph={this.props.graph}/>
								</li>
								<li>
				            <Isa id="isa" graph={this.props.graph}/>
								</li>
								<li>
				            <Key id="key" graph={this.props.graph}/>
								</li>
								<li>
										<Normal id="norm" graph={this.props.graph}/>
								</li>
								<li>
										<MultiVal id="multiVal" graph={this.props.graph}/>
								</li>
								<li>
										<Derived id="derived" graph={this.props.graph}/>
								</li>
				    </ul>
				</aside>
			</div>
		);
	}

});

module.exports = SideBar;
