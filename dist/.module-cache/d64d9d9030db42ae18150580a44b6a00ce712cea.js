var Choice = React.createClass({displayName: "Choice",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("span", null, this.props.src.id), 
				React.createElement("input", {type: "text", value: this.props.src.choiceText}), 
				React.createElement("input", {type: "checkbox"})
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
			React.createElement("div", null, 
				React.createElement("span", null, "Q", this.props.src.id), 
				React.createElement("textarea", null), 
				React.createElement("br", null), 
				choices
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
			React.createElement("div", null, 
				"Exam Title", 
				React.createElement("br", null), 
				React.createElement("input", {type: "text"}), 
				React.createElement("br", null), 
				"Alloted Time", 
				React.createElement("br", null), 
				React.createElement("input", {type: "text"}), 
				questions
			)
		);
	}
});

React.render(React.createElement(Exam, null), document.body);