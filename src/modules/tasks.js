/**Task Module 
 * implements task generation via Task class
 * feeds to the DOM manipulation module to 
 * generate the pages in the web app  
*/

class Task {
    constructor(title, detail, date) {
        this.title = title;
        this.detail = detail;
        this.date = date;
        this.important = false;
    }

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
}