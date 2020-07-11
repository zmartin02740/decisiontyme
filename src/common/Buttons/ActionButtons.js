import React from 'react';

const ActionButtons = (props) => {
    if (props.isEditing) {
        return (
            <div>
                <strong><a className="SaveB" style={{padding: '7px', border: 'solid #3f3c87 3px', margin: '2px', color: '#3f3c87', cursor: 'pointer'}} onClick={props.onSaveClick}>SAVE</a></strong>
                <strong><a className="CancelB" style={{padding: '7px', border: 'solid gray 3px', margin: '2px', color: 'gray', cursor: 'pointer'}} onClick={props.onCancel}>CANCEL</a></strong>
            </div>
        );
    }
    return (
        <div>
            <strong><a className="EditB" style={{padding: '7px', border: 'solid #af9121 3px', margin: '2px', color: '#af9121', cursor: 'pointer'}} onClick={props.editHandler}>EDIT</a></strong>
            <strong><a className="DeleteB" style={{padding: '7px', border: 'solid #7c251d 3px', margin: '2px', color: '#7c251d', cursor: 'pointer'}} onClick={props.deleteHandler}>DELETE</a></strong>
        </div>
    );
}

export default ActionButtons;
