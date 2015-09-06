var Choice = React.createClass({displayName: "Choice",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("input", {type: "text", value: this.props.src.choiceText}), 
				React.createElement("input", {type: "checkbox"}), 
				React.createElement("span", null, "Mark as correct answer")
			)
		);
	}
});

var Question = React.createClass({displayName: "Question",
	render: function () {
		var choices = this.props.src.choices.map(function (choice) {
			return (
				React.createElement(Choice, {src: choice})
			);
		});
		return (
			React.createElement("div", {className: "exam-question"}, 
				React.createElement("span", null, "Question ", this.props.src.id), 
				React.createElement("textarea", null), 
				React.createElement("div", {className: "exam-question-choices"}, 
					choices
				)
			)
		);
	}
});

var Exam = React.createClass({displayName: "Exam",
	getInitialState: function () {
		return {
			questions: [
				{
					'id': 1,
					'questionText': '',
					'choices': [
						{
							'id': 'a',
							'choiceText': ''
						},
						{
							'id': 'b',
							'choiceText': ''
						}
					]
				}
			]
		};
	},
	render: function () {
		var questions = this.state.questions.map(function (question) {
			return React.createElement(Question, {src: question});
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
				)
			)
		);
	}
});

React.render(React.createElement(Exam, null), document.body);