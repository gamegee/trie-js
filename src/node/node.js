'use strict';


const _ = require('lodash');


class Node {


    constructor(opts = {}) {
        this.value = opts.value || null;
        this._children = {};

        _.forEach(opts._children, (node, char) => {
            this.addChild(char, node)
        });
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

        return this._children[char] = new Node(node);
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
    isEmpty() {
        return !(_.keys(this._children).length > 0);
    }




    /**
     * [getChild description]
     * @return {[type]} [description]
     */
    getChild(char) {
        return this._children[char];
    }


    /**
     * [getChild description]
     * @return {[type]} [description]
     */
    getChildren() {
        return this._children;
    }


    /**
     * [getChild description]
     * @return {[type]} [description]
     */
    isNull() {
        return this.value === null;
    }


    /**
     * [getValue description]
     * @return {[type]} [description]
     */
    getValue() {
        return this.value;
    }
}


module.exports = Node;
module.exports.create = function(opts) {
    return new Node(opts);
}