var Choice = React.createClass({displayName: "Choice",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("span", null, this.props.choice.id), 
				React.createElement("input", {type: "text", value: this.props.choice.choiceText}), 
				React.createElement("input", {type: "checkbox"})
			)
		);
	}
});

var Question = React.createClass({displayName: "Question",
	getInitialState: function () {
		return {
			choices: [
				{
					'id': 'a',
					'choiceText': ''
				},
				{
					'id': 'b',
					'choiceText': ''
				}
			]
		};
	},
	render: function () {
		var choices = this.state.choices.map(function (choice) {
			return (
				React.createElement(Choice, {choice: choice})
			);
		});
		return (
			React.createElement("div", null, 
				React.createElement("span", null, "Q", this.props.id), 
				React.createElement("textarea", null), 
				React.createElement("br", null), 
				choices
			)
		);
	}
});

var Exam = React.createClass({displayName: "Exam",
	render: function () {
		var questions = '';
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