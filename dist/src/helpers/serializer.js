"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Serializer;
(function (Serializer) {
    function deserialize(classConstructor, json) {
        return Object.assign(new classConstructor(), JSON.parse(json));
    }
    Serializer.deserialize = deserialize;
})(Serializer = exports.Serializer || (exports.Serializer = {}));
//# sourceMappingURL=serializer.js.map