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
    addTaskOnClick(addTaskDiv, page);
    return addTaskDiv;
}

// Causes form to popup when add-task/note div clicked on 
// Different for Task and Notes pages
// Async functions used to allow DOM to load the form before adding event listener for it
function addTaskOnClick(div, page) {
    div.addEventListener('click', () => {
        if (page === allTasks) {
            setTimeout( () => {
                const form = document.getElementsByClassName('add-task-form');
                form[0].classList.remove('hidden');
                div.classList.add('hidden');
                document.getElementById('taskname').focus();
            }, 1);
        } else {
            console.log('form = querySelect(noteform)');    // TODO
        }
    })
}

// Add Task Form DOM Creation
function createTaskForm() {
    const form = document.createElement('form');
    form.classList.add('add-task-form', 'hidden');

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'taskname');
    const requireSpan = document.createElement('span');
    requireSpan.setAttribute('aria-label', 'required');
    requireSpan.append('*');
    nameLabel.append(`Task Title: ${requireSpan}`);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'task');
    nameInput.setAttribute('id', 'taskname');
    nameInput.setAttribute('placeholder', 'Task');

    const details = document.createElement('textarea');
    details.setAttribute('name', 'details');
    details.setAttribute('id', 'details');
    details.setAttribute('cols', '20');
    details.setAttribute('rows', '5');
    details.setAttribute('placeholder', 'Optional Details');

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'duedate');
    dateLabel.append('Due Date (Optional): ');

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    dateInput.setAttribute('id', 'duedate');

    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', 'project');
    projectLabel.append('Choose a project (Optional): ');

    const projectSelect = document.createElement('select');
    projectSelect.setAttribute('name', 'project');
    projectSelect.setAttribute('id', 'project');

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(details);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(projectLabel);
    form.appendChild(projectSelect);
    return form;
}

const main = document.querySelector('.main');

export default class RenderPage {

    static render(page) {
        RenderPage.resetDOM();
        main.appendChild(createPageTitle(page));               // add specific page title
        if (page === allTasks) {
            main.appendChild(createTaskForm());
            main.appendChild(addTaskButton(allTasks));              // if All Tasks page, add the add-task btn and task form
        } else if (page === notes) {
            main.appendChild(addTaskButton(notes));
        }
    }

    static resetDOM() {
        main.innerHTML = '';
    }
}