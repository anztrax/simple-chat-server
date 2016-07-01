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
        <h2>Testing gan</h2>
        <ul>
          {this.props.notes.map(note => {
            const id = note.id;
            const task = note.task;
            const editing = note.editing;
            return (
              <li key={id}>
                <Note onClick={onNoteClick.bind(null,id)}>
                  <Editable
                    editing={editing}
                    value={task}
                    onEdit={onEdit.bind(null,id)}
                  />
                  <button onClick={onDelete.bind(null,id)}>x</button>
                </Note>
              </li>
              );
          })}
        </ul>
      </div>
    )
  }
}