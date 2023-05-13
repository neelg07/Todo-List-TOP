/**Project Module
 * similar to Task class 
 * Instantiates a project w/ title
 * holds all tasks in an array
 */

export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];

        // add new instance into static array of projects
        Project.projectList.push(this);
    }

    // Array holding all Project objects
    static projectList = [];

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