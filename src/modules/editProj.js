import { MenuBar } from "./MenuBar";
import { Task } from "./tasks";

// Hides the children in the project div selected and calls helper function
export function addEditProjectEvent(button) {
    button.addEventListener('click', () => {
        const projDiv = button.parentNode;
        projDiv.childNodes.forEach(child => {
            child.classList.add('hidden');
        })
        unhideEditButtons(button);
    })
}

// Unhides edit buttons w/ respect to that projDiv
function unhideEditButtons(button) {
    const editBtn = button.nextElementSibling;
    const deleteBtn = editBtn.nextElementSibling;
    const cancelBtn = deleteBtn.nextElementSibling;

    editBtn.classList.remove('hidden');
    deleteBtn.classList.remove('hidden');
    cancelBtn.classList.remove('hidden');
}

// Adds new edit layout (3 btns) to projDiv
export function addEditProjBtns(project) {
    const edit = document.createElement('button');
    edit.setAttribute('type', 'button');
    edit.setAttribute('id', 'edit-proj');
    edit.classList.add('hidden');
    edit.append('Edit');

    const del = document.createElement('button');
    del.setAttribute('type', 'button');
    del.setAttribute('id', 'delete-proj');
    del.classList.add('hidden');
    del.append('Delete');

    const cancel = document.createElement('button');
    cancel.setAttribute('type', 'button');
    cancel.setAttribute('id', 'cancel-proj-edit');
    cancel.classList.add('hidden');
    cancel.append('Cancel');

    const editBtns = [edit, del, cancel];

    editBtns.forEach(buttonNode => {                    // add event listener to each button
        addProjectEditListeners(buttonNode, project);   // variant on type of buttonNode
    });

    return editBtns;
}

// Adds event listener to each of the different buttons generated in Project edit mode
function addProjectEditListeners(button, project) {
    button.addEventListener('click', () => {
        if (button.id === 'delete-proj') {         // if delete btn pressed
            deleteProj(project);
        } else if (button.id === 'edit-proj') {     // if edit btn pressed
            console.log(button);
        } else {                                    // if cancel btn pressed
            cancelProjEdit();
        }
    })
}

// Cancels edit mode and re-renders the project section
function cancelProjEdit() {
    console.log('cancel');
}

// Delete button was pressed on projectDiv
function deleteProj(project) {                                                 // if delete btn pressed
    const index = MenuBar.projects.findIndex((proj) => proj === project);      // find index of the project deleted in array
    MenuBar.projects.splice(index, 1);                                         // splice project from array
    deleteProjectTasks(project);                                               // helper func to re-render proj section
    Promise.resolve(MenuBar.renderProjectSection()).then(renderPageAfterDelete());
}

// Renders a page after deleting a projDiv
// Dependant on the length of MenuBar.projects
// after deletion of project from array
function renderPageAfterDelete() {
    const allTasks = document.querySelector('.all-tasks');                          // if any proj still in list after delete
    if (MenuBar.projects.length >= 1) {                                             // then click on first proj in section
        const firstProj = document.querySelector('.my-projects').childNodes[0];     // or allTasks if no projects present
        setTimeout(() => firstProj.click(), 10);                                    // setTimeout used to prevent event loop issues
    } else {
        setTimeout(() => allTasks.click(), 10);
    }
}

// Delete all tasks associated w/ project
// after project is deleted
function deleteProjectTasks(project) {
    for (let projTask of project.tasks) {                                           // iterate thru each task associated w/ project deleted
        let index = Task.taskList.findIndex((task) => task === projTask);           // find index of any matching task in Task.taskList static arr
        if (index !== -1) {Task.taskList.splice(index, 1)}                      // if found in taskList arr, splice at index to remove that task
    }
}