'use strict';


const _ = require('lodash');


/**
 * [exports description]
 * @param  {Object} opts [description]
 * @return {[type]}      [description]
 */
const Node = function Node(value) {

    this.value = value || null;
    this._childNodes = {};
}


/**
 * [addChildNode description]
 */
Node.prototype.addChildNode = function(char, node) {

    let isString = _.isString(char);
    let isLenghtValid = char.length === 1;

    if (!isString || !isLenghtValid) {
        throw new Error('char property should be a string of length 1.')
    }

    if (!(node instanceof Node)) {
        throw new Error('childNode property can either be null or a Node instance.')
    }

    return this._childNodes[char] = node;
}


/**
 * [hasChildNode description]
 * @param  {[type]}  char [description]
 * @return {Boolean}      [description]
 */
Node.prototype.hasChildNode = function(char) {
    return (char && this._childNodes[char.toLowerCase()] !== undefined);
}


/**
 * [hasChildNode description]
 * @param  {[type]}  char [description]
 * @return {Boolean}      [description]
 */
Node.prototype.hasChildNodes = function(char) {
    return (_.keys(this._childNodes).length > 0);
}


/**
 * [getChildNode description]
 * @return {[type]} [description]
 */
Node.prototype.getChildNodes = function() {
    return this._childNodes;
};


/**
 * [getChildNode description]
 * @return {[type]} [description]
 */
Node.prototype.getChildNode = function(char) {
    return this._childNodes[char];
};


/**
 * [getChildNode description]
 * @return {[type]} [description]
 */
Node.prototype.getChildNodesArray = function() {
    return _.map(this._childNodes, (item, key) => ({ char: key, node: item }));
};


/**
 * [getChildNode description]
 * @return {[type]} [description]
 */
Node.prototype.isNull = function() {
    return this.value === null;
};


/**
 * [getValue description]
 * @return {[type]} [description]
 */
Node.prototype.getValue = function() {
	return this.value;
}


module.exports = Node;
module.exports.create = function(value) {
    return new Node(value);
}
