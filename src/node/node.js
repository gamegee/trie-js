'use strict';


const _ = require('lodash');


class Node {


    constructor(value) {
        this.value = value || null;
        this._children = {};
    }


    /**
     * [addChild description]
     */
    addChild(char, node) {

        let isString = _.isString(char);
        let isLenghtValid = char.length === 1;

        if (!isString || !isLenghtValid) {
            throw new Error('char property should be a string of length 1.')
        }

        if (!(node instanceof Node)) {
            throw new Error('childNode property can either be null or a Node instance.')
        }

        return this._children[char] = new Node(node.value);
    }


    /**
     * [hasChild description]
     * @param  {[type]}  char [description]
     * @return {Boolean}      [description]
     */
    hasChild(char) {
        return (char && this._children[char.toLowerCase()] !== undefined);
    }


    /**
     * [hasChild description]
     * @param  {[type]}  char [description]
     * @return {Boolean}      [description]
     */
    isEmpty(char) {
        return !(_.keys(this._children).length > 0);
    }




    /**
     * [getChild description]
     * @return {[type]} [description]
     */
    getChild(char) {
        return this._children[char];
    };


    /**
     * [getChild description]
     * @return {[type]} [description]
     */
    getChildren() {
        return this._children;
    };


    /**
     * [getChild description]
     * @return {[type]} [description]
     */
    isNull() {
        return this.value === null;
    };


    /**
     * [getValue description]
     * @return {[type]} [description]
     */
    getValue() {
        return this.value;
    }
}


module.exports = Node;
module.exports.create = function (value) {
    return new Node(value);
}
