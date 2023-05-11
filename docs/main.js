/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/MenuBar */ \"./src/modules/MenuBar.js\");\n\r\n/**Primary Module\r\n * imports other modules as needed to implement app functionality\r\n */\r\n\r\n// On first page load\r\n// Add event listeners to Menu items\r\n// Render 'All Tasks' Page\r\nwindow.addEventListener('load', () => {\r\n    _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addOnClicks();\r\n    _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"].miscellaneous[0].click();\r\n});\n\n//# sourceURL=webpack://todo-list-top/./src/index.js?");

/***/ }),

/***/ "./src/modules/MenuBar.js":
/*!********************************!*\
  !*** ./src/modules/MenuBar.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuBar)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/modules/projects.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/modules/render.js\");\n/* harmony import */ var _editProj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editProj */ \"./src/modules/editProj.js\");\n\r\n\r\n\r\n/**Menu Bar Module\r\n * contains everything that has to do with the side bar\r\n * adds event listeners for each menu item\r\n * calls the Project module to instantiate projects\r\n * holds list of projects to display under projects section \r\n * dynamically renders the project section DOM every project addition/deletion\r\n * calls DOM manipulation module to render each page selected\r\n */\r\n\r\n\r\n// Misc section nodes for use in MenuBar class\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst today = document.querySelector('.today');\r\nconst week = document.querySelector('.week');\r\nconst important = document.querySelector('.important');\r\nconst notes = document.querySelector('.notes');\r\n\r\n// Switches between \"add project div\" and \"add project form\"\r\nconst addProjectDiv = document.querySelector('.add-projects');\r\nconst projectForm = document.querySelector('.project-form');\r\nconst projectTitleInput = document.getElementById('project-title');\r\nconst cancelProjectBtn = document.getElementById('cancel-project');\r\n\r\nfunction switchProjectMode() {\r\n    addProjectDiv.classList.toggle('hidden');\r\n    projectForm.classList.toggle('hidden');\r\n    projectTitleInput.value = '';\r\n    projectTitleInput.focus();\r\n}\r\n\r\nconst projects = document.querySelector('.my-projects');\r\n\r\n// Creates DOM node for a project object passed in\r\nfunction createProjectDiv(project) {\r\n    const projectNode = document.createElement('div');\r\n    projectNode.classList.add('project-node');\r\n    projectNode.setAttribute('id', project.title);\r\n\r\n    const projImg = document.createElement('img');\r\n    projImg.src = './images/menu.png';\r\n    projImg.alt = 'project-menu-icon';\r\n    projImg.setAttribute('id', 'proj-img');\r\n\r\n    const h2 = document.createElement('h2');\r\n    h2.append(`${project.title}`)\r\n\r\n    const button = document.createElement('button');\r\n    button.setAttribute('type', 'button');\r\n    button.setAttribute('id', 'proj-settings')\r\n\r\n    const buttonImg = document.createElement('img');\r\n    buttonImg.src = './images/dots.png';\r\n    buttonImg.alt = 'more-settings';\r\n    buttonImg.setAttribute('id', 'project-settings');\r\n    \r\n    button.appendChild(buttonImg);\r\n    (0,_editProj__WEBPACK_IMPORTED_MODULE_2__.addEditProjectEvent)(button, project);     // calls function to switch proj tab to edit mode\r\n\r\n    projectNode.appendChild(projImg);\r\n    projectNode.appendChild(h2);\r\n    projectNode.appendChild(button);\r\n\r\n    addProjectListener(projectNode);\r\n    projectNode.click();\r\n    return projectNode;\r\n}\r\n\r\nfunction addProjectListener(project) {\r\n    project.addEventListener('click', () => {       // add onClick event listener to the project node created\r\n        project.classList.add('selected');\r\n        MenuBar.renderPage(project);\r\n\r\n        document.querySelectorAll('.project-node').forEach(x => {   // remove selected class from other projects\r\n            if (x !== project) {\r\n               x.classList.remove('selected');\r\n            }\r\n        })\r\n        MenuBar.removeOtherSelected(project);       // remove selected class from misc\r\n    })\r\n}\r\n\r\n// Menu Bar Class \r\nclass MenuBar {\r\n    \r\n    static miscellaneous = [allTasks, today, week, important, notes];\r\n\r\n    static addOnClicks() {\r\n        for (let section of MenuBar.miscellaneous) {    // misc section onClick events\r\n            section.addEventListener('click', () => {\r\n                section.classList.add('selected');      // add and remove class that highlights gray around active section\r\n                MenuBar.removeOtherSelected(section);\r\n                MenuBar.renderPage(section);            // dynamically render the section\r\n            });\r\n        }\r\n        addProjectDiv.addEventListener('click', switchProjectMode);      // \"Add Project\" div onClick events\r\n        cancelProjectBtn.addEventListener('click', switchProjectMode);\r\n\r\n        projectForm.addEventListener('submit', (e) => {             // add project form onSubmit event\r\n            // TODO: add func for constraint validation api logic\r\n            MenuBar.createProject();\r\n            e.preventDefault();\r\n            switchProjectMode();\r\n        });\r\n    }\r\n\r\n    static removeOtherSelected(section) {\r\n        for (let i of MenuBar.miscellaneous) {      // remove selected class from other\r\n            if (i !== section) {                    // sections in misc and projects\r\n                i.classList.remove('selected');;\r\n            }\r\n        }\r\n        document.querySelectorAll('.project-node').forEach(x => {\r\n            if (x !== section) {\r\n                x.classList.remove('selected');\r\n            }\r\n        })\r\n    }\r\n\r\n\r\n    static projects = [];\r\n\r\n    static createProject() {                            // Adds project to portfolio\r\n        const projectTitle = projectTitleInput.value;\r\n        const project = new _projects__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectTitle);\r\n        MenuBar.projects.push(project);\r\n        MenuBar.renderProjectSection();\r\n    }\r\n\r\n    static renderProjectSection() {                    // renders new project section w/ updated portfolio\r\n        projects.innerHTML = '';\r\n        for (let project of MenuBar.projects) {\r\n            projects.appendChild(createProjectDiv(project));\r\n        }\r\n    }\r\n\r\n    static renderPage(section) {\r\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render(section);\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list-top/./src/modules/MenuBar.js?");

/***/ }),

/***/ "./src/modules/editProj.js":
/*!*********************************!*\
  !*** ./src/modules/editProj.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addEditProjectEvent\": () => (/* binding */ addEditProjectEvent)\n/* harmony export */ });\n// Clears the project div selected and calls helper function\r\nfunction addEditProjectEvent(button, project) {\r\n    button.addEventListener('click', () => {\r\n        const projDiv = button.parentNode;\r\n        projDiv.innerHTML = '';\r\n        addEditProjBtns(project, projDiv);\r\n    })\r\n}\r\n\r\n// Adds new edit layout (3 btns) to projDiv\r\nfunction addEditProjBtns(project, projDiv) {\r\n    const edit = document.createElement('button');\r\n    edit.setAttribute('type', 'button');\r\n    edit.setAttribute('id', 'edit-proj');\r\n    edit.append('Edit');\r\n\r\n    const del = document.createElement('button');\r\n    del.setAttribute('type', 'button');\r\n    del.setAttribute('id', 'delete-proj');\r\n    del.append('Delete');\r\n\r\n    const cancel = document.createElement('button');\r\n    cancel.setAttribute('type', 'button');\r\n    cancel.setAttribute('id', 'cancel-proj-edit');\r\n    cancel.append('Cancel');\r\n\r\n    projDiv.appendChild(edit);\r\n    projDiv.appendChild(del);\r\n    projDiv.appendChild(cancel);\r\n    projDiv.classList.add('edit-menu');\r\n}\n\n//# sourceURL=webpack://todo-list-top/./src/modules/editProj.js?");

/***/ }),

/***/ "./src/modules/formsubmit.js":
/*!***********************************!*\
  !*** ./src/modules/formsubmit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addSubmitFormListener\": () => (/* binding */ addSubmitFormListener),\n/* harmony export */   \"createNoteForm\": () => (/* binding */ createNoteForm),\n/* harmony export */   \"createTaskForm\": () => (/* binding */ createTaskForm),\n/* harmony export */   \"resetForm\": () => (/* binding */ resetForm)\n/* harmony export */ });\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ \"./src/modules/tasks.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/modules/render.js\");\n/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBar */ \"./src/modules/MenuBar.js\");\n\r\n\r\n\r\n/** Logic for handling Add-Task and Add-Note form on submit events\r\n *  Takes in data from the form fields and instantiates an obj for it\r\n *  Renders the list of respective data \r\n */\r\n\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst notes = document.querySelector('.notes');\r\n\r\n// saved to call .click() method for closing form instead of \"submitting\"\r\nconst main = document.querySelector('.main');\r\n\r\nfunction addSubmitFormListener(page) {\r\n    const form = document.getElementsByClassName('add-form')[0];\r\n\r\n    form.addEventListener('submit', (e) => {\r\n        // Prevent page reload and \r\n        // save fields to FormData object and 'values' variable\r\n        e.preventDefault();\r\n        const formData = new FormData(form);\r\n        const values = [...formData.values()];\r\n\r\n        if (page === allTasks) {const task = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task(...values)}       // generate either new Task or\r\n        else {const note = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Note(...values)}                         // new note depending on page\r\n\r\n        main.click();\r\n        // dynamically render tasks from list\r\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render(page);\r\n    })\r\n}\r\n\r\n// Create Note Form\r\nfunction createNoteForm() {\r\n    const form = document.createElement('form');\r\n    form.classList.add('add-form', 'hidden');\r\n\r\n    const title = document.createElement('input');\r\n    title.setAttribute('type', 'text');\r\n    title.setAttribute('placeholder', 'Note');\r\n    title.setAttribute('name', 'note-title');\r\n    title.setAttribute('id', 'note-title');\r\n\r\n    const details = document.createElement('textarea');\r\n    details.setAttribute('name', 'note-details');\r\n    details.setAttribute('id', 'note-details');\r\n    details.setAttribute('cols', '20');\r\n    details.setAttribute('rows', '5');\r\n    details.setAttribute('placeholder', 'Details (Optional)')\r\n\r\n    const submitBtn = document.createElement('button');\r\n    submitBtn.setAttribute('id', 'submit-btn');\r\n    submitBtn.append('Submit');\r\n\r\n    form.appendChild(title);\r\n    form.appendChild(details);\r\n    form.appendChild(submitBtn);\r\n    return form;\r\n}\r\n\r\n// Add Task Form DOM Creation\r\nfunction createTaskForm() {\r\n    const form = document.createElement('form');            // create form\r\n    form.classList.add('add-form', 'hidden');\r\n\r\n    const nameLabel = document.createElement('label');      // label for task name\r\n    nameLabel.setAttribute('for', 'taskname');\r\n    nameLabel.append(`Task Title* : `);\r\n\r\n    const nameInput = document.createElement('input');      // task name input\r\n    nameInput.setAttribute('type', 'text');\r\n    nameInput.setAttribute('name', 'task');\r\n    nameInput.setAttribute('id', 'taskname');\r\n    nameInput.setAttribute('placeholder', 'Task');\r\n\r\n    const details = document.createElement('textarea');     // textarea for details\r\n    details.setAttribute('name', 'details');\r\n    details.setAttribute('id', 'details');\r\n    details.setAttribute('cols', '20');\r\n    details.setAttribute('rows', '5');\r\n    details.setAttribute('placeholder', 'Details (Optional)');\r\n\r\n    const dateLabel = document.createElement('label');          // due date label\r\n    dateLabel.setAttribute('for', 'duedate');\r\n    dateLabel.append('Due Date (Optional): ');\r\n\r\n    const dateInput = document.createElement('input');          // date input\r\n    dateInput.setAttribute('type', 'date');\r\n    dateInput.setAttribute('name', 'date');\r\n    dateInput.setAttribute('id', 'duedate');\r\n\r\n    const projectLabel = document.createElement('label');   // label for project select\r\n    projectLabel.setAttribute('for', 'project');\r\n    projectLabel.append('Choose a project (Optional): ');\r\n\r\n    const projectSelect = document.createElement('select');     // select element (dropdown list)\r\n    projectSelect.setAttribute('name', 'project');\r\n    projectSelect.setAttribute('id', 'project');\r\n\r\n    const noneOption = document.createElement('option');        // Auto select option that is for no association to a project\r\n    noneOption.setAttribute('value', 'none');\r\n    noneOption.append('-none-');\r\n    noneOption.selected = true;\r\n    projectSelect.appendChild(noneOption);\r\n    addProjectOptions(projectSelect);                           // add any projects if any to dropdown list\r\n\r\n    const submitBtn = document.createElement('button');         // submit button\r\n    submitBtn.setAttribute('id', 'submit-btn');\r\n    submitBtn.append('Submit');\r\n\r\n    form.appendChild(nameLabel);                        // append all elements created to form\r\n    form.appendChild(nameInput);\r\n    form.appendChild(details);\r\n    form.appendChild(dateLabel);\r\n    form.appendChild(dateInput);\r\n    form.appendChild(projectLabel);\r\n    form.appendChild(projectSelect);\r\n    form.appendChild(submitBtn);\r\n    return form;\r\n}\r\n\r\n// Adds all available projects as options for Project in task form\r\nfunction addProjectOptions(selectDiv) {\r\n    for (let project of _MenuBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"].projects) {\r\n        let option = document.createElement('option');\r\n        option.setAttribute('value', project.title);\r\n        option.append(project.title);\r\n        selectDiv.appendChild(option);\r\n    }\r\n}\r\n\r\nfunction resetForm(page) {\r\n    if (page === allTasks) {\r\n        document.getElementById('taskname').value = '';\r\n        document.getElementById('details').value = '';\r\n        document.getElementById('duedate').value = null;\r\n    } else if (page === notes) {\r\n        document.getElementById('note-title').value = '';\r\n        document.getElementById('note-details').value = '';\r\n    }\r\n} \n\n//# sourceURL=webpack://todo-list-top/./src/modules/formsubmit.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/**Project Module\r\n * similar to Task class \r\n * Instantiates a project w/ title\r\n * holds all tasks in an array\r\n */\r\n\r\nclass Project {\r\n    constructor(title) {\r\n        this.title = title;\r\n        this.tasks = [];\r\n    }\r\n\r\n    set title(title) {\r\n        this._title = title;\r\n    }\r\n    get title() {\r\n        return this._title;\r\n    }\r\n\r\n    addTask(task) {\r\n        this.tasks.push(task);\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list-top/./src/modules/projects.js?");

/***/ }),

/***/ "./src/modules/render.js":
/*!*******************************!*\
  !*** ./src/modules/render.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RenderPage)\n/* harmony export */ });\n/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ \"./src/modules/MenuBar.js\");\n/* harmony import */ var _formsubmit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formsubmit */ \"./src/modules/formsubmit.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ \"./src/modules/tasks.js\");\n/* harmony import */ var _taskEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskEvents */ \"./src/modules/taskEvents.js\");\n\r\n\r\n\r\n\r\n/**Render Module\r\n * is called by onclick listeners via MenuBar.renderPage method\r\n * dynamically renders the page selected in the .main section\r\n */\r\n\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst today = document.querySelector('.today');\r\nconst week = document.querySelector('.week');\r\nconst important = document.querySelector('.important');\r\nconst notes = document.querySelector('.notes');\r\n\r\n// Page Title DOM Creation\r\nfunction createPageTitle(page) {\r\n    const pageTitleDiv = document.createElement('div');\r\n    pageTitleDiv.classList.add('page-title');\r\n    \r\n    const pageTitle = document.createElement('h1');\r\n    switch (page) {                                 // variable title based on page being rendered\r\n        case allTasks:\r\n            pageTitle.append('All Tasks');\r\n            break;\r\n        case today:\r\n            pageTitle.append(\"Today's Tasks\");\r\n            break;\r\n        case week:\r\n            pageTitle.append(\"This Week's Tasks\");\r\n            break;\r\n        case important:\r\n            pageTitle.append(\"Important Tasks\");\r\n            break;\r\n        case notes:\r\n            pageTitle.append('My Notes');\r\n            break;\r\n        default:\r\n            pageTitle.append(page.id);        // append Project title if a project page is selected\r\n    }\r\n    pageTitleDiv.appendChild(pageTitle);\r\n    return pageTitleDiv;\r\n}\r\n\r\n// Add Task Div/Button DOM Creation\r\nfunction addTaskButton(page) {\r\n    const addTaskDiv = document.createElement('div');\r\n    addTaskDiv.classList.add('add-task');\r\n\r\n    const plusImg = document.createElement('img');\r\n    plusImg.src = \"./images/plus.png\";\r\n    plusImg.alt = 'plus-sign-icon';\r\n    plusImg.setAttribute('id', 'add-proj-main');\r\n    plusImg.setAttribute('width', '25');\r\n    plusImg.setAttribute('height', '25');\r\n\r\n    const addTaskH2 = document.createElement('h2');\r\n    if (page === allTasks) {\r\n        addTaskH2.append('Add Task');\r\n    } else if (page === notes) {\r\n        addTaskH2.append('Add Note');\r\n    }\r\n    \r\n    addTaskDiv.appendChild(plusImg);\r\n    addTaskDiv.appendChild(addTaskH2);\r\n    return addTaskDiv;\r\n}\r\n\r\n\r\n// Causes form to popup when add-task/note div clicked on \r\n// Different for Task and Notes pages\r\n// Async setTimeouts used to allow DOM to load the form before adding event listener for it\r\nfunction addTaskOnClick(btn, page) {\r\n    const form = document.getElementsByClassName('add-form')[0];\r\n    // Add-btn onclick event\r\n    btn.addEventListener('click', () => {\r\n        setTimeout(() => {\r\n            (0,_formsubmit__WEBPACK_IMPORTED_MODULE_1__.resetForm)(page);            // resets inputs when form is opened next time\r\n            form.classList.remove('hidden');\r\n            btn.classList.add('hidden');\r\n            (page === allTasks) ? document.getElementById('taskname').focus() : document.getElementById('note-title').focus();\r\n        }, 1)\r\n    })\r\n    // Clicking outside of form re-hides the form and unhides the add button\r\n    main.addEventListener('click', () => {\r\n        form.classList.add('hidden');\r\n        btn.classList.remove('hidden');\r\n    })\r\n    form.addEventListener('click', (event) => {\r\n        event.stopPropagation();\r\n    })\r\n}\r\n\r\n// Creates Div to store and render\r\n// the tasks w/ respect to the page\r\n// Works for Notes on note page as well\r\nfunction createTaskNode(task_note) {\r\n    const taskDiv = document.createElement('div');\r\n    taskDiv.setAttribute('id', 'task-section');\r\n\r\n    taskDiv.appendChild(createLeftDiv(task_note));\r\n    taskDiv.appendChild(createRightDiv(task_note));\r\n    return taskDiv;\r\n}\r\n\r\n// Creates left div with checkbox and task title\r\nfunction createLeftDiv(task_note) {\r\n    const leftDiv = document.createElement('div');\r\n    leftDiv.setAttribute('id', 'task-left');\r\n\r\n    if (task_note instanceof _tasks__WEBPACK_IMPORTED_MODULE_2__.Task) {\r\n        const check = document.createElement('input');\r\n        check.setAttribute('type', 'checkbox');\r\n        check.setAttribute('id', 'task-check');\r\n        leftDiv.appendChild(check);\r\n        (0,_taskEvents__WEBPACK_IMPORTED_MODULE_3__.addCheckEventListener)(check);\r\n    }\r\n\r\n    const taskTitle = document.createElement('h2');\r\n    taskTitle.setAttribute('id', 'task-title');\r\n    taskTitle.append(task_note.title);\r\n    leftDiv.appendChild(taskTitle);\r\n\r\n    return leftDiv;\r\n}\r\n// Creates right div with important star and \"more\" button/icon\r\nfunction createRightDiv(task_note) {\r\n    const rightDiv = document.createElement('div');\r\n    rightDiv.setAttribute('id', 'task-right');\r\n\r\n    if (task_note.date) {                                            // due date\r\n        const dueDate = document.createElement('h2');           // format 'yyyy-mm-dd' into 'MMM-dd-yyyy'\r\n        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\r\n        const dateArray = task_note.date.split('-');\r\n        const formattedDate = `${months[parseInt(dateArray[1])-1]}-${dateArray[2]}-${dateArray[0]}`;\r\n        dueDate.append(formattedDate);\r\n        rightDiv.append(dueDate);\r\n    } \r\n\r\n    const star = document.createElement('input');       // important checkbox\r\n    star.setAttribute('type', 'checkbox');\r\n    star.setAttribute('id', 'important');\r\n    if (task_note.important) {\r\n        star.checked = true;\r\n    }\r\n    rightDiv.appendChild(star);\r\n\r\n    const moreTab = document.createElement('button');       // button to expand task\r\n    moreTab.setAttribute('type', 'button');\r\n    moreTab.setAttribute('id', 'task-details');\r\n    const moreImg = document.createElement('img');          // append expand icon into button\r\n    moreImg.src = './images/expand-button.png';\r\n    moreImg.alt = 'expand-details';\r\n    moreImg.setAttribute('id', 'expand-btn');\r\n    moreTab.appendChild(moreImg);\r\n    rightDiv.appendChild(moreTab);\r\n\r\n    (0,_taskEvents__WEBPACK_IMPORTED_MODULE_3__.addRightDivListeners)(task_note, star, moreTab);        // add event listeners to star checkbox and expand tab\r\n    return rightDiv;                                  // using corresponding task instance\r\n}\r\n\r\nconst main = document.querySelector('.main');\r\n\r\nclass RenderPage {\r\n    // Renders the page itself inside div.main\r\n    static render(page) {\r\n        RenderPage.resetDOM();                                  // clear main of all children, then\r\n        main.appendChild(createPageTitle(page));               // add page title/header\r\n        if (page === allTasks) {\r\n            main.appendChild((0,_formsubmit__WEBPACK_IMPORTED_MODULE_1__.createTaskForm)());              // if All Tasks page create and append task form\r\n        } else if (page === notes) {                        \r\n            main.appendChild((0,_formsubmit__WEBPACK_IMPORTED_MODULE_1__.createNoteForm)());             // else if Notes page, create and append notes form\r\n        }\r\n        if (page === allTasks || page === notes) {          // Then add the \"add task/note\" button and eventlistener \r\n            main.appendChild(addTaskButton(page));\r\n            const addBtn = document.querySelector('.add-task');\r\n            addTaskOnClick(addBtn, page);\r\n            (0,_formsubmit__WEBPACK_IMPORTED_MODULE_1__.addSubmitFormListener)(page);                 // add the event listener for submit form\r\n        }\r\n        RenderPage.renderTasks();                     // render all tasks for the page\r\n    }\r\n\r\n    // Renders tasklist inside div.task-section\r\n    static renderTasks() {\r\n        setTimeout(() => {\r\n            const page = document.getElementsByClassName('selected')[0];    // retrieve the currently selected page\r\n            switch (page) {\r\n                case allTasks:                          // add task div to div.main\r\n                    for (let task of _tasks__WEBPACK_IMPORTED_MODULE_2__.Task.taskList) { main.appendChild(createTaskNode(task)) };\r\n                    break;\r\n                case today:                             // add task div if due date is today\r\n                    const todaysDate = getTodaysDate();\r\n                    for (let task of _tasks__WEBPACK_IMPORTED_MODULE_2__.Task.taskList) {\r\n                        if (todaysDate === task.date) { main.appendChild(createTaskNode(task)) };\r\n                    }\r\n                    break;\r\n                case week:                             // add task div if due date is due between today - end of week\r\n                    const startDate = new Date();\r\n                    const endDate = new Date(getEndOfWeek());\r\n                    for (let task of _tasks__WEBPACK_IMPORTED_MODULE_2__.Task.taskList) {\r\n                        const dateArr = task.date.split('-');               // format properly before\r\n                        dateArr[2] = parseInt(dateArr[2]).toString();       // converting into date object\r\n                        const taskDate = new Date(dateArr.join('-'));       // and checking if within range\r\n                        if (taskDate >= startDate && taskDate <= endDate || task.date === getTodaysDate()) { main.appendChild(createTaskNode(task)) }; \r\n                    }\r\n                    break;\r\n                case important:                         // add task if it is starred\r\n                    for (let task of _tasks__WEBPACK_IMPORTED_MODULE_2__.Task.taskList) {\r\n                        if (task.important) { main.appendChild(createTaskNode(task)) };\r\n                    }\r\n                    break;\r\n                case notes:                             // add all notes in noteList\r\n                    for (let note of _tasks__WEBPACK_IMPORTED_MODULE_2__.Note.noteList) { main.appendChild(createTaskNode(note)) };\r\n                    break;\r\n                default:                                // add project-specific tasks to respective project page \r\n                    const projectName = page.id;\r\n                    for (let task of _tasks__WEBPACK_IMPORTED_MODULE_2__.Task.taskList) {\r\n                        if (task.project === projectName) { main.appendChild(createTaskNode(task)) }; \r\n                    }\r\n            }\r\n        }, 1);\r\n    }   \r\n\r\n    static resetDOM() {\r\n        main.innerHTML = '';\r\n    }\r\n}\r\n\r\n\r\n// Returns Today's Date as a string\r\n// Used to check equivalency for task due dates\r\n// Used in rendering the \"Today\" page\r\nfunction getTodaysDate() {\r\n    const today = new Date();\r\n    const year = today.getFullYear();\r\n    const month = (today.getMonth() + 1).toString().padStart(2, '0');     // getMonth is 0 indexed so add 1 and convert to string with 2 digits\r\n    const day = today.getDate().toString().padStart(2, '0');\r\n\r\n    const formatted = `${year}-${month}-${day}`;\r\n    return formatted; \r\n}\r\n\r\n// Returns the end of the week\r\n// Used to get range of dates used for \"This Week\" page\r\nfunction getEndOfWeek() {\r\n    const endOfWeek = new Date();\r\n    endOfWeek.setDate(endOfWeek.getDate() + 6);\r\n    // format to string \r\n    const year = endOfWeek.getFullYear();\r\n    const month = (endOfWeek.getMonth() + 1).toString().padStart(2, '0');\r\n    const day = endOfWeek.getDate().toString();\r\n\r\n    const formatted = `${year}-${month}-${day}`;\r\n    return formatted;\r\n}   \n\n//# sourceURL=webpack://todo-list-top/./src/modules/render.js?");

/***/ }),

/***/ "./src/modules/taskEvents.js":
/*!***********************************!*\
  !*** ./src/modules/taskEvents.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addCheckEventListener\": () => (/* binding */ addCheckEventListener),\n/* harmony export */   \"addRightDivListeners\": () => (/* binding */ addRightDivListeners)\n/* harmony export */ });\n/** Module to hold all event listeners\r\n *  dealing with the rendered Task in DOM\r\n */\r\n\r\nfunction addRightDivListeners(task, starImg, expandImg) {\r\n    addStarListener(task, starImg);\r\n    //addExpandListener(task, expandImg);\r\n}\r\n\r\n// Important \"star\" checkbox event listener\r\n// click page tab after to reset with updated tasks\r\nfunction addStarListener(task, starImg) {\r\n    const page = document.getElementsByClassName('selected')[0];\r\n\r\n    starImg.addEventListener('change', () => {\r\n        if (starImg.checked) {\r\n            task.important = true;\r\n        } else {\r\n            task.important = false;\r\n        }\r\n        page.click();\r\n    })\r\n}\r\n\r\n// Expand arrow button event listener \r\nfunction addExpandListener(task, expandImg) {\r\n\r\n    expandImg.addEventListener('click', () => {\r\n        // expand to show details\r\n    })\r\n}\r\n\r\nfunction addCheckEventListener(check) {\r\n    const taskTitle = check.nextSibling;\r\n    check.addEventListener('change', () => {\r\n        if (check.checked) {\r\n            taskTitle.classList.add('strike-out');\r\n        } else {\r\n            taskTitle.classList.remove('strike-out');\r\n        }\r\n    })\r\n}\r\n\r\n\n\n//# sourceURL=webpack://todo-list-top/./src/modules/taskEvents.js?");

/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Note\": () => (/* binding */ Note),\n/* harmony export */   \"Task\": () => (/* binding */ Task)\n/* harmony export */ });\n/**Task Module \r\n * implements task generation via Task class\r\n * implements note generation via Note class\r\n * feeds to the DOM manipulation module to \r\n * generate the pages in the web app  \r\n*/\r\n\r\nclass Task {\r\n    constructor(title, detail, date, project) {\r\n        this.title = title;\r\n        this.detail = detail;\r\n        this.date = date;\r\n        this.important = false;\r\n        this.project = project;\r\n\r\n        // Add newly created instance to tasks static array\r\n        Task.taskList.push(this);\r\n    }\r\n\r\n    // Array holding all task objects\r\n    static taskList = [];\r\n\r\n    // Getters and Setters\r\n    set title(title) {              // Title\r\n        this._title = title;\r\n    }\r\n    get title() {\r\n        return this._title;\r\n    }\r\n\r\n    set detail(detail) {            // Details\r\n        this._detail = detail;\r\n    }\r\n    get detail() {\r\n        return this._detail;\r\n    }\r\n\r\n    set date(date) {                                        // Date\r\n        this._date = date;\r\n    }\r\n    get date() {\r\n        return this._date;\r\n    }\r\n\r\n    set important(important) {          // important\r\n        this._important = important;\r\n    }\r\n    get important() {\r\n        return this._important;\r\n    }\r\n\r\n    set project(project) {          // Project \r\n        this._project = project;\r\n    }\r\n    get project() {\r\n        return this._project;\r\n    }\r\n};\r\n\r\nclass Note {\r\n    constructor(title, detail) {\r\n        this.title = title;\r\n        this.detail = detail;\r\n\r\n        // Add newly created instance to notes static array\r\n        Note.noteList.push(this);\r\n    }\r\n\r\n    // Array holding all note objects\r\n    static noteList = [];\r\n\r\n    // Getters and Setters\r\n    set title(title) {              // Title\r\n        this._title = title;\r\n    }\r\n    get title() {\r\n        return this._title;\r\n    }\r\n\r\n    set detail(detail) {            // Details\r\n        this._detail = detail;\r\n    }\r\n    get detail() {\r\n        return this._detail;\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list-top/./src/modules/tasks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;