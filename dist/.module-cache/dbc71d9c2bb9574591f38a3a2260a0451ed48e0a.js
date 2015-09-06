var Choice = React.createClass({displayName: "Choice",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("input", {type: "text"}), 
				React.createElement("input", {type: "checkbox"}), 
				React.createElement("span", null, "Correct Answer")
			)
		);
	}
});

var Question = React.createClass({displayName: "Question",
	addChoice: function () {

	},
	render: function () {
		var choices = this.props.src.choices.map(function (choice) {
			return (
				React.createElement(Choice, {key: choice.id, src: choice})
			);
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
	getInitialState: function () {
		return {
			'questions': [
				{
					'id': 1,
					'questionText': '',
					'choices': [
						{
							'id': 1,
							'choiceText': ''
						},
						{
							'id': 2,
							'choiceText': ''
						}
					]
				}
			]
		};
	},
	addQuestion: function () {
		var newId = this.state.questions.length + 1;
		var questions = this.state.questions;
		questions.push({'id': newId, 'questionText': ''});
		this.setState({'questions': questions});
	},
	jsonifyExam: function () {
		alert(JSON.stringify(this.state.questions));
	},
	render: function () {
		var questions = this.state.questions.map(function (question) {
			return React.createElement(Question, {key: question.id, src: question});
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