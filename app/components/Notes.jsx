import React from 'react';
import Note from './Note';
import Editable from './Editable';

export default class Notes extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    const defaultOnDelete = () => {
      console.log('default on delete !');
    }
    const defaultOnEdit = () => {
      console.log('default on edit');
    }

    const defaultOnNoteClick = () => {
      console.log('default on note click');
    }

    const onDelete = this.props.onDelete || defaultOnDelete;
    const onEdit = this.props.onEdit || defaultOnEdit;
    const onNoteClick = this.props.onNoteClick || defaultOnNoteClick;
    return (
      <div>
        <h2>Todo App</h2>
        <ul className="notes">
          {this.props.notes.map(note => {
            const id = note.id;
            const task = note.task;
            const editing = note.editing;
            return (
              <li key={id}>
                <Note onClick={onNoteClick.bind(null,id)} className="note">
                  <Editable
                    className="editable"
                    editing={editing}
                    value={task}
                    onEdit={onEdit.bind(null,id)}
                  />
                  <button className="delete" onClick={onDelete.bind(null,id)}>x</button>
                </Note>
              </li>
              );
          })}
        </ul>
      </div>
    )
  }
}