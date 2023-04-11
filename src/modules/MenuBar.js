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

class MenuBar {
    static miscellaneous = [allTasks, today, week, important, notes];

    static addOnClicks() {
        for (let item of MenuBar.miscellaneous) {
            item.addEventListener('click', () => {
                item.classList.add('selected');
                MenuBar.removeOtherSelected(item);
            });
        }
    }

    static removeOtherSelected(item) {
        for (let i of MenuBar.miscellaneous) {
            if (i === item) {
                continue;
            }
            i.classList.remove('selected');
        }
    }
}