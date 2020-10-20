import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import {   
  reduxFirestore,
  getFirestore,
  createFirestoreInstance  } from 'redux-firestore'
import fbConfig from './config/fbConfig'
import { useSelector  } from 'react-redux'
import { isLoaded  } from 'react-redux-firebase';

// npm install redux react-redux
// Provider lets us to combine react and redux
// thunk lets us to use asynchronous code
// thunk together with applyMiddleware returns a function inside our action creators which can then interact with the DB
// npm install react-redux-firebase redux-firestore


firebase.initializeApp(fbConfig)

firebase.firestore()

const initialState = {}

const store = createStore(
  rootReducer, 
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
}

const rrfProps = {
  firebase,
  // config: fbConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions'
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
      return children
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}> 
        <AuthIsLoaded>
          <App /> 
        </AuthIsLoaded> 
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
