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
        // Add 1 to dd value to correct the date input
        let dateArray = date.split('-');
        let corrected = parseInt(dateArray[2]) + 1;
        let correctedDate = `${dateArray[0]}-${dateArray[1]}-${corrected.toString()}`;
        // Normalize date input by setting to UTC - 00:00:00 time
        const myDate = new Date(correctedDate);
        myDate.setUTCHours(0, 0, 0);
        this._date = myDate;
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