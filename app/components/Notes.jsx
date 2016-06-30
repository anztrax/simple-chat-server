import React from 'react';

export default class Notes extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h2>Testing gan</h2>
        <ul>
          {this.props.notes.map(note => {
            return <li key={note.id}>{note.task}</li>
          })}
        </ul>
      </div>
    )
  }
}