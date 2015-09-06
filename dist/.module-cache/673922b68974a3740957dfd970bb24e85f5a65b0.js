var Choice = React.createClass({displayName: "Choice",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("input", {type: "text", value: this.props.src.choiceText}), 
				React.createElement("input", {type: "checkbox"}), 
				React.createElement("span", null, "Correct Answer")
			)
		);
	}
});

var Question = React.createClass({displayName: "Question",
	addChoice: function () {
		alert(typeof this.props.handleAddChoice);
		this.props.handleAddChoice(this.props.index);
	},
	render: function () {
		var choices = this.props.src.choices.map(function (choice, index) {
			return React.createElement(Choice, {key: index, src: choice});
		});

		return (
			React.createElement("div", {className: "exam-question"}, 
				React.createElement("span", null, "Question ", this.props.src.id), 
				React.createElement("textarea", null), 
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
			'allotedTime': 90,
			'questions': [this.buildNewQuestion()]
		};
	},
	addQuestion: function () {
		var questions = this.state.questions;
		questions.push(this.buildNewQuestion());
		this.setState({'questions': questions});
	},
	onAddChoice: function (key) {
		var questions = this.state.questions;
		questions[key].choices.push(this.buildNewChoice());
		this.setState({'questions': questions});
	},
	onToggleChoice: function () {

	},
	jsonifyExam: function () {
		alert(JSON.stringify(this.state.questions));
	},
	render: function () {
		var questions = this.state.questions.map(function (question, index) {
			return (
				React.createElement(Question, {
					key: index, 
					index: index, 
					src: question, 
					onToggleChoice: this.onToggleChoice, 
					onAddChoice: this.onAddChoice})
			);
		});

		return (
			React.createElement("div", {className: "exam"}, 
				React.createElement("div", {className: "exam-header"}, 
					React.createElement("span", null, "Exam Title"), 
					React.createElement("input", {type: "text"})
				), 
				React.createElement("div", {className: "exam-header"}, 
					React.createElement("span", null, "Alloted Time"), 
					React.createElement("input", {type: "text"})
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