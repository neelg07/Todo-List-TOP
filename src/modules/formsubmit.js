import { Task, Note} from "./tasks";
import RenderPage from "./render";
import MenuBar from "./MenuBar";
import Project from "./projects";
/** Logic for handling Add-Task and Add-Note form on submit events
 *  Takes in data from the form fields and instantiates an obj for it
 *  Renders the list of respective data 
 */

const allTasks = document.querySelector('.all-tasks');
const notes = document.querySelector('.notes');

// saved to call .click() method for closing form instead of "submitting"
const main = document.querySelector('.main');

export function addSubmitFormListener(page) {
    const form = document.getElementsByClassName('add-form')[0];

    form.addEventListener('submit', (e) => {
        // Prevent page reload and 
        // save fields to FormData object and 'values' variable
        e.preventDefault();
        const formData = new FormData(form);
        const values = [...formData.values()];

        if (page === allTasks) {
            const task = new Task(...values);               // generate new Task and if applicable
            addTaskToProject(task);                         // save the task to project instance
        }
        else {new Note(...values)}                         // generate new note if on that page

        main.click();
        // dynamically render tasks from list
        RenderPage.render(page);
    })
}

// Adds task to the project it's associated with
// only if applicable (i.e. if project is selected in form)
function addTaskToProject(task) {
    for (let proj of MenuBar.projects) {                        // check all projects available
        if (proj.title === task.project) {proj.addTask(task);}  // if any project titles match with task's project
    }                                                           // push task to the project instance's task array
}

// Create Note Form
export function createNoteForm() {
    const form = document.createElement('form');
    form.classList.add('add-form', 'hidden');

    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Note');
    title.setAttribute('name', 'note-title');
    title.setAttribute('id', 'note-title');

    const details = document.createElement('textarea');
    details.setAttribute('name', 'note-details');
    details.setAttribute('id', 'note-details');
    details.setAttribute('cols', '20');
    details.setAttribute('rows', '5');
    details.setAttribute('placeholder', 'Details (Optional)')

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('id', 'submit-btn');
    submitBtn.append('Submit');

    form.appendChild(title);
    form.appendChild(details);
    form.appendChild(submitBtn);
    return form;
}

// Add Task Form DOM Creation
export function createTaskForm() {
    const form = document.createElement('form');            // create form
    form.classList.add('add-form', 'hidden');

    const nameLabel = document.createElement('label');      // label for task name
    nameLabel.setAttribute('for', 'taskname');
    nameLabel.append(`Task Title* : `);

    const nameInput = document.createElement('input');      // task name input
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'task');
    nameInput.setAttribute('id', 'taskname');
    nameInput.setAttribute('placeholder', 'Task');

    const details = document.createElement('textarea');     // textarea for details
    details.setAttribute('name', 'details');
    details.setAttribute('id', 'details');
    details.setAttribute('cols', '20');
    details.setAttribute('rows', '5');
    details.setAttribute('placeholder', 'Details (Optional)');

    const dateLabel = document.createElement('label');          // due date label
    dateLabel.setAttribute('for', 'duedate');
    dateLabel.append('Due Date (Optional): ');

    const dateInput = document.createElement('input');          // date input
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    dateInput.setAttribute('id', 'duedate');

    const projectLabel = document.createElement('label');   // label for project select
    projectLabel.setAttribute('for', 'project');
    projectLabel.append('Choose a project (Optional): ');

    const projectSelect = document.createElement('select');     // select element (dropdown list)
    projectSelect.setAttribute('name', 'project');
    projectSelect.setAttribute('id', 'project');

    const noneOption = document.createElement('option');        // Auto select option that is for no association to a project
    noneOption.setAttribute('value', 'none');
    noneOption.append('-none-');
    noneOption.selected = true;
    projectSelect.appendChild(noneOption);
    addProjectOptions(projectSelect);                           // add any projects if any to dropdown list

    const submitBtn = document.createElement('button');         // submit button
    submitBtn.setAttribute('id', 'submit-btn');
    submitBtn.append('Submit');

    form.appendChild(nameLabel);                        // append all elements created to form
    form.appendChild(nameInput);
    form.appendChild(details);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(projectLabel);
    form.appendChild(projectSelect);
    form.appendChild(submitBtn);
    return form;
}

// Adds all available projects as options for Project in task form
function addProjectOptions(selectDiv) {
    for (let project of MenuBar.projects) {
        let option = document.createElement('option');
        option.setAttribute('value', project.title);
        option.append(project.title);
        selectDiv.appendChild(option);
    }
}

export function resetForm(page) {
    if (page === allTasks) {
        document.getElementById('taskname').value = '';
        document.getElementById('details').value = '';
        document.getElementById('duedate').value = null;
    } else if (page === notes) {
        document.getElementById('note-title').value = '';
        document.getElementById('note-details').value = '';
    }
} 