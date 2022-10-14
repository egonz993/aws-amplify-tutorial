/* src/AuthComponent.js */
import React from 'react'
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import TodoComponent from './TodoComponent';

const AuthComponent = ({ signOut, user }) => {
    console.log(user)
    return (
      <>
        <Button onClick={signOut}>Sign out</Button>
        <TodoComponent></TodoComponent>
      </>
    );
}

export default withAuthenticator(AuthComponent);