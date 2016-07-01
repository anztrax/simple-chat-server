import React from 'react';

export default class Editable extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {editing,value,onEdit } = this.props;
    if(editing){
      return <StaticEdit value={value} onEdit={onEdit} {...this.props} />
    }

    return <span {...this.props}>value : {value}</span>
  }
}


class StaticEdit extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {onEdit, value } = this.props;

    return (
      <div onClick={onEdit} {...this.props}>
        <span>edit : {value}</span>
      </div>
    )
  }
}