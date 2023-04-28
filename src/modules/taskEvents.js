/** Module to hold all event listeners
 *  dealing with the rendered Task in DOM
 */

export function addRightDivListeners(task, starImg, expandImg) {
    addStarListener(task, starImg);
    //addExpandListener(task, expandImg);
}

// Important "star" checkbox event listener
function addStarListener(task, starImg) {

    starImg.addEventListener('change', () => {
        if (starImg.checked) {
            task.important = true;
        } else {
            task.important = false;
        }
    })
}

// Expand arrow button event listener 
function addExpandListener(task, expandImg) {

    expandImg.addEventListener('click', () => {
        // expand to show details
    })
}

export function addCheckEventListener(task, check) {
    const taskTitle = check.nextSibling;
    check.addEventListener('change', () => {
        if (check.checked) {
            taskTitle.classList.add('strike-out');
        } else {
            taskTitle.classList.remove('strike-out');
        }
    })
}
