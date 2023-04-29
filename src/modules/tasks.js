/**Task Module 
 * implements task generation via Task class
 * feeds to the DOM manipulation module to 
 * generate the pages in the web app  
*/

import { isExists } from "date-fns";

export default class Task {
    constructor(title, detail, date, project) {
        this.title = title;
        this.detail = detail;
        this.date = date;
        this.important = false;
        this.project = project;

        // Add newly created instance to tasks static array
        Task.taskList.push(this);
    }

    // Array holding all task objects
    static taskList = [];

    // Getters and Setters
    set title(title) {              // Title
        this._title = title;
    }
    get title() {
        return this._title;
    }

    set detail(detail) {            // Details
        this._detail = detail;
    }
    get detail() {
        return this._detail;
    }

    set date(date) {                                        // Date
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (date) {
            const dateArray = date.split('-');
            this._date = `${months[parseInt(dateArray[1])-1]}-${dateArray[2]}-${dateArray[0]}`;
        } else {
            this._date = "";
        }
        console.log(this.date);
    }
    get date() {
        return this._date;
    }

    set important(important) {          // important
        this._important = important;
    }
    get important() {
        return this._important;
    }

    set project(project) {          // Project 
        this._project = project;
    }
    get project() {
        return this._project;
    }
};