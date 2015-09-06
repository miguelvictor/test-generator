var Choice = React.createClass({displayName: "Choice",
	handleTextChange: function (e) {
		this.props.onChoiceTextChanged(this.props.index, e.target.value);
	},
	toggleChoice: function () {
		this.props.onToggleChoice(this.props.index);
	},
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("input", {type: "text", value: this.props.src.choiceText, onChange: this.handleTextChange}), 
				React.createElement("input", {type: "checkbox", onChange: this.toggleChoice, checked: this.props.src.isCorrect}), 
				React.createElement("span", null, "Correct Answer")
			)
		);
	}
});

var Question = React.createClass({displayName: "Question",
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
				React.createElement(Choice, {
					key: index, 
					index: index, 
					src: choice, 
					onToggleChoice: _this.handleToggleChoice, 
					onChoiceTextChanged: _this.handleChoiceTextChange})
			);
		});

		return (
			React.createElement("div", {className: "exam-question"}, 
				React.createElement("span", null, "Question ", this.props.src.id), 
				React.createElement("textarea", {value: this.props.src.questionText, onChange: this.handleTextChange}), 
				React.createElement("div", {className: "exam-question-choices"}, 
					choices, 
					React.createElement("button", {onClick: this.addChoice}, "Add a Choice")
				)
			)
		);
	}
});

var Exam = React.createClass({displayName: "Exam",
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
		/*var questions = this.state.questions;
		questions.push(this.buildNewQuestion());
		this.setState({'questions': questions});*/
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
				React.createElement(Question, {
					key: index, 
					index: index, 
					src: question, 
					onQuestionTextChanged: _this.onQuestionTextChanged, 
					onChoiceTextChanged: _this.onChoiceTextChanged, 
					onToggleChoice: _this.onToggleChoice, 
					onAddChoice: _this.onAddChoice})
			);
		});

		return (
			React.createElement("div", {className: "exam"}, 
				React.createElement("div", {className: "exam-header"}, 
					React.createElement("span", null, "Exam Title"), 
					React.createElement("input", {type: "text", value: this.state.title, onChange: this.handleTitleChange})
				), 
				React.createElement("div", {className: "exam-header"}, 
					React.createElement("span", null, "Alloted Time"), 
					React.createElement("div", {className: "exam-header-time"}, 
						React.createElement("input", {type: "number", onChange: this.handleHourChange}), 
						React.createElement("span", null, "hours"), 
						React.createElement("input", {type: "number", onChange: this.handleMinuteChange}), 
						React.createElement("span", null, "minutes")
					)
				), 
				React.createElement("div", {className: "exam-questions"}, 
					questions
				), 
				React.createElement("button", {onClick: this.addQuestion}, "Add a Question"), 
				React.createElement("button", {onClick: this.jsonifyExam}, "JSONify Exam")
			)
		);
	}
});

React.render(React.createElement(Exam, null), document.body);