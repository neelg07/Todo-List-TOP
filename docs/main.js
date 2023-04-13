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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuBar)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/modules/projects.js\");\n\r\n/**Menu Bar Module\r\n * add event listeners for each menu item\r\n * calls the Project module to instantiate projects\r\n * holds list of projects to display under projects section \r\n * dynamically renders the project section DOM every project addition/deletion\r\n * calls DOM manipulation module to render each page selected\r\n */\r\n\r\n\r\n// Misc section nodes for use in MenuBar class\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst today = document.querySelector('.today');\r\nconst week = document.querySelector('.week');\r\nconst important = document.querySelector('.important');\r\nconst notes = document.querySelector('.notes');\r\n\r\n// Switches between \"add project div\" and \"add project form\"\r\nconst addProjectDiv = document.querySelector('.add-projects');\r\nconst projectForm = document.querySelector('.project-form');\r\nconst projectTitleInput = document.getElementById('project-title');\r\nconst cancelProjectBtn = document.getElementById('cancel-project');\r\n\r\nfunction switchProjectMode() {\r\n    addProjectDiv.classList.toggle('hidden');\r\n    projectForm.classList.toggle('hidden');\r\n    projectTitleInput.value = '';\r\n    projectTitleInput.focus();\r\n}\r\n\r\nconst projects = document.querySelector('.my-projects');\r\n\r\n// Creates DOM node for a project object passed in\r\nfunction createProjectDiv(project) {\r\n    const projectNode = document.createElement('div');\r\n    projectNode.classList.add('project-node');\r\n\r\n    const projImg = document.createElement('img');\r\n    projImg.src = './images/menu.png';\r\n    projImg.alt = 'project-menu-icon';\r\n    projImg.setAttribute('id', 'proj-img');\r\n\r\n    const h2 = document.createElement('h2');\r\n    h2.append(`${project.title}`)\r\n\r\n    const button = document.createElement('button');\r\n    button.setAttribute('type', 'button');\r\n\r\n    const buttonImg = document.createElement('img');\r\n    buttonImg.src = './images/dots.png';\r\n    buttonImg.alt = 'more-settings';\r\n    buttonImg.setAttribute('id', 'project-settings');\r\n    \r\n    button.appendChild(buttonImg);\r\n\r\n    projectNode.appendChild(projImg);\r\n    projectNode.appendChild(h2);\r\n    projectNode.appendChild(button);\r\n    return projectNode;\r\n}\r\n\r\n\r\n// Menu Bar Class \r\nclass MenuBar {\r\n    \r\n    static miscellaneous = [allTasks, today, week, important, notes];\r\n\r\n    static addOnClicks() {\r\n        for (let section of MenuBar.miscellaneous) {    // misc section onClick events\r\n            section.addEventListener('click', () => {\r\n                section.classList.add('selected');      // add and remove class that highlights gray around active section\r\n                MenuBar.removeOtherSelected(section);\r\n                MenuBar.renderPage(section);            // dynamically render the section\r\n            });\r\n        }\r\n        addProjectDiv.addEventListener('click', switchProjectMode);      // \"Add Project\" div onClick events\r\n        cancelProjectBtn.addEventListener('click', switchProjectMode);\r\n\r\n        projectForm.addEventListener('submit', (e) => {             // add project form onSubmit event\r\n            // TODO: add func for constraint validation api logic\r\n            MenuBar.createProject();\r\n            e.preventDefault();\r\n            switchProjectMode();\r\n        });\r\n    }\r\n\r\n    static removeOtherSelected(section) {\r\n        for (let i of MenuBar.miscellaneous) {      // remove selected class from other\r\n            if (i !== section) {                    // sections in misc\r\n                i.classList.remove('selected');;\r\n            }\r\n        }\r\n    }\r\n\r\n    static projects = [];\r\n\r\n    static createProject() {                            // Adds project to portfolio\r\n        const projectTitle = projectTitleInput.value;\r\n        const project = new _projects__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectTitle);\r\n        MenuBar.projects.push(project);\r\n        MenuBar.renderProjectSection();\r\n    }\r\n\r\n    static renderProjectSection() {                    // renders new project section w/ updated portfolio\r\n        projects.innerHTML = '';\r\n        for (let project of MenuBar.projects) {\r\n            projects.appendChild(createProjectDiv(project));\r\n        }\r\n    }\r\n\r\n    static renderPage(section) {\r\n        console.log('rendering: ', section); // implement render page logic later\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list-top/./src/modules/MenuBar.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/**Project Module\r\n * similar to Task class \r\n * Instantiates a project w/ title\r\n * holds all tasks in an array\r\n */\r\n\r\nclass Project {\r\n    constructor(title) {\r\n        this.title = title;\r\n        this.tasks = [];\r\n    }\r\n\r\n    set title(title) {\r\n        this._title = title;\r\n    }\r\n    get title() {\r\n        return this._title;\r\n    }\r\n\r\n    addTask(task) {\r\n        this.tasks.push(task);\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list-top/./src/modules/projects.js?");

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