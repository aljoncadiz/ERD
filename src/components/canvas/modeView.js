require('jquery');
var React = require('react');
var PropTypes = React.PropTypes;

var ItemTypes = require('../../constants/item');
var BAView = require('./mode/BAView');
var DevView = require('./mode/DevView');
var MetaDataView = require('./mode/metadataView');

var ModeView = React.createClass({

  propTypes:{
    modeType: PropTypes.string.isRequired, //BA mode or Dev mode
    selectedObject: PropTypes.object.isRequired, //selected cellview
    inputValue: PropTypes.string.isRequired, //metadata input value
    toggleDesigner: PropTypes.func.isRequired, //toggles dev and BA mode
    updateText: PropTypes.func.isRequired, //update cell text
    updateValue: PropTypes.func.isRequired, //update metadata value
    addMetaData: PropTypes.func.isRequired,
    deleteMetadata: PropTypes.func.isRequired,
    updateMetadata: PropTypes.func.isRequired
  },

  renderMetaDataEditor: function(){
			if(this.props.modeType == ItemTypes.BA){
				return(
					<BAView   selectedObject={this.props.selectedObject}
										toggleDesigner={this.props.toggleDesigner}
										inputValue={this.props.inputValue}
										updateText={this.props.updateText}
										updateValue={this.props.updateValue}
										addMetaData={this.props.addMetaData}
										/>
				);
			}else{
				return(
					<DevView  selectedObject={this.props.selectedObject}
										toggleDesigner={this.props.toggleDesigner}/>
				);
			}
	},
  render: function(){

      var isSelectedEmpty = function(obj){
          return $.isEmptyObject(obj) ? true : false;
      };

      return(
        <div>
            <div>
              {this.renderMetaDataEditor()}
            </div>
            <div className="col-md-12">
                <MetaDataView data={!isSelectedEmpty(this.props.selectedObject)? this.props.selectedObject.attributes.metadata: [] }
                              modeType={this.props.modeType}
                              deleteMetadata={this.props.deleteMetadata}
                              updateMetadata={this.props.updateMetadata}/>
            </div>
        </div>
      );
  }
});

module.exports = ModeView;
