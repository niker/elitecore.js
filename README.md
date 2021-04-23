# elitecore.js
Hair-retaining helper libraries for C# developers delving into modern javascript.

# LINQ for JavaScript
Most used LINQ-like commands at your fingertips. It's not lazy-evaluated so you don't need ToList().
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
Is there any item in the list?
```
list.QAny();
//> true
```
Any item starts with 't'?
```
list.QAny(i => i.code.startsWith('t'));
//> true
```

#### QAll
Do all items contain a code?
```
list.QAll(i => !!i.code);
//> true
```

#### QWhere
Get all items that start with 'a'.
```
list.QWhere(i => i.code.startsWith('a'));
//> [{id: 3, code: 'another3'}, {id: 4, code: 'another4'}]
```

#### QFirstOrDefault
Get the first item with id = 2 or *null* if not found.
```
list.QFirstOrDefault(i => i.id === 2);
//> {id: 2, code: 'test2'}
```
Get the first item with id = 5 or *null* if not found.
```
list.QFirstOrDefault(i => i.id === 5);
//> null
```

#### QFirstIndex
Get the *index* of first item that starts with 'a' or *null* if not found.
```
list.QFirstIndex(i => i.code.startsWith('a'));
//> 2
```

#### QOrderBy
Order items by code.
```
list.QOrderBy(i => i.code);
//> [{id: 3, code: 'another3'}, {id: 4, code: 'another4'}, {id: 1, code: 'test1'}, {id: 2, code: 'test2'}]
```
Order items by id descending.
```
list.QOrderBy(i => i.id, true);
//> [{id: 4, code: 'another4'}, {id: 3, code: 'another3'}, {id: 2, code: 'test2'}, {id: 1, code: 'test1'}]
```

#### QRemoveAll
Remove all items where id = 2 and return the modified list.
```
list.QRemoveAll(i => i.id === 2);
//> [{id: 1, code: 'test1'}, {id: 3, code: 'another3'}, {id: 4, code: 'another4'}]
```

#### QCount
Count all items that start with 'a'.
```
const countItemsStartingWithA = list.QCount(i => i.code.startsWith('a'));
//> 2
```

# String utils for JavaScript
Most used C#-like commands at your fingertips. 
Works fine with VUE3.

## Import
Import or include the library, it will inject into global context.
```
import './elitecore/elitecore-string';
```
## Usage
#### Declare data
```
const str = 'my test string';
```

#### String.Equals
Returns *true* if two objects match. Objects of string type support case insensitivity switch, default is case sensitive.
```
String.Equals(str, 'my test string');
//> true

String.Equals(str, 'MY test string', true);
//> true
```

#### String.IsNullOrEmpty
Returns *true* if string is null, undefined or empty.
```
String.IsNullOrEmpty('');
//> true

String.IsNullOrEmpty(' ');
//> false
```

#### String.IsNullOrWhitespace
Returns *true* if string is null, undefined, empty or whitespace.
```
String.IsNullOrWhitespace(null);
//> true

String.IsNullOrWhitespace(' ');
//> true

String.IsNullOrWhitespace('a');
//> false
```

#### String.EmptyToNull
Returns *null* if string is null, undefined or empty, otherwise returns the string.
```
String.EmptyToNull('');
//> null

String.EmptyToNull('a');
//> 'a'
```

#### String.WhitespaceToNull
Returns *null* if string is null, undefined, empty or whitespace, otherwise returns the string.
```
String.WhitespaceToNull('   ');
//> null

String.WhitespaceToNull('a');
//> 'a'
```

#### String.IsNull
Not just for strings. Returns *true* if object is null or undefined but ignores other untruthy values.
```
String.IsNull(false);
//> false

String.IsNull(undefined);
//> true

String.IsNull(null);
//> true
```


#### String.Concat
Returns a concatenated string, null and undefined are treated as empty string.
```
String.Concat('my', null, 'string');
//> 'mystring'
```

#### String.prototype.StartsWith
Starts with that supports case insensitivity switch. Default is case sensitive.
```
'mystring'.StartsWith('MY', true);
//> true
```

#### String.TryParse
Parses arbitrary string into many supported types (string, int, long, float, decimal, double, guid, timestamp, date, datetime). Any number but int parses to Number, long is floored.
Returns null if parsing fails.
```
String.TryParse('int', '1337.5');
//> 1337

String.TryParse('decimal', '1337.5');
//> 1337.5

String.TryParse('guid', '5de4f0e3dcd44cd5a3df5990f7156b55');
//> '5de4f0e3-dcd4-4cd5-a3df-5990f7156b55'

String.TryParse('guid', '55e3');
//> null
```
Parses many of US/EU DateTime formats into a timestamp. Not perfect worldwide but good enough for parsing date pickers.
```
String.TryParse('timestamp', '1.1.2000');
//> 111111111111111

String.TryParse('datetime', '1.1.2000');
//> new Date('111111111111111')
```

#### Function.prototype.NameOf
Extracts a name from function pointer at runtime to allow rename refactoring.
```
myFunction.NameOf();
//> 'myFunction'
```

# Crypto utils for JavaScript
Most used Crypto commands at your fingertips. 
Works fine with VUE3.

## Import
Import or include the library, it will inject into global context.
```
import './elitecore/elitecore-crypto';
```
## Usage
#### Crypto.RandomInt
Create a cryptographically-strong random number.
```
const list = ['a','b','c'];
const rndIndex = Crypto.RandomInt(0, list.length - 1);
list[rndIndex];
//> I'm no oracle...
```
