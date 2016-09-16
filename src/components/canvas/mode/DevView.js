var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../../constants/item');
var ToggleDesigner = require('../../common/toggleDesigner');
var MetaDataView = require('./metadataView');

var DevView = React.createClass({

    propTypes:{
      selectedObject: PropTypes.object.isRequired,
      toggleDesigner: PropTypes.func.isRequired,
    },

      render: function(){

        var isSelectedEmpty = function(obj){
            return $.isEmptyObject(obj) ? true : false;
        };

          return(
            <div>
                <div className="row cardDanger">
                    <div className="cardInnerDamger">
                      <div className="rotate">
                        <i className="glyphicon glyphicon-user BAcardIcon1"></i>
                        <i className="glyphicon glyphicon-cog BAcardIcon2"></i>
                        <text className="cardText">DEV MODE </text>
                      </div>
                    </div>
                </div>
                <ToggleDesigner toggleDesigner={this.props.toggleDesigner}/>
                <div className="form-group">
                    <div className="col-md-12">
                        <div className="container-fluid"  style={{borderStyle: 'dashed', borderColor: 'grey', paddingLeft: '0px'}}>
                          <span className="label label-default" style={{fontSize: '13px'}}>Selected Object:</span>

                          <div className="col-md-12" style={{margin: '10px', padding: '0px'}}>
                              <canvas width="150" height="50"  id="selectedPane" >
                                  <image id="embedImg" width="150" height="50"></image>
                              </canvas>
                           </div>
                        </div>
                    </div>
                </div>
              </div>
          );
      }
});

module.exports = DevView;
