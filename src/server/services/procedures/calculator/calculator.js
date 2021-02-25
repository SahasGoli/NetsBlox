/**
 * The Calculator Service generates math problems for the user to solve.
 *
 * @service
 */
const CalculatorService = {};

/* TODO
In the future it would be great to have a way to define how challenges are graded -- a selection of grading schemes
--> Ex: Series of checkpoints/unit tests (Correctly does addition, mult, etc...)
Add unit testing for add/sub/mult/divide to see which they pass
NEXT STEPS:
-> Add scoring per user (challenge/response)  with unit testing or scaling difficulty  
-> OR could make student process a list of problems at once and just return a list of which they got correct 
*/
let answerStorage = new Map(); 
/**
 * Test whether the users answer to the math problem was correct
 * 
 * @param {Number} userAnswer Users answer to the math problem.
 * @returns {String} Correctness of answer.
 */
CalculatorService.checkAnswer = function(userAnswer) {
	const username = this.caller.username;
    return userAnswer == answerStorage.get(username) ? "Correct" : "Incorrect";
};

/**
 * Create a random math problem for the user
 * @returns {String} Math problem
 */
CalculatorService.requestRandomProblem = function() {
	const username = this.caller.username;
	const ops = ['+', '-', '*', '/'];
	const chosenOp = ops[Math.floor(Math.random()*ops.length)];
	var first = Math.ceil(Math.random() * 9999) * (Math.round(Math.random()) ? 1 : -1);
	var second = Math.ceil(Math.random() * 9999) * (Math.round(Math.random()) ? 1 : -1);
	var problem = "(" + first + ") " + chosenOp + " (" + second + ")";
	answerStorage.set(username, eval(problem));
    return problem;
};

module.exports = CalculatorService;