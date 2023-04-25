/**Task Module 
 * implements task generation via Task class
 * feeds to the DOM manipulation module to 
 * generate the pages in the web app  
*/

export default class Task {
    constructor(title, detail, date, project) {
        this.title = title;
        this.detail = detail;
        this.date = date;
        this.important = false;
        this.project = project;

        // Add newly created instance to tasks static array
        Task.taskList.push(this);
        console.log(Task.tasks);
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

    set date(date) {                // Date
        this._date = date;
    }
    get date() {
        return this._date;
    }

    set project(project) {          // Project 
        this._project = project;
    }
    get project() {
        return this._project;
    }
};