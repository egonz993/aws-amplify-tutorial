/* src/App.js */
import React from 'react'
import TodoComponent from './components/TodoComponent';
import PubSubComponent from './components/PubSubComponent';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';


const App = ({ signOut }) => {
  return (<>
    <Button onClick={signOut} isFullWidth={true}>Sign out</Button>
    <PubSubComponent></PubSubComponent>
    <TodoComponent></TodoComponent>
  </>)
}

export default withAuthenticator(App)