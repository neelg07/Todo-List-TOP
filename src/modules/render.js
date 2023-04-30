import MenuBar from "./MenuBar";
import { addSubmitFormListener, createNoteForm, createTaskForm, resetForm } from "./formsubmit";
import Task from "./tasks";
import { addRightDivListeners, addCheckEventListener } from "./taskEvents";
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

    addCheckEventListener(task, check);
    return leftDiv;
}
// Creates right div with important star and "more" button/icon
function createRightDiv(task) {
    const rightDiv = document.createElement('div');
    rightDiv.setAttribute('id', 'task-right');

    if (task.date) {                                            // due date
        const dueDate = document.createElement('h2');           // format 'yyyy-mm-dd' into 'MMM-dd-yyyy'
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dateArray = task.date.split('-');
        const formattedDate = `${months[parseInt(dateArray[1])-1]}-${dateArray[2]}-${dateArray[0]}`;
        dueDate.append(formattedDate);
        rightDiv.append(dueDate);
    } 

    const star = document.createElement('input');       // important checkbox
    star.setAttribute('type', 'checkbox');
    star.setAttribute('id', 'important');
    if (task.important) {
        star.checked = true;
    }
    rightDiv.appendChild(star);

    const moreTab = document.createElement('button');       // button to expand task
    moreTab.setAttribute('type', 'button');
    moreTab.setAttribute('id', 'task-details');
    const moreImg = document.createElement('img');          // append expand icon into button
    moreImg.src = './images/expand-button.png';
    moreImg.alt = 'expand-details';
    moreImg.setAttribute('id', 'expand-btn');
    moreTab.appendChild(moreImg);
    rightDiv.appendChild(moreTab);

    addRightDivListeners(task, star, moreTab);        // add event listeners to star checkbox and expand tab
    return rightDiv;                                  // using corresponding task instance
}

const main = document.querySelector('.main');

export default class RenderPage {
    // Renders the page itself inside div.main
    static render(page) {
        RenderPage.resetDOM();                                  // clear main of all children, then
        main.appendChild(createPageTitle(page));               // add page title/header
        if (page === allTasks) {
            main.appendChild(createTaskForm());              // if All Tasks page create and append task form
        } else if (page === notes) {                        
            main.appendChild(createNoteForm());             // else if Notes page, create and append notes form
        }
        if (page === allTasks || page === notes) {          // Then add the "add task/note" button and eventlistener 
            main.appendChild(addTaskButton(page));
            const addBtn = document.querySelector('.add-task');
            addTaskOnClick(addBtn, page);
            addSubmitFormListener(page);                 // add the event listener for submit form
        }
        RenderPage.renderTasks();                     // render all tasks for the page
    }

    // Renders tasklist inside div.task-section
    static renderTasks() {
        const page = document.getElementsByClassName('selected')[0];    // retrieve the currently selected page
        
        switch (page) {
            case allTasks:                          // add task div to div.main
                for (let task of Task.taskList) { main.appendChild(createTaskNode(task)) };
                break;
            case today:                             // add task div if due date is today
                const todaysDate = getTodaysDate();
                for (let task of Task.taskList) {
                    if (todaysDate === task.date) { main.appendChild(createTaskNode(task)) };
                }
                break;
            case week:                             // add task div if due date is due between today - end of week
                const startDate = new Date();
                const endDate = new Date(getEndOfWeek());
                for (let task of Task.taskList) {
                    const dateArr = task.date.split('-');               // format properly before
                    dateArr[2] = parseInt(dateArr[2]).toString();       // converting into date object
                    const taskDate = new Date(dateArr.join('-'));       // and checking if within range
                    if (taskDate >= startDate && taskDate <= endDate || task.date === getTodaysDate()) { main.appendChild(createTaskNode(task)) }; 
                }
                break;
            case important:                         // add task if it is starred
                for (let task of Task.taskList) {
                    if (task.important) { main.appendChild(createTaskNode(task)) };
                }
                break;
        }
    }   
    
    static resetDOM() {
        main.innerHTML = '';
    }
}


// Returns Today's Date as a string
// Used to check equivalency for task due dates
// Used in rendering the "Today" page
function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');     // getMonth is 0 indexed so add 1 and convert to string with 2 digits
    const day = today.getDate().toString().padStart(2, '0');

    const formatted = `${year}-${month}-${day}`;
    return formatted; 
}

// Returns the end of the week
// Used to get range of dates used for "This Week" page
function getEndOfWeek() {
    const endOfWeek = new Date();
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    // format to string 
    const year = endOfWeek.getFullYear();
    const month = (endOfWeek.getMonth() + 1).toString().padStart(2, '0');
    const day = endOfWeek.getDate().toString();

    const formatted = `${year}-${month}-${day}`;
    return formatted;
}   