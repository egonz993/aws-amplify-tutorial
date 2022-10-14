# Hosting
https://dev.d1mzmowthaz1xm.amplifyapp.com/


# Install Global and configure AWS Amplify

```
npm install -g @aws-amplify/cli
```

```
amplify configure
```
> In AWS Create User and Get it Keys


# Create and Start React App

```
npx create-react-app react-amplified
cd react-amplified
npm start
```


# Init Amplify

```
amplify init
```

```
Enter a name for the project (amplified)
The following configuration will be applied:

Project information
| Name: amplified
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? No
Enter a name for the environment (dev)

# Sometimes the CLI will prompt you to edit a file, it will use this editor to open those files.
Choose your default editor

# Amplify supports JavaScript (Web & React Native), iOS, and Android apps
Choose the type of app that you're building (javascript)

What JavaScript framework are you using (react)

Source directory path (src)

Distribution directory path (build)

Build command (npm run-script build)

Start command (npm run-script start)

Select the authentication method you want to use: (Use arrow keys)
❯ AWS profile
  AWS access keys

# This is the profile you created with the `amplify configure` command in the introduction step.
Please choose the profile you want to use (Use arrow keys)
```

### Install Amplify Libraries
```
npm install aws-amplify
npm install @aws-amplify/ui-react
```

### Modify src/index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* AWS Amplify */
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

# Create a GraphQL API and database

```
amplify add api
```

```
? Please select from one of the below mentioned services:
# GraphQL
? Provide API name:
# myapi
? Choose the default authorization type for the API:
# API Key
? Enter a description for the API key:
# demo
? After how many days from now the API key should expire:
# 7 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API:
# No
? Do you have an annotated GraphQL schema?
# No
? Choose a schema template:
# Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now?
# Yes
```

# Deploying the API

```
amplify push
```

```
? Are you sure you want to continue? Y

# You will be walked through the following questions for GraphQL code generation
? Do you want to generate code for your newly created GraphQL API? Y
? Choose the code generation language target: javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions? Y
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
```


# Create the Frontend

This demo implements a Todo List with a basic user/pass AuthUI

### Create the components
```
mkdir src/components
touch src/components/AuthComponent.js
touch src/components/TodoComponent.js
```

### Modify the Auth UI
> AuthComponent.js
```js
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
```

### Modify the Todo List UI
> TodoComponent.js
```js
/* src/TodoComponent.js */
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'


const initialState = { name: '', description: '' }

const TodoComponent = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default TodoComponent
```

### Draw the created components 
> App.js
```js
/* src/App.js */
import React from 'react'
import AuthComponent from './components/AuthComponent'

const App = () => {
  return (<>
    <AuthComponent></AuthComponent>
  </>)
}

export default App
```



# Create an Amplify Host

```
amplify add hosting
```

```
? Select the plugin module to execute: # Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type: # Manual Deployment
```


# Build the App
```
npm run build
```


# Deploy the App
```
amplify publish
```






