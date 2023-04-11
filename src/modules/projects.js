/**Project Module
 * similar to Task class 
 * Instantiates a project w/ title
 * holds all tasks in an array
 */

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }

    addTask(task) {
        this.tasks.push(task);
    }
};