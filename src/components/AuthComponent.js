/* src/AuthComponent.js */
import React from 'react'
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import TodoComponent from './TodoComponent';
import PubSubComponent from './PubSubComponent'

const AuthComponent = ({ signOut, user }) => {
    return (
      <>
        <Button onClick={signOut}>Sign out</Button>
        <PubSubComponent></PubSubComponent>
        <TodoComponent></TodoComponent>
      </>
    );
}

export default withAuthenticator(AuthComponent);