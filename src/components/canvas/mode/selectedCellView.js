var React = require('react');
var PropTypes = React.PropTypes;

var SelectedCellView = React.createClass({

      propTypes:{
        selectedCell: PropTypes.string.isRequired,
        updateText: PropTypes.func.isRequired
      },

      updateCellText: function(){
        var str = document.getElementById("cellTxt").value;
        this.props.updateText(str);
      },

      render: function(){
         return(
           <div className="container-fluid"  style={{borderStyle: 'dashed', borderColor: 'grey', paddingLeft: '0px'}}>
             <span className="label label-default" style={{fontSize: '13px'}}>Selected Object:</span>

             <div className="col-md-12" style={{margin: '10px', padding: '0px'}}>
                 <textarea rows="3" id="cellTxt"
                       className="form-control"
                       value={this.props.selectedCell}
                       onChange={this.updateCellText}/>
              </div>
           </div>
         );
      }
});

module.exports = SelectedCellView;
