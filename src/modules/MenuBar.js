import Project from "./projects";
/**Menu Bar Module
 * add event listeners for each menu item
 * holds list of projects to display under projects
 * calls DOM manipulation module to render each page
 * calls Project module to add projects to sidebar
 */

// Misc section nodes for use in MenuBar class
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
    projectTitleInput.value = '';
    projectTitleInput.focus();
}

// Menu Bar Class 
export default class MenuBar {
    
    static miscellaneous = [allTasks, today, week, important, notes];

    static addOnClicks() {
        for (let section of MenuBar.miscellaneous) {    // misc section onClick events
            section.addEventListener('click', () => {
                section.classList.add('selected');      // add and remove class that highlights gray around active section
                MenuBar.removeOtherSelected(section);
                MenuBar.renderPage(section);            // dynamically render the section
            });
        }
        addProjectDiv.addEventListener('click', switchProjectMode);      // "Add Project" div onClick events
        cancelProjectBtn.addEventListener('click', switchProjectMode);

        projectForm.addEventListener('submit', (e) => {             // add project form onSubmit event
            // TODO: add func for constraint validation api logic
            MenuBar.createProject();
            e.preventDefault();
            switchProjectMode();
        });
    }

    static removeOtherSelected(section) {
        for (let i of MenuBar.miscellaneous) {      // remove selected class from other
            if (i !== section) {                    // sections in misc
                i.classList.remove('selected');;
            }
        }
    }

    static projects = [];

    static createProject() {                            // Adds project to portfolio
        let projectTitle = projectTitleInput.value;
        MenuBar.projects.push(new Project(projectTitle));
    }

    static renderProjectSection() {                    // renders new project section with updated portfolio
        
    }

    static renderPage(section) {
        console.log('rendering: ', section); // implement render page logic later
    }
};