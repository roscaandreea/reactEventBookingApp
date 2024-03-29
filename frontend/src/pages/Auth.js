import React, {Component} from 'react';
import './Auth.css';
import AuthContext from '../context/auth_context';

class AuthPage extends Component {
    state ={
		isLoggin: true
    };
    
    static contextType = AuthContext;
    constructor(props){
		super(props);
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
    }
    switchModeHandler = () => {
		this.setState(prevState =>{
			return {isLogin: !prevState.isLogin};
		});
	};
    
    submitHandler = event => {
    	event.preventDefault();
    	const email = this.emailEl.current.value;
    	const password = this.passwordEl.current.value;

    	if(email.trim().length === 0 || password.trim().length ===0){
    		return;
        }
        let reqBody = {
            query: `
              query login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  userId
                  token
                  tokenExpiration
                }
              }
            `,
            variables: {
              email: email,
              password: password
            }
          };
          if (!this.state.isLogin) {
            reqBody = {
                query: `
                     mutation createUser($email: String!,$password: String!) {
                         createUser(userInput: {email: $email, password: $password}) {
                             _id
                             email
                          }
                     }
                     `,
                     variables: {
                       email: email,
                       password: password
                     }

                 };
        };
      fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      }).then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      }).catch(err => {
        console.log(err);
        throw err;  
    });

  };
    render(){
        return (<form className="auth_form" onSubmit={this.submitHandler}>
			<div className="form_control">
				<label htmlFor="email">E-mail</label>
				<input type="email" id="email" ref={this.emailEl} />
            </div>
            <div className="form_control">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" ref={this.passwordEl}  />
            </div>
            <div className="form_actions">
            	<button type="submit">Submit</button>
            	<button type="button" onClick={this.switchModeHandler}>
                    Switch to {this.state.isLogin ? 'SignUp' : 'Login'}
                </button>
            </div>
		</form>);
    }
};
export default AuthPage;