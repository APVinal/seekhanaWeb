import React, {Component} from 'react';

class QuestionPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         questions: []
    //     };
    // }

    // componentDidMount() {
    //     const accessToken = Cookies.get('accessToken');
    //     fetch('/api/questions', {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`
    //             }
    //         }).then(res => {
    //         if (!res.ok) {
    //             throw new Error(res.statusText);
    //         }
    //         return res.json();
    //     }).then(questions =>
    //         this.setState({
    //             questions
    //         })
    //     );
    // }

    render() {
        // const questions = this.state.questions.map((question, index) =>
        //     <li key={index}>{question}</li>
        // );

        return (
            <ul className="question-list">
                Lesson will go here
            </ul>
        );
    }
}


export default QuestionPage;