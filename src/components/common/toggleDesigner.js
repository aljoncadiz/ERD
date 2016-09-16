var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('../../constants/item');

var ToggleDesigner = React.createClass({

      propTypes:{
        toggleDesigner: PropTypes.func.isRequired
      },

      toggleMode: function(mode, event){
        this.props.toggleDesigner(mode, event);
      },

      render: function(){
          return(
            <div className="container-fluid toggleMode">
              <div className="dropdown">
                   <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={{padding: '6px 6px'}}>
                   <span className="caret"></span></button>
                   <ul className="dropdown-menu">
                       <li><a onClick={this.toggleMode.bind(this, ItemTypes.BA)}>B.A. Mode</a></li>
                       <li><a onClick={this.toggleMode.bind(this, ItemTypes.DEV)}>Dev Mode</a></li>
                   </ul>
               </div>
            </div>
          );
      }
});

module.exports = ToggleDesigner;
