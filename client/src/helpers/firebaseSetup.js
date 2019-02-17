import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB9l4buxpHWoMfZEm5zZnTC2xSSlnb7ghI',
  authDomain: 'beta-scf.firebaseapp.com',
  databaseURL: 'https://beta-scf.firebaseio.com',
  projectId: 'beta-scf',
});

const firestore = firebase.firestore(firebaseApp);
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const firebaseInit = Rebase.createClass(firestore);

export default firebaseInit;
