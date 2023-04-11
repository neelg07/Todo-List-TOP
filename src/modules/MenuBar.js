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

export default class MenuBar {
    
    static miscellaneous = [allTasks, today, week, important, notes];

    static addOnClicks() {
        for (let section of MenuBar.miscellaneous) {
            section.addEventListener('click', () => {
                section.classList.add('selected');
                MenuBar.removeOtherSelected(section);
                MenuBar.renderPage(section);
            });
        }
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
        console.log('rendering: ', section); // implement render logic later
    }
};