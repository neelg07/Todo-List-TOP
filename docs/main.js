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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/MenuBar */ \"./src/modules/MenuBar.js\");\n/**Primary Module\r\n * imports other modules as needed to implement app functionality\r\n */\r\n\r\n\r\n// On first page load\r\n// Add event listeners to Menu items\r\nwindow.addEventListener('load', () => {\r\n    _modules_MenuBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addOnClicks();\r\n});\n\n//# sourceURL=webpack://todo-list-top/./src/index.js?");

/***/ }),

/***/ "./src/modules/MenuBar.js":
/*!********************************!*\
  !*** ./src/modules/MenuBar.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuBar)\n/* harmony export */ });\n/**Menu Bar Module\r\n * add event listeners for each menu item\r\n * holds list of projects to display under projects\r\n * calls DOM manipulation module to render each page\r\n */\r\n\r\nconst allTasks = document.querySelector('.all-tasks');\r\nconst today = document.querySelector('.today');\r\nconst week = document.querySelector('.week');\r\nconst important = document.querySelector('.important');\r\nconst notes = document.querySelector('.notes');\r\n\r\nclass MenuBar {\r\n    \r\n    static miscellaneous = [allTasks, today, week, important, notes];\r\n\r\n    static addOnClicks() {\r\n        for (let section of MenuBar.miscellaneous) {\r\n            section.addEventListener('click', () => {\r\n                section.classList.add('selected');\r\n                MenuBar.removeOtherSelected(section);\r\n                MenuBar.renderPage(section);\r\n            });\r\n        }\r\n    }\r\n\r\n    static removeOtherSelected(section) {\r\n        for (let i of MenuBar.miscellaneous) {\r\n            if (i === section) {\r\n                continue;\r\n            }\r\n            i.classList.remove('selected');\r\n        }\r\n    }\r\n\r\n    static renderPage(section) {\r\n        console.log('rendering: ', section); // implement render logic later\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list-top/./src/modules/MenuBar.js?");

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