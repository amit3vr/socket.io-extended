'use strict';

var Socketio    = require('socket.io');

/*
 * extend socket.io functionality with simple
 * ..chained interface.
 *
 * @TODO: test, fix & improve
 *
 * @package socket.io-extended
 * @author  amit3vr
 */

module.exports = function(srv, opts)
{
    var io = new Socketio(srv, opts);

    /* X is for eXtended! */

    function XNamespace(nspPath)
    {
        this.path = nspPath;
        this.nsp = io.of(this.path || '/', null);
    }

    XNamespace.prototype.room = function(roomId)
    {
        return new XRoom(roomId, this.path)
    };

    function XRoom(roomId, nsp)
    {
        this.nsp = io.of(nsp || '/', null).in(roomId);
        this.room = this.nsp.adapter.rooms[roomId];
        this.sockets = [];
    }

    XRoom.prototype.getSockets = function(useCache)
    {
        if(useCache === true && this.sockets != [])
        {
            return this.sockets;
        }

        if(!this.room)
        {
            return [];
        }

        var sockets = this.room.sockets;

        for(var socket in sockets)
        {
            if (sockets.hasOwnProperty(socket) && sockets[socket])
            {
                this.sockets.push(this.nsp.sockets[socket]);
            }
        }

        return this.sockets;
    };

    io.namespace =
        io.nsp = function(nspPath)
        {
            return new XNamespace(nspPath);
        };

    io.room = function(roomId)
    {
        return new XRoom(roomId);
    };

    return io;
};