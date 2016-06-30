import React from 'react';
import Notes from './Notes.jsx';
import uuid from 'uuid';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      notes : [
        {
          id : uuid.v4(),
          task : 'Learn react'
        },
        {
          id : uuid.v4(),
          task : 'Do laundry'
        }
      ]
    };
  }

  addNote(){
    const oldNotes = this.state.notes;
    this.setState({
      notes : [...oldNotes, {
        id : uuid.v4(),
        task : 'New task'
      }]
    });
  }

  render(){
    return (
      <div>
        <button onClick={this.addNote.bind(this)}>+</button>
        <Notes notes={this.state.notes} />
      </div>
    )
  }
}