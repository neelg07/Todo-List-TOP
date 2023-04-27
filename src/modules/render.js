import MenuBar from "./MenuBar";
import { addSubmitFormListener, createNoteForm, createTaskForm, resetForm } from "./formsubmit";
import Task from "./tasks";
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
            resetForm(page);            // resets inputs when form is opened next time
            form.classList.remove('hidden');
            btn.classList.add('hidden');
            (page === allTasks) ? document.getElementById('taskname').focus() : document.getElementById('note-title').focus();
        }, 1)
    })
    // Clicking outside of form re-hides the form and unhides the add button
    main.addEventListener('click', () => {
        form.classList.add('hidden');
        btn.classList.remove('hidden');
    })
    form.addEventListener('click', (event) => {
        event.stopPropagation();
    })
}

// Creates Div to store and render
// the tasks w/ respect to the page
function createTaskNode(task) {
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('id', 'task-section');

    taskDiv.appendChild(createLeftDiv(task));
    taskDiv.appendChild(createRightDiv(task));
    return taskDiv;
}

// Creates left div with checkbox and task title
function createLeftDiv(task) {
    const leftDiv = document.createElement('div');
    leftDiv.setAttribute('id', 'task-left');

    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('id', 'task-check');
    leftDiv.appendChild(check);

    const taskTitle = document.createElement('h2');
    taskTitle.setAttribute('id', 'task-title');
    taskTitle.append(task.title);
    leftDiv.appendChild(taskTitle);

    return leftDiv;
}
// Creates right div with important star and "more" button/icon
function createRightDiv(task) {
    const rightDiv = document.createElement('div');
    rightDiv.setAttribute('id', 'task-right');

    const star = document.createElement('input');       // important checkbox
    star.setAttribute('type', 'checkbox');
    star.setAttribute('id', 'important');
    star.classList.add('not-important');
    rightDiv.appendChild(star);

    const moreTab = document.createElement('button');       // button to expand task
    moreTab.setAttribute('type', 'button');
    moreTab.setAttribute('id', 'task-details');
    const moreImg = document.createElement('img');          // append expand icon into button
    moreImg.src = './images/expand-button.png';
    moreImg.alt = 'expand details';
    moreTab.appendChild(moreImg);

    rightDiv.appendChild(moreTab);
    return rightDiv;
}

const main = document.querySelector('.main');
const taskDiv = document.getElementsByClassName('task-section')[0];

export default class RenderPage {
    // Renders the page itself inside div.main
    static render(page) {
        RenderPage.resetDOM();                                  // clear main of all children, then
        main.appendChild(createPageTitle(page));               // add page title/header
        if (page === allTasks) {
            main.appendChild(createTaskForm());              // if All Tasks page create and append task form
            addSubmitFormListener();                         // then add event listener for submit
        } else if (page === notes) {                        
            main.appendChild(createNoteForm());             // else if Notes page, create and append notes form
            addSubmitFormListener();                        // and add the event listener for submit
        }
        if (page === allTasks || page === notes) {          // Then add the "add task/note" button and eventlistener 
            main.appendChild(addTaskButton(page));
            const addBtn = document.querySelector('.add-task');
            addTaskOnClick(addBtn, page);
        }
        RenderPage.renderTasks();                           // render all tasks for the page
    }

    // Renders tasklist inside div.task-section
    static renderTasks() {
        for (let task of Task.taskList) {
            main.appendChild(createTaskNode(task));        // add task div to div.main
        }
        // const page = document.getElementsByClassName('selected')[0];    // retrieve the currently selected page
    }

    static resetDOM() {
        main.innerHTML = '';
    }
}