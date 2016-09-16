"use strict";

require('jquery');
var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var Filesaver = require( 'filesaver.js' );
var joint = require('jointjs');
var _ = require('lodash');
var Reader = require('filereader');
var Snap = require('snapsvg');
var ItemTypes = require('../constants/item');

var Global = require('../global');
var Header = require('./common/header');
var Canvas = require('./canvas/canvasView');
var ToolView = require('./canvas/toolView');
var Sidebar = require('./common/sidebar');
var ModeView = require('./canvas/modeView');
var WorkflowInfoView = require('./canvas/workflowInfoView');

var Board = React.createClass({

	getInitialState: function(){
			return{
				paper: null,
				graph: null,
				selectedObject: {},
				inputValue: {key: "", value: ""},
				designerMode: ItemTypes.BA,
				clientInfo: {
					WorkflowID: Global.createGuid(),
					ClientName: "",
					Version: "",
				},
				settings: {
					graphWidth: "600px",
					graphHeight: "800px"
				}
			};
	},

	setSelectedCell: function(cell){
			if(this.state.designerMode == ItemTypes.DEV){
				var cellView = cell.findView(this.state.paper).el;
				var canvas = document.getElementById("selectedPane");
			}
			this.setState({selectedObject: cell})
	},

	setGraph: function(modifiedGraph){
			this.setState({graph: modifiedGraph})
	},

	setPaper: function(modifiedPaper){
			this.setState({paper: modifiedPaper})
	},

	exportGraph: function(){
		var jointObj = this.state.graph.toJSON();
		jointObj.data = this.state.clientInfo;
		var json = JSON.stringify(jointObj);
		var blob = new Blob([json], {type: "application/json"});
		Filesaver.saveAs(blob, Global.createGuid() + ".json");
	},

	importGraph: function(){
		var reader = new FileReader();
		reader.onload = function (e) {
		  	var upload = JSON.parse(e.target.result);
				this.setState({graph: this.state.graph.fromJSON(upload), clientInfo: upload.data});
		}.bind(this);
		var uploadedSvg = document.getElementById("uploadBtn");
		reader.readAsText(uploadedSvg.files[0]);
	},

	updateCellText: function(newStr){ //updates cellview text attribute
		if(!$.isEmptyObject(this.state.selectedObject)){
			this.state.graph.get('cells').find(function(cell) {
					if (cell.id === this.state.selectedObject.id) {
							var util = joint.util;

							if(cell.attributes.type == "link"){ //change label if cellview is link
								cell.attributes.attrs.text.text = newStr;
								cell.attributes.labels[0].attrs.text.text = newStr;
							}else{
								cell.attributes.attrs.text.text = util.breakText(newStr, { width: cell.get('size').width}) // break text if its too long
									cell.attributes.attrs.text.text = newStr;
							}

							this.setState({graph: this.state.graph, selectedObject: cell});
							cell.findView(this.state.paper).render(); // re-render cell to reflect changes
						}
			}.bind(this));
		}
	},

	updateValue: function(modifiedVal){
			this.setState({inputValue: {key:modifiedVal , value: ""}});
	},

	deleteMetadata: function(data, e){
		e.preventDefault();
		this.state.graph.get('cells').find(function(cell) {
				if (cell.id === this.state.selectedObject.id) {
						var index = cell.attributes.metadata.indexOf(data);
						if(index >= 0){
							cell.attributes.metadata.splice(index, 1);
						}
						this.setState({graph: this.state.graph});
				}
		}.bind(this));
	},

	addMetaData: function(data){
		if(data.key.length > 0 && !$.isEmptyObject(this.state.selectedObject)){
			this.state.graph.get('cells').find(function(cell) {
					if (cell.id === this.state.selectedObject.id) {
							cell.attributes.metadata.push(data);
							this.setState({selectedObject: cell, inputValue: {key: "", value: ""} });
					}
			}.bind(this));
		}
	},

	updateClientInfo: function(dataInfo){
			var modifiedInfo = {
				WorkflowID: this.state.clientInfo.WorkflowID,
				ClientName: dataInfo.ClientName,
				Version: dataInfo.Version
			}
			this.setState({clientInfo: modifiedInfo});
	},

	updateMetadata: function(item, modifiedVal){
		this.state.graph.get('cells').find(function(cell) {
				if (cell.id === this.state.selectedObject.id) {
						var index = cell.attributes.metadata.indexOf(item);
						if(index >= 0){
							cell.attributes.metadata[index].value = modifiedVal;
							this.setState({graph: this.state.graph});
						}
				}
		}.bind(this));
	},

	updateGraphSettings: function(modifiedSetting){
			this.setState({settings: modifiedSetting})
	},

	toggleDesigner: function(mode,e){
			e.preventDefault()
			this.setState({designerMode: mode})
		},

	render: function(){
		return(
			<div className="row-well">
							<div className="col-md-2">
								<Sidebar graph={this.state.graph} />
							</div>
							<div className="col-md-8" style={{padding: '0px'}}>
								<ToolView updateSettings={this.updateGraphSettings}
													graphSettings={this.state.settings}
													exportGraph={this.exportGraph}
													importGraph={this.importGraph}/>
								<Canvas setPaper={this.setPaper}
												setGraph={this.setGraph}
												graphSettings={this.state.settings}
								 				setSelectedCell={this.setSelectedCell}/>
							</div>
							<div className="col-md-2" style={{padding: '0px', backgroundColor: '#333', height: '100%'}}>
									<ModeView modeType={this.state.designerMode}
														selectedObject={this.state.selectedObject}
														toggleDesigner={this.toggleDesigner}
														inputValue={this.state.inputValue.key}
														updateText={this.updateCellText}
														updateValue={this.updateValue}
														addMetaData={this.addMetaData}
														deleteMetadata={this.deleteMetadata}
														updateMetadata={this.updateMetadata}/>
									<WorkflowInfoView clientInfo={this.state.clientInfo}
																		updateClientInfo={this.updateClientInfo}/>
							</div>
				</div>

		);
	}
});

module.exports = DragDropContext(HTML5Backend)(Board);
