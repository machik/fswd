'use strict'

function Question(title, choices, correctAns) {
	this.title = title;
	this.choices = choices;
	this.correctAns = correctAns.toLowerCase();
}

function Player(name) {
	this.name = name;
	this.correctAnswers = 0;
}

function Trivial() {
	this.questions = [];
	this.players = [];
	this.currentPlayerIndex = 0;
}


Trivial.prototype.addQuestion = function(question) {
	this.questions.push(question);
};

Trivial.prototype.addPlayer = function(player) {
	this.players.push(player);
};

Trivial.prototype.nextPlayer = function() {
	if(this.currentPlayerIndex < this.players.length - 1)
		this.currentPlayerIndex++;
	else
		this.currentPlayerIndex = 0;
}

Trivial.prototype.askQuestion = function(question) {
	var playerName = this.players[this.currentPlayerIndex].name;
	var preparedQuestion = playerName + ':\n\n' + question.title + '?' + '\n';
	preparedQuestion += question.choices.reduce(function(acc, v) {
		acc += v;
		acc += '\n';
		return acc;
	}, '');

	var answer = prompt(preparedQuestion).toLowerCase();
	
	if(answer === question.correctAns) {
		this.players[this.currentPlayerIndex].correctAnswers++;
		console.log('Congratulations');
	} else {
		console.log('Wrong answer!');
	}
	this.nextPlayer();
};

Trivial.prototype.play = function() {
	for(var i=0; i<this.questions.length; i++) {
		this.askQuestion(this.questions[i]);
	}
	for(var j=0; j<this.players.length; j++) {
		console.log('The user ' + this.players[j].name + ' scored: ' + this.players[j].correctAnswers + ' points');	
	}
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

var q1 = new Question('Capital of France', ['A - Paris', 'B - Rome'], 'A');
var q2 = new Question('Which scope does JavaScript have', ['A - Functional scope', 'B - Block Scope', 'C - Both'], 'A');
var q3 = new Question('How many nationalities are represented in the course', ['A - 9', 'B - 10'], 'B');
trivial.addQuestion(q1);
trivial.addQuestion(q2);
trivial.addQuestion(q3);

var player1 = new Player('Amy');
var player2 = new Player('Bob');
trivial.addPlayer(player1);
trivial.addPlayer(player2);


// trivial.play();



