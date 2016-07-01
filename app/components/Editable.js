import React from 'react';
import classnames from 'classnames';

class Editable extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {editing,value,onEdit, className } = this.props;
    if(editing){
      return <Edit className={className} value={value} onEdit={onEdit} {...this.props} />
    }

    return <Value className={classnames('value', className)} value={value} {...this.props} />;
  }
}

export class Value extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { value , className } = this.props;
    return (
      <span className={className} {...this.props}>{value}</span>
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
    const {value, className} = this.state;
    return (
      <input
        type="text"
        className={classnames('edit',className)}
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
