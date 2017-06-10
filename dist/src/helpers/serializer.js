export var Serializer;
(function (Serializer) {
    function deserialize(classConstructor, json) {
        return Object.assign(new classConstructor(), JSON.parse(json));
    }
    Serializer.deserialize = deserialize;
})(Serializer || (Serializer = {}));
//# sourceMappingURL=serializer.js.map