"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_webpack"] = self["webpackChunk_webpack"] || []).push([["vue_pages_home_index_js"],{

/***/ "../node_modules/@stoplight/json-schema-generator/lib/ast.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@stoplight/json-schema-generator/lib/ast.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/**\nGenerates an Abstract Syntax Tree\nused for generating the schema.\n\n@see: https://en.wikipedia.org/wiki/Abstract_syntax_tree\n*/\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/@stoplight/json-schema-generator/lib/utils.js\");\n\n/**\nAbstract Syntax Tree Class\n\n@class AST\n@return {Object}\n*/\nvar AST = function() {\n  if (!this instanceof AST) {\n    return new AST();\n  }\n\n  this.tree = {};\n};\n\n/**\nInspect primitatives and apply the correct type\nand mark as required if the element contains a value.\n\n@method buildPrimitive\n@param {Object} tree Schema which represents the node\n@param {Node} node The JSON node being inspected\n@return void\n*/\nAST.prototype.buildPrimitive = function(tree, node) {\n  var types = tree.types,\n      type = utils.getType(node);\n\n  if (types && types.length) {\n    if (types.indexOf(type) === -1) {\n      types.push(type);\n      types.sort();\n    }\n  } else {\n    tree.types = [type];\n  }\n};\n\n/**\nInspect object properties and apply the correct\ntype and mark as required if the element has set\nproperties.\n\n@method buildObject\n@param {Object} tree Schema which represents the node\n@param {Node} node The JSON node being inspected\n*/\nAST.prototype.buildObjectTree = function(tree, node) {\n  tree.types = tree.types || [utils.getType(node)];\n  tree.children = tree.children || {};\n\n  if (utils.getType(node) === 'object') {\n    for (var i in node) {\n      tree.children[i] = tree.children[i] || {};\n\n      if (utils.isObject(node[i])) {\n        this.buildObjectTree(tree.children[i], node[i]);\n      } else if (utils.isArray(node[i])) {\n        this.buildArrayTree(tree.children[i], node[i]);\n      } else {\n        this.buildPrimitive(tree.children[i], node[i]);\n      }\n    }\n  }\n};\n\n/**\nInspect array elements apply the correct\ntype and mark as required if the element has\nset properties.\n\n@method buildObject\n@param {Object} tree Schema which represents the node\n@param {Node} node The JSON node being inspected\n*/\nAST.prototype.buildArrayTree = function(tree, node) {\n  var reducedArray = [],\n      elemsCount = node.length;\n\n  // Pick only first, middle and last element from arrays containing > 3\n  // elements for performance optimization\n  if (elemsCount > 3) {\n    reducedArray = [\n      node[0],\n      node[Math.floor(elemsCount / 2)],\n      node[elemsCount - 1]\n    ];\n  } else {\n    reducedArray = node;\n  }\n\n  tree.types = ['array'];\n  tree.children = tree.children || {};\n\n  reducedArray.forEach(function(elem) {\n    if (utils.isObject(elem)) {\n      this.buildObjectTree(tree, elem);\n    } else if (utils.isArray(elem)) {\n      this.buildArrayTree(tree, elem);\n    } else {\n      tree.children = utils.getType(elem);\n    }\n  }.bind(this));\n};\n\n/**\nInitiates generating the AST from the\ngiven JSON document.\n\n@param {Object} json JSON object\n@return void\n*/\nAST.prototype.build = function(json) {\n  if (json instanceof Array) {\n    this.buildArrayTree(this.tree, json);\n  } else {\n    this.buildObjectTree(this.tree, json);\n  }\n};\n\nmodule.exports = AST;\n\n\n//# sourceURL=webpack://~webpack/../node_modules/@stoplight/json-schema-generator/lib/ast.js?");

/***/ }),

/***/ "../node_modules/@stoplight/json-schema-generator/lib/compiler.js":
/*!************************************************************************!*\
  !*** ../node_modules/@stoplight/json-schema-generator/lib/compiler.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/@stoplight/json-schema-generator/lib/utils.js\");\n\n/**\nSchema generator using a AST\ntree.\n\n@class Compiler\n*/\nvar Compiler = function() {\n  if (!this instanceof Compiler) {\n    return new Compiler();\n  }\n\n  this.schema = {};\n};\n\n/**\nGenerates a JSON schema based on the provided AST tree.\n\n@method generate\n@param {Object} tree AST\n@param {Object} schema The schema object\n@param {Object} parent Schema node parent object\n@return void\n*/\nCompiler.prototype.generate = function(tree, schema, parent) {\n  for (var i in tree.children) {\n    var child = tree.children[i];\n\n    schema[i] = {};\n    if (child.types.length > 1) {\n      schema[i].type = child.types;\n    } else {\n      schema[i].type = child.types[0];\n    }\n\n    if (child.types.indexOf('object') !== -1) {\n      var props = {};\n      this.generate(child, props, schema[i]);\n      schema[i].properties = props;\n    } else if (child.types.indexOf('array') !== -1) {\n      schema[i].items = {};\n\n      if (child.children && utils.isObject(child.children)) {\n        schema[i].items.type = 'object'\n        var props = {};\n        this.generate(child, props, schema[i]);\n        schema[i].items.properties = props;\n      } else {\n        schema[i].items.type = child.children;\n      }\n    } else {\n      if (child.minLength) {\n        schema[i].minLength = child.minLength;\n      }\n    }\n  }\n};\n\n/**\nInitates compiling the given AST into a\nJSON schema.\n\n@method compile\n@param {Object} tree AST object\n@return void\n*/\nCompiler.prototype.compile = function(tree) {\n  this.schema = {};\n\n  if (tree.types.length > 1) {\n    this.schema.types = tree.types;\n  } else {\n    this.schema.type = tree.types[0];\n  }\n\n  if (tree.types.indexOf('object') !== -1) {\n    this.schema.properties = {};\n    this.generate(tree, this.schema.properties, this.schema);\n  } else if (tree.types.indexOf('array') !== -1) {\n    this.schema.items = {};\n    if (tree.children && utils.isObject(tree.children)) {\n      this.schema.items.type = 'object';\n      this.schema.items.properties = {};\n      this.generate(tree, this.schema.items.properties, this.schema.items);\n    } else {\n      this.schema.items.type = tree.children;\n    }\n  }\n};\n\nmodule.exports = Compiler;\n\n\n//# sourceURL=webpack://~webpack/../node_modules/@stoplight/json-schema-generator/lib/compiler.js?");

/***/ }),

/***/ "../node_modules/@stoplight/json-schema-generator/lib/index.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@stoplight/json-schema-generator/lib/index.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar Compiler = __webpack_require__(/*! ./compiler */ \"../node_modules/@stoplight/json-schema-generator/lib/compiler.js\");\nvar AST = __webpack_require__(/*! ./ast.js */ \"../node_modules/@stoplight/json-schema-generator/lib/ast.js\");\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/@stoplight/json-schema-generator/lib/utils.js\");\n\nvar jsonToSchema = function(json) {\n  var compiler = new Compiler();\n  var ast = new AST();\n  ast.build(json);\n  compiler.compile(ast.tree);\n  return compiler.schema;\n};\n\nmodule.exports = jsonToSchema;\n\n\n//# sourceURL=webpack://~webpack/../node_modules/@stoplight/json-schema-generator/lib/index.js?");

/***/ }),

/***/ "../node_modules/@stoplight/json-schema-generator/lib/utils.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@stoplight/json-schema-generator/lib/utils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nexports.isObject = function(value) {\n  return !exports.isArray(value) && value !== null && typeof value === typeof {};\n};\n\nexports.isInteger = function(value) {\n  return !exports.isArray(value) && !exports.isObject(value) && Number(value) === value && value % 1 === 0;\n};\n\nexports.isNumber = function(value) {\n  return !exports.isArray(value) && !exports.isObject(value) && Number(value) === value;\n};\n\nexports.isArray = function(value) {\n  return (value instanceof Array);\n};\n\nexports.isString = function(value) {\n  return (typeof value === typeof '');\n};\n\nexports.isNull = function(value) {\n  return (null === value);\n};\n\nexports.isBoolean = function(value) {\n  return (value === true || value === false);\n};\n\nexports.toObject = function(arr) {\n  var rv = {};\n  for (var i = 0; i < arr.length; ++i)\n    rv[i] = arr[i];\n  return rv;\n};\n\nexports.oneIsNull = function(v1, v2) {\n  return ((v1 === null && v2 !== null) || (v1 !== null && v2 === null));\n};\n\nexports.isUndefined = function(val) {\n  return (null === val || typeof val === 'undefined');\n};\n\nexports.isFunction = function(fn) {\n  return (typeof fn === 'function');\n};\n\nexports.isEqual = function(v1, v2) {\n  if (typeof v1 !== typeof v2 || exports.oneIsNull(v1, v2)) {\n    return false;\n  }\n\n  if (typeof v1 === typeof \"\" || typeof v1 === typeof 0) {\n    return v1 === v2;\n  }\n\n  var _isEqual = true;\n\n  if (typeof v1 === typeof {}) {\n    var compare = function(value1, value2) {\n      for (var i in value1) {\n        if (!value2.hasOwnProperty(i)) {\n          _isEqual = false;\n          break;\n        }\n\n        if (exports.isObject(value1[i])) {\n          compare(value1[i], value2[i]);\n        } else if (typeof value1[i] === typeof \"\") {\n          if (value1[i] !== value2[i]) {\n            _isEqual = false;\n            break;\n          }\n        }\n      }\n    }\n\n    compare(v1, v2);\n  }\n\n  return _isEqual;\n};\n\nexports.getType = function(data) {\n  if (exports.isNull(data)) {\n    return 'null';\n  } else if (exports.isBoolean(data)) {\n    return 'boolean';\n  } else if (exports.isString(data)) {\n    return 'string';\n  } else if (exports.isInteger(data)) {\n    return 'integer';\n  } else if (exports.isNumber(data)) {\n    return 'number';\n  } else if (exports.isObject(data)) {\n    return 'object';\n  } else if (exports.isArray(data)) {\n    return 'array';\n  }\n};\n\n\n//# sourceURL=webpack://~webpack/../node_modules/@stoplight/json-schema-generator/lib/utils.js?");

/***/ }),

/***/ "../vue/pages/home/index.js":
/*!**********************************!*\
  !*** ../vue/pages/home/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _template_pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.pug */ \"../vue/pages/home/template.pug\");\n/* harmony import */ var _stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stoplight/json-schema-generator */ \"../node_modules/@stoplight/json-schema-generator/lib/index.js\");\n/* harmony import */ var _stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  template: _template_pug__WEBPACK_IMPORTED_MODULE_0__.default,\n  data: () => {\n    return {\n      sample: '',\n      result: ''\n    }\n  },\n  methods: {\n    translate () {\n      this.result = JSON.stringify(_stoplight_json_schema_generator__WEBPACK_IMPORTED_MODULE_1___default()(JSON.parse(this.sample)), null, 4)\n    }\n  }\n});\n\n\n//# sourceURL=webpack://~webpack/../vue/pages/home/index.js?");

/***/ }),

/***/ "../vue/pages/home/template.pug":
/*!**************************************!*\
  !*** ../vue/pages/home/template.pug ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"container-fluid px-0\\\"><nav class=\\\"navbar navbar-dark bg-dark\\\"><div class=\\\"navbar-brand d-flex\\\"><div>JSON Schema Generator</div></div></nav><div class=\\\"container-fluid px-0\\\"><b-card no-body style=\\\"min-height: calc(85vh)\\\"><b-card-header header-tag=\\\"nav\\\"><b-nav class=\\\"mb-1\\\" card-header tabs><b-nav-item @click=\\\"translate\\\">轉換</b-nav-item></b-nav></b-card-header><b-card-body class=\\\"h-100\\\"><div class=\\\"d-flex align-items-center justify-content-around mt-2 h-100\\\"><textarea class=\\\"w-50 h-100\\\" v-model=\\\"sample\\\"></textarea><textarea class=\\\"w-50 h-100\\\" v-model=\\\"result\\\"></textarea></div></b-card-body></b-card></div></div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://~webpack/../vue/pages/home/template.pug?");

/***/ })

}]);