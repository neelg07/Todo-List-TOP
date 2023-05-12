import MenuBar from "./MenuBar";

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

    projDiv.childNodes.forEach(buttonNode => {          // add event listener to each button
        addProjectEditListeners(buttonNode, project);   // variant on type of buttonNode
    });
}

// Adds event listener to each of the different buttons generated in Project edit mode
function addProjectEditListeners(button, project) {
    button.addEventListener('click', () => {
        if (button.id === 'delete-proj') {                                             // if delete btn pressed
            const index = MenuBar.projects.findIndex((proj) => proj === project);      // find index of the project deleted in array
            MenuBar.projects.splice(index, 1);                                         // splice project from array
            renderPageAfterDelete();                                                   // helper func to re-render proj section
        } else if (button.id === 'edit-proj') {
            console.log(button);
        } else {

        }
    })
}

// Renders a page after deleting a projDiv
// Dependant on the length of MenuBar.projects
// after deletion of project from array
function renderPageAfterDelete() {
    Promise.resolve(MenuBar.renderProjectSection()).then(() => {                        // resolve render of project section
        if (MenuBar.projects.length >= 1) {                                             // then click on first proj in section
            const firstProj = document.querySelector('.my-projects').childNodes[0];     // or allTasks if no projects present
            setTimeout(() => firstProj.click(), 0);                                     // setTimeout used to prevent event loop issues
        } else {
            const allTasks = document.querySelector('.all-tasks');
            setTimeout(() => allTasks.click(), 0);
        }
    }).catch((err) => console.log(err));
}