let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"];
let options = [
	[1, ".", ",", "?", "!"],
	[2, "a", "b", "c", "@"],
	[3, "d", "e", "f", '"', "'"],
	[4, "g", "h", "i", "(", ")"],
	[5, "j", "k", "l", "/"],
	[6, "m", "n", "o", "-"],
	[7, "p", "q", "r", "s"],
	[8, "t", "u", "v", ":"],
	[9, "w", "x", "y", "z"],
	["*", "_"],
	[0, "+"],
	["#", ";"],
];

let prev = -1;
let count = 0;
let status = 0;
let timer;

const display = (val) => {
	let current = document.getElementById("responseArea"); //current text
	let str = current.innerText;

	str = str.substr(0, str.length - 1); //substring of current text without last character
	clearTimeout(timer);

	if (val == "AC") {
		//reset all values on Click of AC
		current.innerText = "Enter a number";
		prev = -1;
		count = 0;
		status = 0;
	} else if (val == "C") {
		//delete last element on click of C
		//if length of text becomes 0, reset all values
		if (str.length == 0 || status == 0) {
			current.innerText = "Enter a number";
			prev = -1;
			status = 0;
		} else current.innerText = str;

		//count of clicks on previous element is made zero
		count = 0;
	} else {
		let size = options[val - 1].length; //total elements of currently clicked button
		let num = options[val - 1][count]; //exact value of current button based on total continous clicks within 1second

		if (prev == -1 || prev != val) {
			num = options[val - 1][0]; //if a new button is clicked then append value of that button to current text
			current.innerText = status ? current.innerText + num : num;
			count = 1;
			prev = val;
		} else {
			current.innerText = str + num; //if same button is clicked within 1 second, replace last character based on count of clicks
			count++;
		}

		count %= size;
		status = 1;
	}

	timer = setTimeout(() => {
		count = 0;
		prev = -1;
	}, 1000); //a timer which resets count value if same button is not clicked within 1second
	//if the button is clicked within time then this timeout is cleared at the start of this function
};
