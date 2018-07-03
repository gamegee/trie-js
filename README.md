# Get started


 ### Add a word  

```
let trie = Trie.create();
trie.add('hello', 10);
trie.add('hey', 25);
```

 ### Get a word node  

```
let trie = Trie.create();
trie.add('hello');
trie.get('hello'); // {value: 10, _children: {...}}
trie.get('hell'); // null
```


  ### Get all words  

```
let trie = Trie.create();
trie.add('hello');
trie.add('hey');
trie.add('help');
trie.getAll(); // ['hello', 'hey', 'help']
```

 ### Get words from string prefix  

```
let trie = Trie.create();
trie.add('hello');
trie.add('hey');
trie.add('help');
trie.getFrom('he'); // ['hello', 'hey', 'help']
trie.getFrom('hel'); // ['hello', 'help']
```

 ### Get words count  

```
let trie = Trie.create();
trie.add('hello');
trie.add('hey');
trie.add('help');
trie.getCount(); // 3
```

 ### Get words count from string prefix  

```
let trie = Trie.create();
trie.add('hello');
trie.add('hey');
trie.add('help');
trie.getCountFrom('he'); // 3
trie.getCountFrom('hel'); // 2
```



# API Reference

### Constructor
**Parameters**
**trie** `Object | void`, Create trie structure from existing trie structure (may be useful if you serialize trie)


### Trie.add(word, value) 
Add a new word in the trie
**Parameters**
**word**: `String`, word to add to the trie
**value**: `String`, You can add specific value to each added node  


### Trie.get(word) 

Get node from a specific word in the trie
**Parameters**
**word**: `String`, required
**Returns**: `Object | null`, node or null if the word doesn't exist


### Trie.getFrom(startString, opts) 
Search words that start with specific string subset
**Parameters**
**startString**: `String`, required
**Returns**: `Array`, Array of words


### Trie.getAll() 
Get all words contained in the trie
**Returns**: `Array`, Array of words


### Trie.getCountFrom() 
Get words count that start with specific string subset
**Parameters**
**startString**: `String`, required
**Returns**: `Number`, Number of words


### Trie.getCount() 
Get total words count contained in the trie
**Parameters**
**Returns**: `Number`, Number of words


### Trie.serialize() 
Serialize the trie structure
**Parameters**
**Returns**: `Object`, Serialized object
