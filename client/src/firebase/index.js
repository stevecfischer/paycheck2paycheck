import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { FirebaseConfig } from "../configs";

const config = {...FirebaseConfig};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;

export function firebaseInit(getSavedState = false) {
  auth.signInAnonymously().catch(function(error) {
    console.log(error, 'error');
  });

  auth.onAuthStateChanged(function(user) {
    if (user) {
      return user;
    }
  });

  if(getSavedState) {
    const itemsRef = database.ref('app');
    itemsRef.on('value', snapshot => {
      let state = snapshot.val();
      console.log(state, 'state');

      // let newState = [];
      // for (let item in items) {
      //   newState.push({
      //     id: item,
      //     title: items[item].title,
      //     user: items[item].user,
      //   });
      // }
      // this.setState({
      //   items: newState,
      // });
    });
  }
}

export function pushState(reactState) {
  const itemsRef = database.ref('app');
  const item = {
    state: { ...reactState },
  };
  itemsRef.set(item);
}
