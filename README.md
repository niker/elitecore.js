# elitecore.js
Hair-retaining helper libraries for C# developers delving into javascript.

# LINQ for JavaScript
Most used LINQ-like commands at your fingertips. 
Works fine with VUE3.

## Import
Import or include the library, it will inject into arrays globally.
```
import './elitecore/elitecore-linq';
```
## Usage
#### Declare data
```
const list = [{id: 1, code: 'test1'}, {id: 2, code: 'test2'}, {id: 3, code: 'another3'}, {id: 4, code: 'another4'}];
```

#### QAny
```
const isThereAnyItem = list.QAny();
//> true
```

```
const isThereAnyItemThatDoesntStartWithT = list.QAny(i => !i.code.startsWith('t'));
//> true
```

#### QAll
```
const doAllItemsHaveACode = list.QAll(i => !!i.code);
//> true
```

#### QWhere
```
const getAllItemsStartingWithA = list.QWhere(i => i.code.startsWith('a'));
//> [{id: 3, code: 'another3'}, {id: 4, code: 'another4'}]
```

#### QFirstOrDefault
```
const getItemWithId2 = list.QFirstOrDefault(i => i.id === 2);
//> {id: 2, code: 'test2'}
```

```
const getItemWithId5 = list.QFirstOrDefault(i => i.id === 5);
//> null
```

#### QFirstIndex
```
const getIndexOfFirstItemStartingWithA = list.QFirstIndex(i => i.code.startsWith('a'));
//> 2
```

#### QOrderBy
```
const orderAlphabetically = list.QOrderBy(i => i.code);
//> [{id: 3, code: 'another3'}, {id: 4, code: 'another4'}, {id: 1, code: 'test1'}, {id: 2, code: 'test2'}]
```

```
const orderByIdDescending = list.QOrderBy(i => i.id, true);
//> [{id: 4, code: 'another4'}, {id: 3, code: 'another3'}, {id: 2, code: 'test2'}, {id: 1, code: 'test1'}]
```

#### QRemoveAll
```
const removeItemWithId2 = list.QRemoveAll(i => i.id === 2);
//> [{id: 1, code: 'test1'}, {id: 3, code: 'another3'}, {id: 4, code: 'another4'}]
```

#### QCount
```
const countItemsStartingWithA = list.QCount(i => i.code.startsWith('a'));
//> 2
```




