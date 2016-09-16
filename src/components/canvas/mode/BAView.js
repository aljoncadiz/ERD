"use strict";
require('jquery');
var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../../constants/item');
var MetaDataView = require('./metadataView');
var SelectedCellView = require('./selectedCellView');
var ToggleDesigner = require('../../common/toggleDesigner');

var BAView = React.createClass({
    propTypes: {
      selectedObject: PropTypes.object.isRequired,
      inputValue: PropTypes.string.isRequired,
      toggleDesigner: PropTypes.func.isRequired,
      updateText: PropTypes.func.isRequired,
      updateValue: PropTypes.func.isRequired,
      addMetaData: PropTypes.func.isRequired,
    },

    updateInputVal: function(){
      var str = document.getElementById("inputVal").value;
      this.props.updateValue(str);
    },

    addMetaData: function(){
        var metaData = {key: this.props.inputValue, value: "" };
        this.props.addMetaData(metaData);
    },

    render: function(){

      var isSelectedEmpty = function(obj){
          return $.isEmptyObject(obj) ? true : false;
      };

      return(
        <div>
            <div className="row cardSuccess">
                <div className="card">
                  <div className="rotate">
                    <i className="glyphicon glyphicon-user BAcardIcon1"></i>
                    <i className="glyphicon glyphicon-align-right BAcardIcon2"></i>
                    <text className="cardText">B.A. MODE </text>
                  </div>
                </div>
            </div>
            <ToggleDesigner toggleDesigner={this.props.toggleDesigner}/>
            <div className="form-group">
                <div className="col-md-12">
                    <SelectedCellView selectedCell={!isSelectedEmpty(this.props.selectedObject)?this.props.selectedObject.attributes.attrs.text.text : ''}
                                      updateText={this.props.updateText}/>
                </div>
            </div>
            <div className="form-group">
                  <div className="col-md-12" style={{paddingTop:'30px'}}>
                      <div className="input-group">
                         <input type="text" id="inputVal" placeholder="add metadata"
                               className="form-control"
                               value={this.props.inputValue}
                               onChange={this.updateInputVal}
                               disabled={isSelectedEmpty(this.props.selectedObject)}/>
                         <span className="input-group-btn">
                            <button className="btn btn-success glyphicon-plus" type="button" onClick={this.addMetaData}></button>
                         </span>
                      </div>
                  </div>
            </div>
        </div>
      );
    }
});

module.exports = BAView;
