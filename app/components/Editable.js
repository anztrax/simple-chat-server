import React from 'react';

class Editable extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {editing,value,onEdit } = this.props;
    if(editing){
      return <Edit value={value} onEdit={onEdit} {...this.props} />
    }

    return <Value value={value} {...this.props} />;
  }
}

export class Value extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { value } = this.props;
    return (
      <span {...this.props}>{value}</span>
    )
  }
}
Editable.Value = Value;

export class Edit  extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : this.props.value
    }
  }

  render(){
    const {value} = this.state;
    return (
      <input
        type="text"
        autoFocus={true}
        value={value}
        onChange={this.changeValue.bind(this)}
        onBlur={this.finishEdit.bind(this)}
        onKeyPress={this.checkEnter.bind(this)}
        />
    )
  }

  checkEnter(e){
    if(e.key == 'Enter'){
      this.finishEdit(e);
    }
  }

  changeValue(e){
    this.setState({value : e.target.value});
  }

  finishEdit(e){
    const { onEdit }= this.props;
    const value = e.target.value;
    if(onEdit){
      onEdit(value);
    }
  }
}
Editable.Edit = Edit;

export default Editable;
