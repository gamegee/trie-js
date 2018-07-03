-'use strict';


const _ = require('lodash');
const Node = require('../node');


class Trie {

    constructor(opts = {}) {
        this._node = Node;
        this._isRoot = true;
        this._children = this._node.create(opts._children || {});
    }


    /**
     * Add a new word in the trie
     * @param {String} word - word to add to the trie
     * @param {String} value - You can add specific value to each added node
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
                currentNode.addChild(char, this._node.create({ value }));
        }, this._children);
    }



    /**
     * Get node from a specific word in the trie
     * @param  {String} word - required
     * @return {Object|null} node or null if the word doesn't exist
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

            if (!childNode) {
                // Stop iteration by mutating the charArray
                arr.splice(idx, charArray.length);
                return null;
            }

            return childNode;
        }, this._children);
    }


    /**
     * Search words that start with specific string subset
     * @param {String} startString - required
     * @param {*} opts - optional
     * @returns {Array} Array of words
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
     * Get words count that start with specific string subset
     * @return {Number} Number of words
     */
    getCountFrom(startString = null, opts = {}) {
        return this.getFrom(startString, opts).length;
    }


    /**
     * 
     * @param {*} node 
     * @param {*} prevStr 
     * @param {*} opts 
     */
    getAll(node = this._children, prevStr = '', opts = {}) {
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


    serialize() {
        return JSON.parse(JSON.stringify(this));
    }


    /**
     * @param  {String} str 
     * @return {String}     
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