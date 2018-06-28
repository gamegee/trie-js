'use strict';


const chai = require('chai');
const expect = chai.expect;
const Trie = require('./trie.js');


describe('trie', function() {


    describe('constructor', () => {

        it('Create a trie should initialize default values', () => {
            let trie = new Trie();
            expect(trie._children).to.be.an.instanceof(trie._node);
            expect(trie._children.value).to.equal(null);
        });
    });

    describe('add', () => {

        it('[add] with valid param should return valid trie structure', () => {
            let trie = new Trie();
            let lastNode = trie.add('hello', 55);
            expect(lastNode.value).to.equal(55)
        });


        it('[add] 2 nodes should return valid value for each one', () => {
            let trie = new Trie();
            let lastNode = trie.add('hell', 40);
            let lastNode2 = trie.add('hello', 55);
            expect(lastNode.value).to.equal(40)
            expect(lastNode2.value).to.equal(55);
        });


        it('[add] 2 nodes that start with the same letter should not duplicate the sub-nodes characters', () => {
            let trie = new Trie();
            trie.add('hell', 40);
            trie.add('hello', 55);
            expect(Object.keys(trie._children.getChildren()).length).to.equal(1);
        });


        it('[add] 2 nodes that start with the same letter should not duplicate the sub-nodes characters', () => {
            let trie = new Trie();
            trie.add('hell', 40);
            trie.add('hello', 55);
            expect(Object.keys(trie._children.getChildren()).length).to.equal(1);
        });


        it('[add] valid node should set null value for non associated nodes, and valid value for associated node', () => {
            let trie = new Trie();
            trie.add('hell', 40);
            trie.add('hello', 55);
            expect(trie._children.getChild('h').value).to.equal(null);
            expect(trie._children.getChild('h').getChild('e').getChild('l').getChild('l').value).to.equal(40);

        });
    });


    describe('get', () => {
        it('[get] a node that is already inserted should return valid data', () => {
            let trie = new Trie();
            trie.add('hello', 40);
            let res = trie.get('hello');
            expect(res.value).to.equal(40);
        });


        it('[get] a non associated node should return null', () => {
            let trie = new Trie();
            trie.add('hello', 40);
            expect(trie.get('hell')).to.equal(null);
            expect(trie.get('hey')).to.equal(null);
        });


        it('[get] associated nodes should return valid data, not associated nodes should return null', () => {
            let trie = new Trie();
            trie.add('hello mike', 40);
            trie.add('hello billy', 55);
            expect(trie.get('damn')).to.equal(null);
            expect(trie.get('hello')).to.equal(null);
            expect(trie.get('hello mike').value).to.equal(40);
            expect(trie.get('hello billy').value).to.equal(55);
            expect(trie.get('hello bill')).to.equal(null);
        });
    });


    describe('getAll', () => {

        it('[getAll] should return all added words from root node', () => {
            let trie = new Trie();
            let res = trie.getAll();
            expect(res.length).to.equal(0);
            expect(res).to.deep.equal([]);
        });


        it('[getAll] should return all added words from root node', () => {
            let trie = new Trie();
            trie.add('hello', 40);
            trie.add('hi', 55);
            trie.add('gamegee', 100);
            let res = trie.getAll();
            expect(res.length).to.equal(3);
            expect(res[0]).to.equal('hello');
            expect(res[1]).to.equal('hi');
            expect(res[2]).to.equal('gamegee');
        });
    });


    describe('getFrom', () => {

        it('[getFrom] should return all added words from specific root node', () => {
            let trie = new Trie();
            trie.add('hey', 40);
            trie.add('help', 40);
            trie.add('hello', 40);
            trie.add('hellokitty', 55);
            trie.add('hellofood', 100);
            let res = trie.getFrom('');
            let res2 = trie.getFrom(null);
            expect(res.length).to.equal(5);
            expect(res2.length).to.equal(5);
        });


        it('[getFrom] should return all added words from specific string node', () => {
            let trie = new Trie();
            trie.add('hey', 40);
            trie.add('help', 40);
            trie.add('hello', 40);
            trie.add('hellokitty', 55);
            trie.add('hellofood', 100);
            let res = trie.getFrom('hell');
            expect(res.length).to.equal(3);
        });
    });


    describe('serialize and deserialize', () => {

        it('[serialize] should return a raw JS Object representing the trie structure', () => {
            let trie = new Trie();
            trie.add('hey', 40);
            trie.add('help', 40);
            let serialized = trie.serialize();
            expect(Object.keys(serialized._children).length).to.equal(2);
            expect(serialized.getAll).to.equal(undefined);
        });

        it('[deserialize] should return valid data', () => {
            let trie = new Trie();
            trie.add('hey', 40);
            trie.add('help', 40);
            let serialized = trie.serialize();
            let newTrie = new Trie(serialized);
            expect(newTrie.getAll().length).to.equal(2);
        });
    });
});