<!DOCTYPE html>
<html>
	<head>
		<style>
			* {
				box-sizing: border-box;
			}
			textarea {
				width: 50%;
				height: calc(100vh - 220px);
				resize: none;
			}
			#input {
				float: left;
			}
			#storyLength {
				width: 100px;
			}
			#generateButton {
				width: 50%;
			}
			body {
				background-color: cornsilk;
				margin: 0;
				white-space: nowrap;
			}
			#startingWord {
				width: 20%;
			}
		</style>
		<script>
			Array.prototype.getRandom = function(){
				return this[Math.floor(Math.random()*this.length)];
			};
			function generate() {
				let input = document.getElementById("input").value;
				switch (document.getElementById("inputType").value) {
					case "words":
						input = input.split(/\n| /);
					break;
					case "letters":
						input = input.split("");
					break;
					case "lines":
						input = input.split("\n");
					break;
				};
				let afters = {};
				let output = "";
				let previousWord = "";
				
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
				
				if (document.getElementById("startingWord").value == "") {
					previousWord = input.getRandom();
				} else {
					previousWord = document.getElementById("startingWord").value;
				};
				
				switch (document.getElementById("inputType").value) {
					case "words":
						output = previousWord+" ";
					break;
					case "letters":
						output = previousWord;
					break;
					case "lines":
						output = previousWord+"\n";
					break;
				};
				
				for (let i = 0; i < document.getElementById("storyLength").valueAsNumber; i++) {
					previousWord = afters[previousWord].getRandom();
					switch (document.getElementById("inputType").value) {
						case "words":
							output+=previousWord+" ";
						break;
						case "letters":
							output+=previousWord;
						break;
						case "lines":
							output+=previousWord+"\n";
						break;
					};
				};
				document.getElementById("output").value = output
			};
			function loadFile(filename) {
				fetch(filename).then((resp) => resp.text()).then(function(data) {
					document.getElementById("input").value = data;
				});
			};
			function inputKeyUp() {
				if (document.getElementById("updateOnTypeCheckbox").checked) {
					generate();
				};
			};
		</script>
	</head>
	<body>
		<h1>Story lengthener</h1>
		<hr>
		<label>Datasets:</label>
			<button onclick="loadFile('./datasets/bob.txt');">Bob</button>
			<button onclick="loadFile('./datasets/do_now.txt');">Do now</button>
			<button onclick="loadFile('./datasets/html.txt');">HTML</button>
			<button onclick="loadFile('./datasets/essay.txt');">Essay</button>
			<button onclick="loadFile('./datasets/quotes.txt');">Quotes</button>
		<hr>
		<label>Settings:</label>
		<input type="checkbox" id="updateOnTypeCheckbox" checked>
		<label for="updateOnTypeCheckbox">Update on type</label>
		<label>|</label>
		<label for="inputType">Input type:</label>
		<select id="inputType">
			<option value="words">Words</option>
			<option value="letters">Letters</option>
			<option value="lines">Lines</option>
		</select>
		<hr>
		<textarea id="input" onkeyup="inputKeyUp();" placeholder="type stuff"></textarea>
		<textarea id="output" readonly></textarea><br>
		<label for="storyLength">Story length (words):</label>
		<input type="number" id="storyLength" value=100>
		<button onclick="generate();" id="generateButton">Generate</button>
		<label for="startingWord">Starting word:</label>
		<input id="startingWord" placeholder="word">
	</body>
</html>
