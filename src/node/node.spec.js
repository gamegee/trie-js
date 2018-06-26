'use strict';

const chai = require('chai');
const Node = require('./node.js');
const expect = chai.expect;


describe('node', function () {

    it('Create a node should initialize default values', () => {
        let node = new Node();
        expect(node._children).to.deep.equal({});
        expect(node.value).to.equal(null);
    });


    it('Create a node should initialize default values', () => {
        let node = new Node(55);
        expect(node.value).to.equal(55);
    });


    it('[addChild] with an invalid char value should throw', () => {
        let node1 = new Node();
        let node2 = new Node();
        expect(() => node1.addChild(55, node2)).to.throw();
    });


    it('[addChild] with an invalid node value should throw', () => {
        let node1 = new Node();
        expect(() => node1.addChild('a', null)).to.throw();
    });


    it('[addChild] with valid parameters should return valid data', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChild('a', node2);
        expect(node1._children.a).to.deep.equal(node2);
    });


    it('[isEmpty] should return false if no node has been added', () => {
        let node1 = new Node();
        expect(node1.isEmpty()).to.equal(true);
    });


    it('[isEmpty] should return true if node has been added', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChild('a', node2);
        expect(node1.isEmpty()).to.equal(false);
    });


    it('[hasChild] should return true if node has been added', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChild('a', node2);
        expect(node1.hasChild('a')).to.equal(true);
    });


    it('[hasChild] should return false if node does not exist', () => {
        let node1 = new Node();
        expect(node1.hasChild('a')).to.equal(false);
    });


    it('[hasChild] should return true if child node exist', () => {
        let node1 = new Node();
        node1.addChild('a', node1);
        expect(node1.hasChild('a')).to.equal(true);
    });


    it('[getChild] should return true if node has been added', () => {
        let node = new Node();
        node.addChild('a', node);
        expect(node.getChild('a')).to.be.an('object');
        expect(node.getChild('a').value).to.equal(null);
        expect(node.getChild('a')._children).to.deep.equal({});
    });


    it('[getChildren] should return true if node has been added', () => {
        let node1 = new Node();
        expect(node1.getChildren()).to.deep.equal({});
    });


    it('[getChildren] should return true if node has been added', () => {
        let node1 = new Node();
        let node2 = new Node();
        node1.addChild('a', node2);
        expect(node1.getChildren()).to.deep.equal({
            'a': node2
        });
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
