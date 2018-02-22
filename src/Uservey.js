import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');
var config = {
    apiKey: "AIzaSyCQPrsB1XOtRrCbRpWqNcZBOASYwyrEItE",
    authDomain: "uservey-e5c7f.firebaseapp.com",
    databaseURL: "https://uservey-e5c7f.firebaseio.com",
    projectId: "uservey-e5c7f",
    storageBucket: "uservey-e5c7f.appspot.com",
    messagingSenderId: "178890134466"
  };
  firebase.initializeApp(config);

class Uservey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:uuid.v1(),
            studentName:"",
            answers:{
                answer1:'',
                answer2:'',
                answer3:'',
                
            },
            isSubmitted:false
        }
        this.nameSubmit = this.nameSubmit.bind(this);
        this.setAnswer1 = this.setAnswer1.bind(this);
        this.setAnswer2 = this.setAnswer2.bind(this);
        this.setAnswer3 = this.setAnswer3.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    };

    nameSubmit(event){
        var studentName = this.refs.name.value;   
        this.setState({studentName:studentName},(name)=>{
            console.log(this.state.studentName);
        });
    }

    setAnswer1(e){
        var answers = this.state.answers;
        answers.answer1=e.target.value;
        console.log(this.state.answers);
    }

    setAnswer2(e){
        var answers = this.state.answers;
        answers.answer2=e.target.value;
        console.log(this.state.answers);
    }

    setAnswer3(e){
        var answers = this.state.answers;
        answers.answer3=e.target.value;
        console.log(this.state.answers);

    }
    submitAnswer(){
        firebase.database().ref('uServey/'+this.state.uid).set({
            studentName:this.state.studentName,
            answers:this.state.answers
        });
        this.setState({isSubmitted:true});
    }

    render() {
    var studentName;
    var question;      
    if(this.state.studentName === '' && this.state.isSubmitted===false){
        studentName = (<div>
            <h1>Hey Student, let us first know your name: </h1>
        <form  onSubmit={this.nameSubmit}>
            <input className={"namy"} type="text" placeholder="Enter Name" ref="name" />
        </form>
        </div>);
        question=null;
    }
    else if(this.state.name !== '' && this.state.isSubmitted === false){
        studentName = <h1>Hey {this.state.studentName}, Welcome to U-seevey</h1>;
        question =  <div>
                        <h2>questions</h2>
                        <form onSubmit={this.submitAnswer} >
                            <div className="card">
                                What is your age?<br/>
                                <input type="number" name="age" ref="movie" onChange={this.setAnswer1} required/>
                            </div>
                            <div className="card">
                                What is your gender?<br/>
                                <p>
                                <input type="radio" name="gender" value="Male" onChange={this.setAnswer2} required/>Male<br/>
                                <input type="radio" name="gender" value="Female" onChange={this.setAnswer2} required/>Female<br/>                                
                                <input type="radio" name="gender" value="Others" onChange={this.setAnswer2} required/>Others    
                                </p>                    
                            </div>
                            <div className="card">
                                What is your favourite movie?
                                <input type="text" name="movie" ref="movie" onChange={this.setAnswer3} required/>
                            </div>
                            <input type="submit" name="submit" value="Next" />
                        </form>
                    </div>;
    }
    else if(this.state.isSubmitted){
        question=<div>Thanks for your response</div>;
    }
        return (
            <div>
                {studentName}
                -----------------------------------
                {question}
            </div>
        );
    }
}

export default Uservey;