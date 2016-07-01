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
          task : 'Learn react',
          editing : false
        },
        {
          id : uuid.v4(),
          task : 'Do laundry',
          editing : false
        }
      ]
    };
  }

  addNote(){
    const oldNotes = this.state.notes;
    this.setState({
      notes : [...oldNotes, {
        id : uuid.v4(),
        task : 'New task',
        editing : false
      }]
    });
  }

  deleteNote(id,e){
    //avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      notes : this.state.notes.filter(note => note.id !== id)
    })
  }

  activateNoteEdit(id){
    this.setState({
      notes : this.state.notes.map(note => {
        if(note.id === id){
          note.editing = true;
        }
        return note;
      })
    })
  }

  editNote(id,task){
    this.setState({
      notes : this.state.notes.map(note => {
        if(note.id === id){
          note.editing = false;
          note.task = task;
        }
        return note;
      })
    });
  }

  render(){
    const { notes } = this.state;
    return (
      <div>
        <button className="add-note" onClick={this.addNote.bind(this)}>+</button>
        <Notes
          notes={notes}
          onDelete={this.deleteNote.bind(this)}
          onNoteClick={this.activateNoteEdit.bind(this)}
          onEdit={this.editNote.bind(this)}
        />
      </div>
    )
  }
}