const fs = require("fs");
var input = fs.readFileSync("./data.txt").toString().split(/\n| /);
var afters = {};
var output = "";
var length = 1000;
var previousWord = "";

Array.prototype.getRandom = function(){
	return this[Math.floor(Math.random()*this.length)];
};

for (let i = 0; i < input.length; i++) {
	afters[input[i]] = [];
};

for (let i = 0; i < input.length; i++) {
	if (i == input.length-1) {
		afters[input[i]].push(input[0]);
	} else {
		afters[input[i]].push(input[i+1]);
	};
};

previousWord = input.getRandom();
for (let i = 0; i < length; i++) {
	previousWord = afters[previousWord].getRandom();
	output+=previousWord+" ";
};
fs.writeFileSync("output.txt", output);
console.log(output);
