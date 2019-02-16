import React, {Component} from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Form = styled.form`
  margin: 0 auto;
  width: 50%;
  min-width: 400px;
  max-width: 800px;
  text-align: center;
  border: 1px solid #ddd;
  padding-top: 0px;
  padding-bottom: 90px;
  color: black;
  background: white;
`;

const Title = styled.h2`
  margin-top: 40px;
  margin-bottom: 70px;
  font-size: 1.5em;
  color: ${(props) => props.theme.primaryColor};;
  background-color: white;
`;

const Button = styled.button`
  font-size: 1.5em;
  background-color: green;
  color: white;
`;

const Input = styled.input`
  font-size: 1.45em;
  border: 1px solid #ddd;
`;

const theme = {
  secondaryColor: 'white',
  primaryColor: 'yellow',
  borderColor: '#ccc',
};

export default class SignupForm extends Component{

  signUp = (e) => {
    const email = new FormData(e.target).get('email');
    e.preventDefault();
    console.log(`New signup from ${email}`);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <Form onSubmit={this.signUp}>
        <Title>
          Sign up to my newsletter
        </Title>
        <Input type="email" name="email" />
        <Button>Sign up</Button>
      </Form>
      </ThemeProvider>
    );
  }
}
