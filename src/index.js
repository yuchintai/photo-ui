import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import {HashRouter, Route, Switch} from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {acct: {email: null, pass: null} };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var acct = Object.assign({}, this.state.acct);

        if (event.target.name === "email") {
            acct.email = event.target.value;
        } else if (event.target.name === "pass") {
            acct.pass = event.target.value;
        }

        this.setState({"acct": acct});
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
          <div className="container"> 
            <Form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="mb-3">Please sign in</h2>
                <FormGroup className="mb-0">
                    <Input type="email" name="email" id="email" placeholder="Email address" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="pass" id="pass" placeholder="Password" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" />{' '}
                        Remember Me
                    </Label>
                </FormGroup>
                <Button color="primary" size="lg" block>Sign in</Button>
            </Form>
          </div>
        );
    }
}

class Order extends React.Component {

    constructor(props) {
		super(props);
        this.state = { files: [] }

		this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  	onDrop(files) {
    	this.setState({files});
  	}
    
	handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

  	render() {
    	return (
          <div className="container"> 
            <Form className="form-signin" onSubmit={this.handleSubmit}>
      		  <section>
        		<div className="dropzone mb-3">
          			<Dropzone onDrop={this.onDrop.bind(this)}>
            			<p>Upload your files by dropping images or click on the square.</p>
          			</Dropzone>
        		</div>
        		<aside>
          			<h2>Uploaded files</h2>
          			<ul>
            		{
             			this.state.files.map(f => <div key={f.name}><img width="300px" src={f.preview}/>{f.name} - {f.size} bytes</div>)
            		}
          			</ul>
        		</aside>
         		<FormGroup>
          			<Label for="description">Description</Label>
          			<Input type="textarea" name="text" id="description" />
        		</FormGroup>
      		  </section>
              <Button color="primary" size="lg" block>Checkout</Button>
  		    </Form>
		  </div>
    	);
  	}
}

class App extends React.Component {
	
	constructor(props) {
		super(props);
        this.state = {isLogin: false};
                    
	}

	render() {
		return (
            <Order/>
		);
	}
}


ReactDOM.render((
    <HashRouter> 
        <Switch>
            <Route exact path="/login" name="Login Page" component={Login}/>
            <Route exact path="/order" name="Order Page" component={Order}/>
            <Route path="/" name="Home" component={App}/>
        </Switch> 
    </HashRouter> 
), document.getElementById('root'))

