import React from 'react'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import TodoComponent from './TodoComponent';

const AuthComponent = ({ signOut, user }) => {
    // Todo logic here
    console.log(user)
    return (
      <>
        <Button onClick={signOut}>Sign out</Button>
        <TodoComponent></TodoComponent>
      </>
    );
}

export default withAuthenticator(AuthComponent);