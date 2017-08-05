'use strict';

const chai = require('chai');
const expect = chai.expect;
const Trie = require('./trie.js');
const Node = require('../node');
const sinon = require('sinon');

describe('trie', function() {

    it('Create a trie should initialize default values', () => {
        let trie = new Trie();
        expect(trie._root).to.be.an.instanceof(trie._node);
        expect(trie._root.value).to.equal(null);
    });


    it('[_addOne] with valid param should return valid trie structure', () => {
        let trie = new Trie();
        trie._addOne('a', trie._root, 55);
        expect(trie._root._childNodes['a'].value).to.equal(55);
    });


    it('[_add] with valid param should return valid trie structure', () => {
        let trie = new Trie();
        trie._add('hello', 55, trie._root);
        expect(trie._root._childNodes['h']).to.be.instanceof(Node);
        expect(trie._root._childNodes['h']._childNodes['e']).to.be.instanceof(Node);
    });


    it('[_add] multiple words that match letter should not duplicate nodes', () => {
        let trie = new Trie();
        trie._add('ab', 40, trie._root);
        trie._add('abc', 55, trie._root);

        expect(trie._root._childNodes['a']._childNodes['b'].value).to.equal(40);
        expect(trie._root._childNodes['a']._childNodes['b']._childNodes['c'].value).to.equal(55);
    });


    it('[_add] add a string that already exist should not update the node', () => {
        let trie = new Trie();
        trie._add('ab', 40, trie._root);
        trie._add('ab', 55, trie._root);

        expect(trie._root._childNodes['a']._childNodes['b'].value).to.equal(40);
    });


    it('[_add] should be called recursively', () => {
        let trie = new Trie();
        let spy = sinon.spy(trie, "_add");
        trie.add('abcd')
        expect(spy.callCount).to.equal(4);
    });


    it('[add] with no param should throw', () => {
        let trie = new Trie();
        expect(() => trie.add()).to.throw();
    });


    it('[add] with invalid param should throw', () => {
        let trie = new Trie();
        expect(() => trie.add(55)).to.throw();
    });


    it('[add] should call the _add function', () => {
        let trie = new Trie();
        let spy = sinon.spy(trie, "_add");
        trie.add('hello');
        expect(spy.called).to.equal(true);
    });


    it('[_get] should return null if the string has not been added yet', () => {
        let trie = new Trie();
        let node = trie._get('abcd', trie._root);
        expect(node).to.equal(null);
    });


    it('[_get] should return null if the string has not been added yet', () => {
        let trie = new Trie();
        let newNode = trie._add('abcd', 55, trie._root);
        let node = trie._get('abcd', trie._root);
        expect(node.value).to.equal(55);
    });


    it('[_get] should be called recursively', () => {
        let trie = new Trie();
        let spy = sinon.spy(trie, "_get");

        let newNode = trie._add('abcd', 55, trie._root);
        let node = trie._get('abcd', trie._root);

        expect(spy.callCount).to.equal(4);
    });


    it('[get] with no param should throw', () => {
        let trie = new Trie();
        expect(() => trie.get()).to.throw();
    });


    it('[get] with invalid param should throw', () => {
        let trie = new Trie();
        let spy = sinon.spy(trie, "_get");
        trie.get('hello')
        expect(spy.called).to.equal(true);
    });


    it('[getAll] with invalid param should throw', () => {
        let trie = new Trie();
        trie.add('abcd', 5);
        trie.add('abce', 5);
        trie.add('abcf', 5);
        trie.add('abde', 5);

        let nodes = trie.getAll();
        expect(nodes.length).to.equal(4);
    });


    it('[getAll] with invalid param should throw', () => {
        let trie = new Trie();
        trie.add('abcde', 5);
        trie.add('abc', 5);
        trie.add('abcef', 5);
        trie.add('bcde', 5);

        let nodes = trie.getAll('abc');
        expect(nodes.length).to.equal(2);
    });


    it('[getAll] with invalid param should throw', () => {
        let trie = new Trie();
        trie.add('abcde', 5);
        trie.add('abc', 5);
        trie.add('abcef', 5);
        trie.add('bcde', 5);

        let nodes = trie.getAll('abc');
        expect(nodes.length).to.equal(2);
    });
});
