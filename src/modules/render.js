import MenuBar from "./MenuBar";
/**Render Module
 * is called by onclick listeners via MenuBar.renderPage method
 * dynamically renders the page selected in the .main section
 */

const allTasks = document.querySelector('.all-tasks');
const today = document.querySelector('.today');
const week = document.querySelector('.week');
const important = document.querySelector('.important');
const notes = document.querySelector('.notes');

// Page Title DOM Creation
function createPageTitle(page) {
    const pageTitleDiv = document.createElement('div');
    pageTitleDiv.classList.add('page-title');
    
    const pageTitle = document.createElement('h1');
    switch (page) {                                 // variable title based on page being rendered
        case allTasks:
            pageTitle.append('All Tasks');
            break;
        case today:
            pageTitle.append("Today's Tasks");
            break;
        case week:
            pageTitle.append("This Week's Tasks");
            break;
        case important:
            pageTitle.append("Important Tasks");
            break;
        case notes:
            pageTitle.append('My Notes');
            break;
        default:
            pageTitle.append(page.id);        // append Project title if a project page is selected
    }
    pageTitleDiv.appendChild(pageTitle);
    return pageTitleDiv;
}

// Add Task Div/Button DOM Creation
function addTaskButton(page) {
    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('add-task');

    const plusImg = document.createElement('img');
    plusImg.src = "./images/plus.png";
    plusImg.alt = 'plus-sign-icon';
    plusImg.setAttribute('id', 'add-proj-main');
    plusImg.setAttribute('width', '25');
    plusImg.setAttribute('height', '25');

    const addTaskH2 = document.createElement('h2');
    if (page === allTasks) {
        addTaskH2.append('Add Task');
    } else if (page === notes) {
        addTaskH2.append('Add Note');
    }
    
    addTaskDiv.appendChild(plusImg);
    addTaskDiv.appendChild(addTaskH2);
    return addTaskDiv;
}



// Causes form to popup when add-task/note div clicked on 
// Different for Task and Notes pages
// Async setTimeouts used to allow DOM to load the form before adding event listener for it
function addTaskOnClick(btn, page) {
    const form = document.getElementsByClassName('add-form')[0];
    // Add-btn onclick event
    btn.addEventListener('click', () => {
        setTimeout(() => {
            form.classList.remove('hidden');
            btn.classList.add('hidden');
            (page === allTasks) ? document.getElementById('taskname').focus() : document.getElementById('note-title').focus();
        }, 1)
    })
    // Clicking outside of form re-hides the form and unhides the add button
    document.addEventListener('click', () => {
        resetForm(page);           // resets inputs when form is closed
        form.classList.add('hidden');
        btn.classList.remove('hidden');
    })
    form.addEventListener('click', (event) => {
        event.stopPropagation();
    })
}

function resetForm(page) {
    if (page === allTasks) {
        document.getElementById('taskname').value = '';
        document.getElementById('details').value = '';
        document.getElementById('duedate').value = null;
    } else if (page === notes) {
        document.getElementById('note-title').value = '';
        document.getElementById('note-details').value = '';
    }
} 

// Add Task Form DOM Creation
function createTaskForm() {
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

// Create Note Form
function createNoteForm() {
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

const main = document.querySelector('.main');

export default class RenderPage {

    static render(page) {
        RenderPage.resetDOM();
        main.appendChild(createPageTitle(page));               // add page title/header
        if (page === allTasks) {
            main.appendChild(createTaskForm());              // if All Tasks page create and append task form
        } else if (page === notes) {                        // else if Notes page, create and append notes form
            main.appendChild(createNoteForm());       
        }
        if (page === allTasks || page === notes) {          // Then add the "add task/note" button and eventlistener 
            main.appendChild(addTaskButton(page));
            const addBtn = document.querySelector('.add-task');
            addTaskOnClick(addBtn, page);
        }
    }

    static resetDOM() {
        main.innerHTML = '';
    }
}