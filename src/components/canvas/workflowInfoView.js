var React = require('react');
var PropTypes = React.PropTypes;

var Global = require('../../global');


var WorkFlowInfoView = React.createClass({

    propTypes:{
      clientInfo: PropTypes.object.isRequired,
      updateClientInfo: PropTypes.func.isRequired
    },

    updateInfo : function(){
      var dataInfo = {
        ClientName: document.getElementById('client_name').value,
        Version: document.getElementById('wrkflow_version').value
      }
      this.props.updateClientInfo(dataInfo);
    },

    render: function(){
      return(
        <div className="form-group" style={{marginTop: '10px'}}>
            <div className="col-md-12">
               <span className="label label-default" style={{fontSize: '13px', marginTop: '-10px'}}>Workflow Info:</span>
               <div className="container-fluid workflowView">
                   <div className="form-group" style={{paddingTop:'25px'}}>
                       <label className="txtlabel">Workflow ID</label>
                       <input type="text" className="form-control" value={this.props.clientInfo.WorkflowID} readOnly/>
                   </div>
                   <div className="form-group">
                       <label className="txtlabel">Client Name</label>
                       <textarea rows="3" id="client_name" className="form-control" placeholder="client name"
                                          value={this.props.clientInfo.ClientName}
                                          onChange={this.updateInfo}/>
                   </div>
                   <div className="form-group">
                       <label className="txtlabel">Version</label>
                       <input type="text" id="wrkflow_version" className="form-control" placeholder="version"
                                          value={this.props.clientInfo.Version}
                                          onChange={this.updateInfo}/>
                   </div>
               </div>
            </div>
        </div>
      );
    }
});

module.exports = WorkFlowInfoView;
