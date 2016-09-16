var React = require('react');
var PropTypes = React.PropTypes;


var ToolView = React.createClass({

      propTypes: {
        updateSettings: PropTypes.func.isRequired,
        graphSettings: PropTypes.object.isRequired,
        exportGraph: PropTypes.func.isRequired,
        importGraph: PropTypes.func.isRequired
      },

      resizeGraph: function(){
          var newSettings = {
  					graphWidth: document.getElementById("graph_width").value + "px",
  					graphHeight: document.getElementById("graph_height").value + "px"
  				};

          this.props.updateSettings(newSettings);
      },

      render: function(){
        return(
          <div className="col-md-12 canvasToolView">
              <div className="col-md-9">
                  <div className="col-md-6">
                      <div className="input-group">
                          <span className="input-group-addon">graph width:</span>
                          <input type="number" id="graph_width" className="form-control"
                                               value={this.props.graphSettings.graphWidth.replace("px","")}
                                               onChange={this.resizeGraph}/>
                          <span className="input-group-addon">px</span>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="input-group">
                          <span className="input-group-addon">graph height:</span>
                          <input type="number" id="graph_height" className="form-control"
                                               value={this.props.graphSettings.graphHeight.replace("px","")}
                                               onChange={this.resizeGraph}/>
                          <span className="input-group-addon">px</span>
                      </div>
                  </div>
              </div>
              <div className="col-md-3 noPadding">
                  <div className="col-md-6" style={{padding: '0px'}}>
                      <div className="btn btn-default" style={{width: '100%'}} onClick={this.props.exportGraph}>
                          <span className="glyphicon glyphicon-export"> </span> download
                      </div>
                  </div>
                  <div className="col-md-6" style={{padding: '0px'}}>
                      <div className="fileUpload btn btn-default" style={{margin: '0px', width: '100%'}}>
                          <span className="glyphicon glyphicon-import"> </span> upload
                          <input id="uploadBtn" type="file" className="upload" accept=".json" onChange={this.props.importGraph}/>
                      </div>
                  </div>
              </div>
          </div>
        )
      }
});

module.exports = ToolView;
