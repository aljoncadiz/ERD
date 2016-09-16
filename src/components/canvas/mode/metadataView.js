var React = require('react');
var PropTypes = React.PropTypes;
var Global = require('../../../global');
var ItemTypes = require('../../../constants/item');


var MetaDataView = React.createClass({

      propTypes:{
        data: PropTypes.array.isRequired,
        modeType: PropTypes.string.isRequired,
        deleteMetadata: PropTypes.func.isRequired,
        updateMetadata: PropTypes.func.isRequired
      },

      deleteData: function(data, event){
          this.props.deleteMetadata(data, event)
      },

      updateDataValue: function(item, e){
          e.preventDefault();

          var modifiedVal = document.getElementById(this.getKeyValue(item)).value;
          this.props.updateMetadata(item, modifiedVal)
      },

      getKeyValue: function(item){
        return item.key + '_' + this.props.data.indexOf(item); //creates constant unique key for rendering purposes
      },

      render: function(){
        var renderRows = function(item){
              if(this.props.modeType == ItemTypes.BA){
                  return(
                    <div style={{paddingTop: '10px'}} key={this.getKeyValue(item)}>
                       <div className="btn btn-primary" style={{cursor: 'text'}}>
                               {item.key}  <i className="glyphicon glyphicon-remove-sign" onClick={this.deleteData.bind(this, item)} style={{cursor: 'pointer'}}></i>
                        </div>
                    </div>
                  );
                }else{
                  return(
                    <div style={{paddingTop: '10px'}} key={this.getKeyValue(item)}>
                        <div className="col-md-12" style={{paddingLeft: '0px', paddingBottom: '20px'}}>
                            <input className="form-control" type="text" placeholder={item.key + " value"}
                                                            id={this.getKeyValue(item)}
                                                            value={item.value}
                                                            onChange={this.updateDataValue.bind(this,item)}/>
                            <span className="label label-primary metadataValue">{item.key} </span>
                        </div>
                    </div>
                  );
                }
        };
        return(
         <div className="form-group" style={{marginTop: '10px'}}>
            <span className="label label-default" style={{fontSize: '13px', marginTop: '-10px'}}>Metadata:</span>
            <div className="container-fluid metaDataView">
              <div className="scroll metaDataList">
                {this.props.data.length > 0 ? this.props.data.map(renderRows, this): ''}
              </div>
            </div>
         </div>
        );
      }
});

module.exports = MetaDataView;
