module.exports = {
    main: function(obj) {
        console.log("CORE LOADED Yo!");
        this.test('test');
    },
    test: function(str) {
        console.log(str);
    }
};