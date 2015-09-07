var ExamGenerator = React.createClass({
	buildNewQuestion: function () {
		return {
			'questionText': '',
			'choices': [
				this.buildNewChoice(1),
				this.buildNewChoice(2)
			],
			'correctAnswers': 1
		};
	},
	buildNewChoice: function (id) {
		return {
			'id': id,
			'choiceText': '',
		};
	},
	getInitialState: function () {
		return {
			'title': '',
			'hours': 1,
			'minutes': 30,
			'allotedTime': 90,
			'questions': [this.buildNewQuestion()]
		};
	},
	addQuestion: function () {
		this.setState({
			'questions': this.state.questions.concat([this.buildNewQuestion()])
		});
	},
	onAddChoice: function (questionIndex) {
		var questions = this.state.questions;
		questions[questionIndex].choices.push(this.buildNewChoice(questions[questionIndex].choices.length + 1));
		this.setState({'questions': questions});
	},
	onToggleChoice: function (questionIndex, choiceIndex) {
		var questions = this.state.questions;
		var choicesNodes = document.getElementsByName('choice' + questionIndex);
		
		var checkedChoices = [];

		for (var i = 0; i < choicesNodes.length; i++) {
			if (choicesNodes[i].checked) {
				checkedChoices.push(choicesNodes[i].dataset.choiceid);
			}
		}

		if (checkedChoices.length == 1) {
			questions[questionIndex].correctAnswers = checkedChoices[0];
		} else {
			questions[questionIndex].correctAnswers = checkedChoices;
		}

		this.setState({'questions': questions});
	},
	onChoiceTextChanged: function (questionIndex, choiceIndex, newValue) {
		var questions = this.state.questions;
		questions[questionIndex].choices[choiceIndex].choiceText = newValue;
		this.setState({'questions': questions});
	},
	onQuestionTextChanged: function (questionIndex, newValue) {
		var questions = this.state.questions;
		questions[questionIndex].questionText = newValue;
		this.setState({'questions': questions});
	},
	handleTitleChange: function (e) {
		this.setState({'title': e.target.value});
	},
	handleHourChange: function (e) {
		var temp = parseInt(e.target.value);

		this.setState({
			'hours': temp,
			'allotedTime': this.state.minutes + (temp * 60)
		});
	},
	handleMinuteChange: function (e) {
		var temp = parseInt(e.target.value);

		this.setState({
			'minutes': temp,
			'allotedTime': temp + (this.state.hours * 60)
		});
	},
	jsonifyExam: function () {
		prompt('Here\'s your exam',JSON.stringify(this.state));
	},
	render: function () {

		var questions = this.state.questions.map(function (question, index) {
			return (
				<Question 
					key={index} 
					index={index} 
					src={question} 
					onQuestionTextChanged={this.onQuestionTextChanged}
					onChoiceTextChanged={this.onChoiceTextChanged}
					onToggleChoice={this.onToggleChoice}
					onAddChoice={this.onAddChoice} />
			);
		}, this);

		return (
			<div className="exam">
				<h1>Exam Generator</h1>
				<div className="exam-header">
					<span>Exam Title</span>
					<input type="text" value={this.state.title} onChange={this.handleTitleChange} />
				</div>
				<div className="exam-header">
					<span>Alloted Time</span>
					<div className="exam-header-time">
						<input type="number" value={this.state.hours} onChange={this.handleHourChange} />
						<span>hours</span>
						<input type="number" value={this.state.minutes} onChange={this.handleMinuteChange} />
						<span>minutes</span>
					</div>
				</div>
				<div className="exam-questions">
					{questions}
				</div>
				<button onClick={this.addQuestion}>Add a Question</button>
				<button onClick={this.jsonifyExam}>JSONify Exam</button>
			</div>
		);
	}
});

var Question = React.createClass({
	addChoice: function () {
		this.props.onAddChoice(this.props.index);
	},
	handleTextChange: function (e) {
		this.props.onQuestionTextChanged(this.props.index, e.target.value);
	},
	handleToggleChoice: function (choiceIndex) {
		this.props.onToggleChoice(this.props.index, choiceIndex);
	},
	handleChoiceTextChange: function (choiceIndex, newValue) {
		this.props.onChoiceTextChanged(this.props.index, choiceIndex, newValue);
	},
	render: function () {
		var choices = this.props.src.choices.map(function (choice, index) {
			return (
				<Choice 
					key={index} 
					index={index}
					src={choice}
					group={this.props.index}
					onToggleChoice={this.handleToggleChoice}
					onChoiceTextChanged={this.handleChoiceTextChange} />
			);
		}, this);

		return (
			<div className="exam-question">
				<span>Question {this.props.src.id}</span>
				<textarea value={this.props.src.questionText} onChange={this.handleTextChange} />
				<div className="exam-question-choices">
					{choices}
					<button onClick={this.addChoice}>Add a Choice</button>
				</div>
			</div>
		);
	}
});

var Choice = React.createClass({
	handleTextChange: function (e) {
		this.props.onChoiceTextChanged(this.props.index, e.target.value);
	},
	toggleChoice: function () {
		this.props.onToggleChoice(this.props.index);
	},
	render: function () {
		return (
			<div>
				<input type="text" value={this.props.src.choiceText} onChange={this.handleTextChange} />
				<input type="checkbox" name={'choice' + this.props.group} data-choiceid={this.props.src.id} onChange={this.toggleChoice} />
				<span>Correct Answer</span>
			</div>
		);
	}
});

React.render(<ExamGenerator />, document.body);