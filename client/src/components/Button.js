import React, {Component} from 'react';

export default class Button extends Component{

  render(){
    return(
      <button
        onClick={() => this.props.onButtonClick('steve')}
      >{this.props.title}</button>
    )
  }
}
