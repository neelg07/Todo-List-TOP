/** Module to hold all event listeners
 *  dealing with the rendered Task in DOM
 */

export function addRightDivListeners(task, starImg, expandImg) {
    addStarListener(task, starImg);
    addExpandListener(task, expandImg);
}

// Important "star" checkbox event listener
// click page tab after to reset with updated tasks
function addStarListener(task, starImg) {
    const page = document.getElementsByClassName('selected')[0];

    starImg.addEventListener('change', () => {
        if (starImg.checked) {
            task.important = true;
        } else {
            task.important = false;
        }
        page.click();
    })
}

// Expand arrow button event listener 
function addExpandListener(task, expandImg) {

    expandImg.addEventListener('click', () => {
        const taskNode = expandImg.parentNode.parentNode.parentNode;
        taskNode.classList.toggle('expanded');

        if (taskNode.classList.contains('expanded')) {
            if (task.detail) taskNode.appendChild(addTaskDetail(task));
            if (task.project !== 'none') taskNode.appendChild(addTaskProject(task));
            taskNode.appendChild(addDeleteTaskBtn(task));    
        }
        else {
            // removeExpanded(taskNode);
        }
        
    })
}

// Adds div containing description of task
// if not empty string (no details inputted)
function addTaskDetail(task) {
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('task-detail');
    detailDiv.append(task.detail);

    return detailDiv;
}

// Adds div containing the project it's linked to if not 'none'
function addTaskProject(task) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('task-project');
    projectDiv.append(task.project);

    return projectDiv;
}

// adds dom rendered button to delete the entire task
function addDeleteTaskBtn(task) {
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.classList.add('delete-task-btn');
    deleteTaskBtn.append('Delete Task');

    return deleteTaskBtn;
}

// add event listener to circular checkbox on left of task title
// adds strikethrough style to task title indicating completion
export function addCheckEventListener(check, task_note) {
    check.addEventListener('change', () => {
        if (check.checked) {
            check.nextSibling.classList.add('strike-out');
            task_note.complete = true;
        } else {
            check.nextSibling.classList.remove('strike-out');
            task_note.complete = false; 
        }
    })
}

