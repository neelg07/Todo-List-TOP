/**Menu Bar Module
 * add event listeners for each menu item
 * holds list of projects to display under projects
 * calls DOM manipulation module to render each page
 */

const allTasks = document.querySelector('.all-tasks');
const today = document.querySelector('.today');
const week = document.querySelector('.week');
const important = document.querySelector('.important');
const notes = document.querySelector('.notes');

// Switches between "add project div" and "add project form"
const addProjectDiv = document.querySelector('.add-projects');
const projectForm = document.querySelector('.project-form');
const projectTitleInput = document.getElementById('project-title');
const cancelProjectBtn = document.getElementById('cancel-project');

function switchProjectMode() {
    addProjectDiv.classList.toggle('hidden');
    projectForm.classList.toggle('hidden');
    projectTitleInput.focus();
}

function submitProjectForm(event) {
    // TODO: logic to check constraint validation api
    // if input is valid, continue w/ form submission

    event.preventDefault();
    switchProjectMode();
}

// Menu Bar Class 
export default class MenuBar {
    
    static miscellaneous = [allTasks, today, week, important, notes];

    static addOnClicks() {
        for (let section of MenuBar.miscellaneous) {    // misc section onClick events
            section.addEventListener('click', () => {
                section.classList.add('selected');
                MenuBar.removeOtherSelected(section);
                MenuBar.renderPage(section);
            });
        }
        addProjectDiv.addEventListener('click', switchProjectMode);      // Add Project section onClick events
        cancelProjectBtn.addEventListener('click', switchProjectMode);
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            switchProjectMode();
        });
    }

    static removeOtherSelected(section) {
        for (let i of MenuBar.miscellaneous) {
            if (i === section) {
                continue;
            }
            i.classList.remove('selected');
        }
    }

    static renderPage(section) {
        console.log('rendering: ', section); // implement render page logic later
    }
};