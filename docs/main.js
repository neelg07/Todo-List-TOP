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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/MenuBar */ \"./src/modules/MenuBar.js\");\n\r\n/**Primary Module\r\n * imports other modules as needed to implement app functionality\r\n */\r\n\r\n// On first page load\r\n// Add event listeners to Menu items\r\nwindow.addEventListener('load', () => {\r\n    _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addOnClicks();\r\n});\n\n//# sourceURL=webpack://todo-list-top/./src/index.js?");

/***/ }),

/***/ "./src/modules/MenuBar.js":
/*!********************************!*\
  !*** ./src/modules/MenuBar.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuBar)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/modules/projects.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/modules/render.js\");\n\r\n\r\n/**Menu Bar Module\r\n * contains everything that has to do with the side bar\r\n * adds event listeners for each menu item\r\n * calls the Project module to instantiate projects\r\n * holds list of projects to display under projects section \r\n * dynamically renders the project section DOM every project addition/deletion\r\n * calls DOM manipulation module to render each page selected\r\n */\r\n\r\n\r\n// Misc section nodes for use in MenuBar class\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst today = document.querySelector('.today');\r\nconst week = document.querySelector('.week');\r\nconst important = document.querySelector('.important');\r\nconst notes = document.querySelector('.notes');\r\n\r\n// Switches between \"add project div\" and \"add project form\"\r\nconst addProjectDiv = document.querySelector('.add-projects');\r\nconst projectForm = document.querySelector('.project-form');\r\nconst projectTitleInput = document.getElementById('project-title');\r\nconst cancelProjectBtn = document.getElementById('cancel-project');\r\n\r\nfunction switchProjectMode() {\r\n    addProjectDiv.classList.toggle('hidden');\r\n    projectForm.classList.toggle('hidden');\r\n    projectTitleInput.value = '';\r\n    projectTitleInput.focus();\r\n}\r\n\r\nconst projects = document.querySelector('.my-projects');\r\n\r\n// Creates DOM node for a project object passed in\r\nfunction createProjectDiv(project) {\r\n    const projectNode = document.createElement('div');\r\n    projectNode.classList.add('project-node');\r\n    projectNode.setAttribute('id', project.title);\r\n\r\n    const projImg = document.createElement('img');\r\n    projImg.src = './images/menu.png';\r\n    projImg.alt = 'project-menu-icon';\r\n    projImg.setAttribute('id', 'proj-img');\r\n\r\n    const h2 = document.createElement('h2');\r\n    h2.append(`${project.title}`)\r\n\r\n    const button = document.createElement('button');\r\n    button.setAttribute('type', 'button');\r\n    button.setAttribute('id', 'proj-settings')\r\n\r\n    const buttonImg = document.createElement('img');\r\n    buttonImg.src = './images/dots.png';\r\n    buttonImg.alt = 'more-settings';\r\n    buttonImg.setAttribute('id', 'project-settings');\r\n    \r\n    button.appendChild(buttonImg);\r\n\r\n    projectNode.appendChild(projImg);\r\n    projectNode.appendChild(h2);\r\n    projectNode.appendChild(button);\r\n\r\n    addProjectListener(projectNode);\r\n    projectNode.click();\r\n    return projectNode;\r\n}\r\n\r\nfunction addProjectListener(project) {\r\n    project.addEventListener('click', () => {       // add onClick event listener to the project node created\r\n        project.classList.add('selected');\r\n        MenuBar.renderPage(project);\r\n\r\n        document.querySelectorAll('.project-node').forEach(x => {   // remove selected class from other projects\r\n            if (x !== project) {\r\n               x.classList.remove('selected');\r\n            }\r\n        })\r\n        MenuBar.removeOtherSelected(project);       // remove selected class from misc\r\n    })\r\n}\r\n\r\n// Menu Bar Class \r\nclass MenuBar {\r\n    \r\n    static miscellaneous = [allTasks, today, week, important, notes];\r\n\r\n    static addOnClicks() {\r\n        for (let section of MenuBar.miscellaneous) {    // misc section onClick events\r\n            section.addEventListener('click', () => {\r\n                section.classList.add('selected');      // add and remove class that highlights gray around active section\r\n                MenuBar.removeOtherSelected(section);\r\n                MenuBar.renderPage(section);            // dynamically render the section\r\n            });\r\n        }\r\n        addProjectDiv.addEventListener('click', switchProjectMode);      // \"Add Project\" div onClick events\r\n        cancelProjectBtn.addEventListener('click', switchProjectMode);\r\n\r\n        projectForm.addEventListener('submit', (e) => {             // add project form onSubmit event\r\n            // TODO: add func for constraint validation api logic\r\n            MenuBar.createProject();\r\n            e.preventDefault();\r\n            switchProjectMode();\r\n        });\r\n    }\r\n\r\n    static removeOtherSelected(section) {\r\n        for (let i of MenuBar.miscellaneous) {      // remove selected class from other\r\n            if (i !== section) {                    // sections in misc and projects\r\n                i.classList.remove('selected');;\r\n            }\r\n        }\r\n        document.querySelectorAll('.project-node').forEach(x => {\r\n            if (x !== section) {\r\n                x.classList.remove('selected');\r\n            }\r\n        })\r\n    }\r\n\r\n\r\n    static projects = [];\r\n\r\n    static createProject() {                            // Adds project to portfolio\r\n        const projectTitle = projectTitleInput.value;\r\n        const project = new _projects__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectTitle);\r\n        MenuBar.projects.push(project);\r\n        MenuBar.renderProjectSection();\r\n    }\r\n\r\n    static renderProjectSection() {                    // renders new project section w/ updated portfolio\r\n        projects.innerHTML = '';\r\n        for (let project of MenuBar.projects) {\r\n            projects.appendChild(createProjectDiv(project));\r\n        }\r\n    }\r\n\r\n    static renderPage(section) {\r\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render(section);\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list-top/./src/modules/MenuBar.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RenderPage)\n/* harmony export */ });\n/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ \"./src/modules/MenuBar.js\");\n\r\n/**Render Module\r\n * is called by onclick listeners via MenuBar.renderPage method\r\n * dynamically renders the page selected in the .main section\r\n */\r\n\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst today = document.querySelector('.today');\r\nconst week = document.querySelector('.week');\r\nconst important = document.querySelector('.important');\r\nconst notes = document.querySelector('.notes');\r\n\r\n// Page Title DOM Creation\r\nfunction createPageTitle(page) {\r\n    const pageTitleDiv = document.createElement('div');\r\n    pageTitleDiv.classList.add('page-title');\r\n    \r\n    const pageTitle = document.createElement('h1');\r\n    switch (page) {                                 // variable title based on page being rendered\r\n        case allTasks:\r\n            pageTitle.append('All Tasks');\r\n            break;\r\n        case today:\r\n            pageTitle.append(\"Today's Tasks\");\r\n            break;\r\n        case week:\r\n            pageTitle.append(\"This Week's Tasks\");\r\n            break;\r\n        case important:\r\n            pageTitle.append(\"Important!\");\r\n            break;\r\n        case notes:\r\n            pageTitle.append('My Notes');\r\n            break;\r\n        default:\r\n            pageTitle.append(`${page.title}`);      // Project title if project page is selected\r\n    }\r\n    pageTitleDiv.appendChild(pageTitle);\r\n    return pageTitleDiv;\r\n}\r\n\r\n// Add Task Div/Button DOM Creation\r\nfunction addTaskButton() {\r\n    const addTaskDiv = document.createElement('div');\r\n    addTaskDiv.classList.add('add-task');\r\n\r\n    const plusImg = document.createElement('img');\r\n    plusImg.src = \"./images/plus.png\";\r\n    plusImg.alt = 'plus-sign-icon';\r\n    plusImg.setAttribute('id', 'add-proj-main');\r\n    plusImg.setAttribute('width', '25');\r\n    plusImg.setAttribute('height', '25');\r\n\r\n    const addTaskH2 = document.createElement('h2');\r\n    addTaskH2.append('Add Task');\r\n\r\n    addTaskDiv.appendChild(plusImg);\r\n    addTaskDiv.appendChild(addTaskH2);\r\n    return addTaskDiv;\r\n}\r\n\r\n// Add Task Form DOM Creation\r\nfunction createTaskForm() {\r\n    const form = document.createElement('form');\r\n    form.classList.add('add-task-form');\r\n\r\n    const nameLabel = document.createElement('label');\r\n    nameLabel.setAttribute('for', 'taskname');\r\n    const requireSpan = document.createElement('span');\r\n    requireSpan.setAttribute('aria-label', 'required');\r\n    requireSpan.append('*');\r\n    nameLabel.append(`Task Title: ${requireSpan}`);\r\n\r\n    const nameInput = document.createElement('input');\r\n    nameInput.setAttribute('type', 'text');\r\n    nameInput.setAttribute('name', 'task');\r\n    nameInput.setAttribute('id', 'taskname');\r\n    nameInput.setAttribute('placeholder', 'Task');\r\n\r\n    const details = document.createElement('textarea');\r\n    details.setAttribute('name', 'details');\r\n    details.setAttribute('id', 'details');\r\n    details.setAttribute('cols', '20');\r\n    details.setAttribute('rows', '5');\r\n    details.setAttribute('placeholder', 'Optional Details');\r\n\r\n    const dateLabel = document.createElement('label');\r\n    dateLabel.setAttribute('for', 'duedate');\r\n    dateLabel.append('Due Date (Optional): ');\r\n\r\n    const dateInput = document.createElement('input');\r\n    dateInput.setAttribute('type', 'date');\r\n    dateInput.setAttribute('name', 'date');\r\n    dateInput.setAttribute('id', 'duedate');\r\n\r\n    const projectLabel = document.createElement('label');\r\n    projectLabel.setAttribute('for', 'project');\r\n    projectLabel.append('Choose a project (Optional): ');\r\n\r\n    const projectSelect = document.createElement('select');\r\n    projectSelect.setAttribute('name', 'project');\r\n    projectSelect.setAttribute('id', 'project');\r\n\r\n    form.appendChild(nameLabel);\r\n    form.appendChild(nameInput);\r\n    form.appendChild(details);\r\n    form.appendChild(dateLabel);\r\n    form.appendChild(dateInput);\r\n    form.appendChild(projectLabel);\r\n    form.appendChild(projectSelect);\r\n    return form;\r\n}\r\n\r\nconst main = document.querySelector('.main');\r\n\r\nclass RenderPage {\r\n\r\n    static render(page) {\r\n        RenderPage.resetDOM();\r\n        main.appendChild(createPageTitle(page));               // add specific page title\r\n        if (page === allTasks) {\r\n            main.appendChild(addTaskButton());              // if All Tasks page, add the add-task btn and task form\r\n            main.appendChild(createTaskForm());\r\n        }\r\n    }\r\n\r\n    static resetDOM() {\r\n        main.innerHTML = '';\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list-top/./src/modules/render.js?");

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