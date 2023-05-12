/**Task Module 
 * implements task generation via Task class
 * implements note generation via Note class
 * feeds to the DOM manipulation module to 
 * generate the pages in the web app  
*/

export class Task {
    constructor(title, detail, date, project) {
        this.title = title;
        this.detail = detail;
        this.date = date;
        this.important = false;
        this.complete = false;
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

    set date(date) {                  // Date
        this._date = date;
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

    set complete(complete) {        // Complete? 
        this._complete = complete;
    }
    get complete() {
        return this._complete;
    }

    set project(project) {          // Project 
        this._project = project;
    }
    get project() {
        return this._project;
    }
};

export class Note {
    constructor(title, detail) {
        this.title = title;
        this.detail = detail;
        this.complete = false;

        // Add newly created instance to notes static array
        Note.noteList.push(this);
    }

    // Array holding all note objects
    static noteList = [];

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

    set complete(complete) {        // Complete? 
        this._complete = complete;
    }
    get complete() {
        return this._complete;
    }
}