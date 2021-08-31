"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_webpack"]("vue_pages_home_index_js",{

/***/ "../vue/pages/home/index.js":
/*!**********************************!*\
  !*** ../vue/pages/home/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _template_pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.pug */ \"../vue/pages/home/template.pug\");\n/* harmony import */ var _stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stoplight/json-schema-generator */ \"../node_modules/@stoplight/json-schema-generator/lib/index.js\");\n/* harmony import */ var _stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  template: _template_pug__WEBPACK_IMPORTED_MODULE_0__.default,\n  data: () => {\n    return {\n      sample: '{\"hello\":\"world\"}',\n      result: ''\n    }\n  },\n  mounted () {\n    this.translate()\n  },\n  methods: {\n    translate () {\n      this.result = JSON.stringify(_stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1___default()(JSON.parse(this.sample)), null, 4)\n    }\n  }\n});\n\n\n//# sourceURL=webpack://~webpack/../vue/pages/home/index.js?");

/***/ })

});