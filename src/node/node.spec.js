'use strict';

const chai = require('chai');
const Node = require('./node.js');
const expect = chai.expect;


describe('node', function() {

    it('Create a node should initialize default values', () => {
        let node = new Node();
        expect(node._childNodes).to.deep.equal({});
        expect(node.value).to.equal(null);
    });


    it('Create a node should initialize default values', () => {
        let node = new Node(55);
        expect(node.value).to.equal(55);
    });


    it('[addChildNode] with an invalid char value should throw', () => {
        let node1 = new Node();
        let node2 = new Node();
        expect(() => node1.addChildNode(55, node2)).to.throw();
    });


    it('[addChildNode] with an invalid node value should throw', () => {
        let node1 = new Node();
        expect(() => node1.addChildNode('a', null)).to.throw();
    });


    it('[addChildNode] with valid parameters should return valid data', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChildNode('a', node2);
        expect(node1._childNodes.a).to.deep.equal(node2);
    });


    it('[hasChildNodes] should return false if no node has been added', () => {
        let node1 = new Node();
        expect(node1.hasChildNodes()).to.equal(false);
    });


    it('[hasChildNodes] should return true if node has been added', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChildNode('a', node2);
        expect(node1.hasChildNodes()).to.equal(true);
    });


    it('[hasChildNode] should return false if node does not exist', () => {
        let node1 = new Node();
        expect(node1.hasChildNode('a')).to.equal(false);
    });


    it('[hasChildNode] should return true if child node exist', () => {
        let node1 = new Node();
        node1.addChildNode('a', node1);
        expect(node1.hasChildNode('a')).to.equal(true);
    });


    it('[hasChildNodes] should return true if node has been added', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChildNode('a', node2);
        expect(node1.hasChildNodes()).to.equal(true);
    });


    it('[getChildNodes] should return true if node has been added', () => {
        let node1 = new Node();
        expect(node1.getChildNodes()).to.deep.equal({});
    });


    it('[getChildNodesArray] should return true if node has been added', () => {
        let node1 = new Node();
        expect(node1.getChildNodesArray()).to.deep.equal([]);
    });


    it('[getChildNodesArray] should return true if node has been added', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChildNode('a', node2);
        expect(node1.getChildNodesArray()).to.deep.equal([{ 'char': 'a', node: node2 }]);
    });


    it('[isNull] should return true if node has no value defined', () => {
        let node1 = new Node();
        expect(node1.isNull()).to.equal(true);
    });


    it('[isNull] should return false if node has a value defined', () => {
        let node1 = new Node(1);
        expect(node1.isNull()).to.equal(false);
    });
});
