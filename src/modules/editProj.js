import { MenuBar } from "./MenuBar";
import { Task } from "./tasks";

// Hides the children in the project div selected and calls helper function
export function addEditProjectEvent(button) {
    button.addEventListener('click', () => {
        const projDiv = button.parentNode;
        toggleEditModes(projDiv);                       // remove edit btns from all other proj Divs
        projDiv.classList.add('edit-mode');             // add class to currently editing projDiv

        projDiv.childNodes.forEach(child => {           // hide all elements in current projDiv
            child.classList.add('hidden');
        })
        unhideEditButtons(button);                      // unhide edit btns
    })
}

// If any other proj div is in edit mode
// returns it back to normal before making
// currently selected proj div editable
function toggleEditModes(ignoredNode) {
    const projectFolder = document.getElementsByClassName('my-projects')[0];
    projectFolder.childNodes.forEach(child => {
        if (child.classList.contains('edit-mode') && child !== ignoredNode) {
            child.classList.remove('edit-mode'); 
            child.lastElementChild.click();
        } 
        if (containsInput(child)) {                      // if after hitting edit btn already on a project
            const childNodes = child.childNodes;        // get nodelist of all elements
            childNodes[5].click();                      // index 5 is cancel button
        }
    })
}

// returns true if projectNode has an edit input
// or false if not in that mode
function containsInput(projectNode) {
    const inputSubmitBtn = projectNode.lastElementChild;
    const submitBtn = document.getElementById('new-projTitle-submit');
    return inputSubmitBtn === submitBtn;
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
            editProj(button, project);
        } else {                                    // if cancel btn pressed
            cancelProjEdit(button);
        }
    })
}

// Cancels edit mode and re-renders the project section
function cancelProjEdit(button) {
    const projDiv = button.parentNode;
    const deleteBtn = button.previousElementSibling;
    const editBtn = deleteBtn.previousElementSibling;

    if (deleteBtn.classList.contains('hidden')) deleteBtn.classList.remove('hidden');      // remove hidden from classlist if edit/delete buttons already have
    if (editBtn.classList.contains('hidden')) editBtn.classList.remove('hidden');         // such as when edit btn is clicked and cancel clicked next                                                                                                                       
    if (document.getElementById('editProjTitle')) deleteProjTitleInput();                 // delete the new proj title input and submit checkmark btn
    
    projDiv.childNodes.forEach(child => child.classList.toggle('hidden'));
    projDiv.classList.remove('edit-mode');
}

// Delete button was pressed on projectDiv
function deleteProj(project) {                                                 // if delete btn pressed
    const index = MenuBar.projects.findIndex((proj) => proj === project);      // find index of the project deleted in array
    MenuBar.projects.splice(index, 1);                                         // splice project from array
    deleteProjectTasks(project);                                               // helper func to re-render proj section
    Promise.resolve(MenuBar.renderProjectSection()).then(renderPageAfterDelete());
}

// Edit button was pressed on projectDiv
function editProj(button, project) {
    const projDiv = button.parentNode;
    projDiv.appendChild(addEditTitleInput(button, project));
    projDiv.appendChild(addSubmitNewProjBtn(project));
    
}

// removes edit and delete btns from edit menu
// adds input element for proj title update
// enter button submits the form to update
// the proj being edited
function addEditTitleInput(button, project) {
    const deleteBtn = button.nextElementSibling;
    button.classList.add('hidden');
    deleteBtn.classList.add('hidden');

    const titleInput = document.createElement('input');
    titleInput.setAttribute('id', 'editProjTitle');
    titleInput.setAttribute('value', project.title);
    titleInput.setAttribute('name', 'project-title');
    return titleInput;
}

// adds submit button for project title edit input
// event listener listens for click to update proj title
function addSubmitNewProjBtn(project) {
    const submitBtn = document.createElement('button');
    submitBtn.append('✓');
    submitBtn.setAttribute('id', 'new-projTitle-submit');
    
    const projInput = document.getElementById('editProjTitle');

    submitBtn.addEventListener('click', () => {
        console.log(projInput.value);
    })
    return submitBtn;
}

// deletes DOM loaded proj input and btn
// once need for it is complete
function deleteProjTitleInput() {
    const input = document.getElementById('editProjTitle');
    const submitBtn = document.getElementById('new-projTitle-submit');
    input.remove();
    submitBtn.remove();
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
