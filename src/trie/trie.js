'use strict';


const _ = require('lodash');
const Node = require('../node');


/**
 * [exports description]
 * @param  {Object} opts [description]
 * @return {[type]}      [description]
 */
const Trie = function Trie() {
    this._node = Node;
    this._root = this._node.create();
}


/**
 * [add description]
 * @param {[type]} str   [description]
 * @param {[type]} value [description]
 */
Trie.prototype.add = function(str, value) {
    let parsedString = this._parseString(str);
    return this._add(parsedString, value, this._root);
}


/**
 * [_addOne description]
 * @param {[type]} char [description]
 * @param {[type]} node [description]
 */
Trie.prototype._addOne = function(char, node, value) {

    if (node.hasChildNode(char)) {
        return node.getChildNode(char);
    }

    // If node does not exist we create a new one
    let newNode = this._node.create(value);
    return node.addChildNode(char, newNode);
}


/**
 * [_add description]
 * @param {[type]} str   [description]
 * @param {[type]} value [description]
 * @param {[type]} node  [description]
 * @param {Number} idx   [description]
 */
Trie.prototype._add = function(str, value, node, idx = 0) {

    let currentNode = node;
    let char = str[idx];
    idx++;

    let isLastNode = (idx === str.length);
    let newNode = this._addOne(char, currentNode, (isLastNode ? value : null));


    return isLastNode ? newNode : this._add(str, value, newNode, idx);
}


/**
 * [get description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
Trie.prototype.get = function(str) {
    let parsedString = this._parseString(str);
    return this._get(parsedString, this._root);
}


/**
 * [_get description]
 * @param  {[type]} str  [description]
 * @param  {[type]} node [description]
 * @param  {[type]} idx  [description]
 * @return {[type]}      [description]
 */
Trie.prototype._get = function(str, node, idx = 0) {

    let char = str[idx];

    // Return if current node has no child
    if (!node.hasChildNode(char)) {
        return null;
    }

    let currentNode = node.getChildNode(char);
    idx++;

    let isLastNode = (idx === str.length);
    return isLastNode ? currentNode : this._get(str, currentNode, idx);
}


/**
 * [getAllSubNodes description]
 * @return {[type]} [description]
 */
Trie.prototype.getAll = function(startString = '', options = {}) {
    let arr = [];
    let parsedString = this._parseString(startString);
    let currentNode = parsedString ? this.get(parsedString) : this._root;
    return currentNode ? this._getAll(currentNode, parsedString, arr, 0, options) : [];
}


/**
 * [_parseOne description]
 * @param  {[type]}  node      [description]
 * @param  {[type]}  str       [description]
 * @param  {[type]}  arr       [description]
 * @param  {Boolean} condition [description]
 * @return {[type]}            [description]
 */
Trie.prototype._getAll = function(node, str, arr, depth, options) {

    let continuDepth = (options.depth >= depth);
    let continueItems = (arr.length >= options.maxItems);

    if(continuDepth || continueItems) {
        return;
    }

    let notNullSpec = (options.definedNodes === true && !node.isNull());
    let nullSpec = (options.definedNodes === false && node.isNull());
    let conditionSpec = (options.condition);


    let childNodes = node.getChildNodesArray();
    _.forEach(childNodes, (value) => {
        let nextString = str.concat(value.char);
        this._getAll(value.node, nextString, arr, depth, options);
    });

    return arr;
}


/**
 * [parseString description]

 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
Trie.prototype._parseString = function(str) {

    if (!_.isString(str)) {
        throw new Error('Expect first param to be a string.');
    }

    return str.toLowerCase();
}


module.exports = Trie;
module.exports.create = function() {
    return new Trie();
}
