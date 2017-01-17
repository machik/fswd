'use strict'

function Question(title, choices, correctAns, category) {
	this.title = title;
	this.choices = choices;
	this.correctAns = correctAns.toLowerCase();
	this.category = category;
}

function Player(name) {
	this.name = name;
	this.correctAnswers = 0;
}

function Trivial() {
	this.questions = [];
	this.players = [];
	this.currentPlayerIndex = 0;
	this.categories = [];
}


Trivial.prototype.addQuestion = function(question) {
	if(this.categories.indexOf(question.category) === -1)
		this.categories.push(question.category);
	this.questions.push(question);
};

Trivial.prototype.addPlayer = function(player) {
	this.players.push(player);
};

Trivial.prototype.nextPlayer = function() {
	// Airbnb style
	if(this.currentPlayerIndex < this.players.length - 1) {
		this.currentPlayerIndex++;
		return;
	}
	this.currentPlayerIndex = 0;
}

Trivial.prototype.prepareQuestion = function(question) {
	var playerName = this.players[this.currentPlayerIndex].name;
	var preparedQuestion = playerName + ':\n\n' + question.title + '?' + '\n';
	return preparedQuestion + question.choices.join('\n');
};

Trivial.prototype.askQuestion = function(question) {	
	var message = this.prepareQuestion(question);
	var answer = prompt(message).toLowerCase();
	
	if(answer === question.correctAns) {
		this.players[this.currentPlayerIndex].correctAnswers++;
		console.log('Congratulations');
	} else {
		console.log('Wrong answer!');
	}
	this.nextPlayer();
};

Trivial.prototype.askForCategories = function() {
	var message = 'Hei what category do you want to play?\n';
	return message + this.categories.join('\n');
};

Trivial.prototype.normalGame = function(questions) {		
	questions.forEach(this.askQuestion.bind(this));
}

Trivial.prototype.repetitiveGame = function(questions) {
	for(var i=0; i<questions.length; i++) {		
		this.askQuestion(questions[i]);
		this.askQuestion(questions[i]);
	}
};

Trivial.prototype.getResults = function() {
	var winner;
	var bestScore = 0;
	for(var i=0; i<this.players.length; i++) {
		if(this.players[i].correctAnswers >= bestScore) {
			winner = this.players[i];
			bestScore = winner.correctAnswers;
		}
		console.log('The user ' + this.players[i].name + ' scored: ' + this.players[i].correctAnswers + ' points');	
	}

	console.log('CONGRATULATIONS ' + winner.name + ' you\'ve won!!!!!!🎉🎉🎉🎉🎉');
	
};

Trivial.prototype.play = function() {
	do { var category = prompt(this.askForCategories());}
	while(this.categories.indexOf(category) === -1)

	do { var mode = prompt('Do you want to play repetitive mode??\nYes \nNo').toLowerCase();}
	while(['yes', 'no'].indexOf(mode) === -1);
	
	var questions = this.questions.filter(function(question) {
		return question.category === category;
	});
	questions = shuffleQuestions(questions);

	
	if(mode === 'yes')
		this.repetitiveGame(questions);
	else
		this.normalGame(questions);
	
	// We print the result of the game
	this.getResults();
};

Trivial.prototype.setPlayers = function() {
	var newPlayerName = prompt('Hei, new player give me your naaaaaaame!!!!');
	while(newPlayerName !== '') {
		var player = new Player(newPlayerName);
		if(newPlayerName) {
			this.addPlayer(player);
			console.log("Welcome to the game " + newPlayerName + '!!');
		}
		newPlayerName = prompt('Hei, new player give me your naaaaaaame!!!!');
	}
};





var trivial = new Trivial();

var q1 = new Question('Capital of France', ['A - Paris', 'B - Rome'], 'A', 'Geography');
var q2 = new Question('Which scope does JavaScript have', ['A - Functional scope', 'B - Block Scope', 'C - Both'], 'A', 'JavaScript');
var q3 = new Question('How many nationalities are represented in the course', ['A - 9', 'B - 10'], 'B', 'Random');
var q4 = new Question('Capital of Bulgaria', ['A - Varna', 'B - Sofia'], 'B', 'Geography');
var q5 = new Question('Capital of Spain', ['A - Madrid', 'B - Barcelona'], 'A', 'Geography');
var q6 = new Question('Is JavaScript the same or a relative to Java', ['A - Yes', 'B - No'], 'B', 'JavaScript');

trivial.addQuestion(q1);
trivial.addQuestion(q2);
trivial.addQuestion(q3);
trivial.addQuestion(q4);
trivial.addQuestion(q5);
trivial.addQuestion(q6);

var player1 = new Player('Amy');
var player2 = new Player('Bob');
trivial.addPlayer(player1);
trivial.addPlayer(player2);


// trivial.play();		

function shuffleQuestions(questions) {
	var shuffledArray = [];
	var shuffledNumbers = randomNumbersRange(questions.length);

	shuffledNumbers.forEach(function(number) {
		shuffledArray.push(questions[number])
	});

	return shuffledArray;	
};

function randomNumbersRange(max) {
	if(!max) return;

	var output = [];
	while(output.length < max) {
		var randomNumber = Math.floor(Math.random() * max);
		if(output.indexOf(randomNumber) === -1)
			output.push(randomNumber);		
	}
	return output;
}