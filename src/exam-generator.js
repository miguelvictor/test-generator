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
				<input type="checkbox" onChange={this.toggleChoice} checked={this.props.src.isCorrect} />
				<span>Correct Answer</span>
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
		var _this = this;

		var choices = this.props.src.choices.map(function (choice, index) {
			return (
				<Choice 
					key={index} 
					index={index}
					src={choice}
					onToggleChoice={_this.handleToggleChoice}
					onChoiceTextChanged={_this.handleChoiceTextChange} />
			);
		});

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

var Exam = React.createClass({
	buildNewQuestion: function () {
		return {
			'questionText': '',
			'choices': [
				{
					'choiceText': '',
					'isCorrect': false
				},
				{
					'choiceText': '',
					'isCorrect': false
				}
			]
		};
	},
	buildNewChoice: function () {
		return {
			'choiceText': '',
			'isCorrect': false
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
		questions[questionIndex].choices.push(this.buildNewChoice());
		this.setState({'questions': questions});
	},
	onToggleChoice: function (questionIndex, choiceIndex) {
		var questions = this.state.questions;
		questions[questionIndex].choices[choiceIndex].isCorrect = !questions[questionIndex].choices[choiceIndex].isCorrect;
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
		alert(JSON.stringify(this.state));
	},
	render: function () {
		var _this = this;
		var questions = this.state.questions.map(function (question, index) {
			return (
				<Question 
					key={index} 
					index={index} 
					src={question} 
					onQuestionTextChanged={_this.onQuestionTextChanged}
					onChoiceTextChanged={_this.onChoiceTextChanged}
					onToggleChoice={_this.onToggleChoice}
					onAddChoice={_this.onAddChoice} />
			);
		});

		return (
			<div className="exam">
				<div className="exam-header">
					<span>Exam Title</span>
					<input type="text" value={this.state.title} onChange={this.handleTitleChange} />
				</div>
				<div className="exam-header">
					<span>Alloted Time</span>
					<div className="exam-header-time">
						<input type="number" onChange={this.handleHourChange} />
						<span>hours</span>
						<input type="number" onChange={this.handleMinuteChange} />
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

React.render(<Exam />, document.body);