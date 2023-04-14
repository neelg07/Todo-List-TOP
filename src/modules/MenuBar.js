import Project from "./projects";
/**Menu Bar Module
 * add event listeners for each menu item
 * calls the Project module to instantiate projects
 * holds list of projects to display under projects section 
 * dynamically renders the project section DOM every project addition/deletion
 * calls DOM manipulation module to render each page selected
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

const projects = document.querySelector('.my-projects');

// Creates DOM node for a project object passed in
function createProjectDiv(project) {
    const projectNode = document.createElement('div');
    projectNode.classList.add('project-node');

    const projImg = document.createElement('img');
    projImg.src = './images/menu.png';
    projImg.alt = 'project-menu-icon';
    projImg.setAttribute('id', 'proj-img');

    const h2 = document.createElement('h2');
    h2.append(`${project.title}`)

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'proj-settings')

    const buttonImg = document.createElement('img');
    buttonImg.src = './images/dots.png';
    buttonImg.alt = 'more-settings';
    buttonImg.setAttribute('id', 'project-settings');
    
    button.appendChild(buttonImg);

    projectNode.appendChild(projImg);
    projectNode.appendChild(h2);
    projectNode.appendChild(button);

    addProjectListener(projectNode);
    return projectNode;
}

function addProjectListener(project) {
    project.addEventListener('click', () => {       // add onClick event listener to the project node created
        project.classList.add('selected');
        MenuBar.renderPage(project);

        document.querySelectorAll('.project-node').forEach(x => {   // remove selected class from other projects
            if (x !== project) {
               x.classList.remove('selected');
            }
        })
        MenuBar.removeOtherSelected(project);       // remove selected class from misc 
    })
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
            if (i !== section) {                    // sections in misc and projects
                i.classList.remove('selected');;
            }
        }
        document.querySelectorAll('.project-node').forEach(x => {
            if (x !== section) {
                x.classList.remove('selected');
            }
        })
    }


    static projects = [];

    static createProject() {                            // Adds project to portfolio
        const projectTitle = projectTitleInput.value;
        const project = new Project(projectTitle);
        MenuBar.projects.push(project);
        MenuBar.renderProjectSection();
    }

    static renderProjectSection() {                    // renders new project section w/ updated portfolio
        projects.innerHTML = '';
        for (let project of MenuBar.projects) {
            projects.appendChild(createProjectDiv(project));
        }
    }

    static renderPage(section) {
        console.log('rendering: ', section); // implement render page logic later
    }
};