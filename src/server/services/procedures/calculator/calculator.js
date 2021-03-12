/**
 * The Calculator Service generates math problems for the user to solve.
 *
 * @service
 */
const CalculatorService = {};

/* TODO
In the future it would be great to have a way to define how challenges are graded -- a selection of grading schemes
*/
let answerStorage = new Map(); 
/**
 * Test whether the users answer to the math problem was correct
 * 
 * @param {Array} userAnswers Users answers to the math problems.
 * @returns {String} A string representing how many answers were correct.
 */
CalculatorService.checkAnswers = function(userAnswers) {
	const username = this.caller.username;
	var solutions = answerStorage.get(username);
	let num = solutions.length;
	var correct = 0;
	for(var i = 0; i < userAnswers.length; i++) {
		if(userAnswers[i] == solutions[i]) correct++;
	}
    return "You got " + correct + " / " + num + " problems correct.";
};

/**
 * Create a list of random math problems for the user
 * Expects the user to have set up a system to accept problems as a list, solve them/store them in an answers array, and then call the checkAnswer block.
 * @returns {Array} An array of random math problems.
 */
CalculatorService.requestRandomProblems = function() {
	const username = this.caller.username;
	var problems = [];
	var answers = [];
	const ops = ['+', '-', '*', '/'];
	for(var i = 0; i < 20; i++) {
		const chosenOp = ops[Math.floor(Math.random()*ops.length)];
		var first = Math.ceil(Math.random() * 999) * (Math.round(Math.random()) ? 1 : -1);
		var second = Math.ceil(Math.random() * 999) * (Math.round(Math.random()) ? 1 : -1);
		problems.push("(" + first + ") " + chosenOp + " (" + second + ")");
		answers.push(eval(problems[i]));
	}
	answerStorage.set(username, answers);
    return problems;
};

/**
 * Performs tests on the four basic operators. 
 * Expects the user to have set up a system to accept problems as a list, solve them/store them in an answers array, and then call the checkAnswer block.
 * @returns {Array} An array of math problems to test the four basic arithmetic operations (+, -, /, *)
 */
CalculatorService.basicOpsTest = function() {
	const username = this.caller.username;
	var problems = [];
	var answers = [];
	for(var i = 0; i < ops.length; ++i) {
		const ops = ['+', '-', '*', '/'];
		const chosenOp = ops[i];
		var first = Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1);
		var second = Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1);
		problems.push("(" + first + ") " + chosenOp + " (" + second + ")");
		answers.push(eval(problems[i]));
	}
	answerStorage.set(username, answers);
	return problems;
}

module.exports = CalculatorService;