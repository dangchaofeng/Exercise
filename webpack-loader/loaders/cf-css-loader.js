module.exports = function (source) {
    console.log(source, '1');
    console.log(JSON.stringify(source), '222');
    return JSON.stringify(source);
};
