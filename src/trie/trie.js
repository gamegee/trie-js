'use strict';


const _ = require('lodash');
const Node = require('../node');


class Trie {

    constructor() {
        this._node = Node;
        this._root = this._node.create();
    }


    /**
     * @param {String} str
     * @param {String} value
     */
    add(str, opts) {
        let parsedString = this._parseString(str);
        let charArray = parsedString.split('');

        return charArray.reduce((currentNode, char, idx) => {
            let childNode = currentNode.getChild(char);
            let childNodeExist = !!childNode;
            let isLast = (idx === charArray.length - 1);
            let value = isLast ? opts : null;
            return childNodeExist ?
                childNode :
                currentNode.addChild(char, this._node.create(value));
        }, this._root);
    }



    /**
     * @param  {String} str
     * @return {Object} Node
     */
    get(str) {
        let parsedString = this._parseString(str);
        let node = this.getNode(parsedString);

        if (!node) {
            return null;
        }

        return node.isNull() ? null : node;
    }


    getNode(str) {
        let charArray = str.split('');
        return charArray.reduce((currentNode, char, idx, arr) => {
            let childNode = currentNode.getChild(char);
            let isLast = (idx === charArray.length - 1);

            if (!childNode) {
                // Stop iteration by mutating the charArray
                arr.splice(idx, charArray.length);
                return null;
            }

            return childNode;
        }, this._root);
    }


    /**
     * [getAllSubNodes description]
     * @return {[type]} [description]
     */
    getFrom(startString = null, opts = {}) {

        if (!startString) {
            return this.getAll();
        }

        let parsedString = this._parseString(startString);
        let currentNode = this.getNode(parsedString);
        return this.getAll(currentNode, parsedString, opts);
    }


    /**
     * [getAllSubNodes description]
     * @return {[type]} [description]
     */
    getCountFrom(startString = null, opts = {}) {
        return this.getFrom(startString, opts).length;
    }


    getAll(node = this._root, prevStr = '', opts = {}) {
        return _.reduce(node.getChildren(), (acc, item, key) => {

            let currentStr = `${prevStr}${key}`;

            if (item && !item.isNull()) {
                acc.push(currentStr);
            }

            let arr = this.getAll(item, currentStr, opts);
            acc = acc.concat(arr);
            return acc;
        }, []);
    }


    getCount() {
        return this.getAll().length;
    }


    /**
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    _parseString(str) {
        if (!_.isString(str)) {
            throw new Error('Expect first param to be a string.');
        }
        return str.toLowerCase();
    }
}

module.exports = Trie;
module.exports.create = function() {
    return new Trie();
}