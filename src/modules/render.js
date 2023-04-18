/**Render Module
 * is called by onclick listeners via MenuBar.renderPage method
 * dynamically renders the page selected in the .main section
 */


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
            pageTitle.append("Starred");
            break;
        case notes:
            pageTitle.append('My Notes');
            break;
        default:
            pageTitle.append(`${page.title}`);      // Project title if project page is selected
    }
    pageTitleDiv.appendChild(pageTitle);
    return pageTitleDiv;
}

// Add Task Div/Button DOM Creation
function addTaskButton() {
    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('add-task');

    const plusImg = document.createElement('img');
    plusImg.src = "./images/plus.png";
    plusImg.alt = 'plus-sign-icon';
    plusImg.setAttribute('id', 'add-proj-main');
    plusImg.setAttribute('width', '25');
    plusImg.setAttribute('height', '25');

    const addTaskH2 = document.createElement('h2');
    addTaskH2.append('Add Task');

    addTaskDiv.appendChild(plusImg);
    addTaskDiv.appendChild(addTaskH2);
    return addTaskDiv;
}

// Add Task Form DOM Creation
function createTaskForm() {

}

class RenderPage {

    static render(page) { 
        // TODO
    }
}