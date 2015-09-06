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
	getInitialState: function () {
		return {
			choices: [
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
	},
	addChoice: function () {

	},
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
					choices, 
					React.createElement("button", {onClick: this.addChoice}, "Add a Choice")
				)
			)
		);
	}
});

var Exam = React.createClass({displayName: "Exam",
	render: function () {
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
					React.createElement(Question, null)
				), 
				React.createElement("button", null, "Add a Question"), 
				React.createElement("button", null, "JSONify Exam")
			)
		);
	}
});

React.render(React.createElement(Exam, null), document.body);