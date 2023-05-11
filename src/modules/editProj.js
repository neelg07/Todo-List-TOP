// Clears the project div selected and calls helper function
export function addEditProjectEvent(button, project) {
    button.addEventListener('click', () => {
        const projDiv = button.parentNode;
        projDiv.innerHTML = '';
        addEditProjBtns(project, projDiv);
    })
}

// Adds new edit layout (3 btns) to projDiv
function addEditProjBtns(project, projDiv) {
    const edit = document.createElement('button');
    edit.setAttribute('type', 'button');
    edit.setAttribute('id', 'edit-proj');
    edit.append('Edit');

    const del = document.createElement('button');
    del.setAttribute('type', 'button');
    del.setAttribute('id', 'delete-proj');
    del.append('Delete');

    const cancel = document.createElement('button');
    cancel.setAttribute('type', 'button');
    cancel.setAttribute('id', 'cancel-proj-edit');
    cancel.append('Cancel');

    projDiv.appendChild(edit);
    projDiv.appendChild(del);
    projDiv.appendChild(cancel);
    projDiv.classList.add('edit-menu');
}