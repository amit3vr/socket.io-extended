# socket.io-extended

a simple, intuitive interface utility that extends the regular, complicated socket.io interface.

*honoring the KISS principle; Keep it simple, stupid!*

https://www.npmjs.com/package/socket.io-extended

#### simply replace

    var io = require('socket.io')([srv, opts]);

#### with

    var io = require('socket.io-extended')([srv, opts]);

### features

  - chanined interface
  - easy to use and understand
  - save many unwanted code complication and fiddling in the socket.io docs and lib files (talking from experience...)
  - compact and minimal


### Version

1.0.1

### Dependencies
* [socket.io^1.4.5](https://www.npmjs.com/package/socket.io)

### Installation

    npm install socket.io-extended

## How to use

#### get namespace interface:
```
io.nsp('/')
-- or --
io.namespace('/')
```

#### get room interface:
```
var room = io.nsp('/').room('my_room')
-- or --
var room = io.room('my_room') /* '/' = default nsp */
```
*incase the room/namespace doesn't exists - it'll dynamically create a new one for you using the built in socket.io logic - so you don't have to worry about exceptions.*

#### get clients in a specific room
```
io.nsp('/').room('my_room').getSocket();
```

*it returns array of socket objects, so you can access all the attributes you set to a specific client.*

```
var _     = require('underscore');
var room  = io.room('my_room');

var users = _.map(room.getSockets(), function(s)
{
   return s.User.toJSON();
});
```

Side Notes
---
this is a very early release. un-tested, with very few logic and minimal interface.

i've started this package because of the frustration of working with the new interface that socket.io introduced in their 1.X versions.

while i do have some great ideas for the interface - this package is still in development - so keep that in mind if you decide to use it in your project.

Want to Contribute?
----
### Todos

 - **Write tests & check for bugs**
 - Add code cocumentation
 - Any ideas / new helpful features to the interface are very much welcomed

### License
MIT