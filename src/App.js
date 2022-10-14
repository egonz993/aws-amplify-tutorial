/* src/App.js */
import React from 'react'
import AuthComponent from './components/AuthComponent'
import TodoComponent from './components/TodoComponent'

/* AWS SDK */
// import awsExports from "../aws-exports";
// Amplify.configure(awsExports);

const App = () => {
  return (<>
    {/* <TodoComponent></TodoComponent> */}
    <AuthComponent></AuthComponent>
  </>)
}


export default App