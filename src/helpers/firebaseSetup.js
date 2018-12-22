import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/firestore';

var app = firebase.initializeApp({
  apiKey: 'AIzaSyB9l4buxpHWoMfZEm5zZnTC2xSSlnb7ghI',
  authDomain: 'beta-scf.firebaseapp.com',
  databaseURL: 'https://beta-scf.firebaseio.com',
  projectId: 'beta-scf'
});

var firestore = firebase.firestore(app);
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var firebaseInit = Rebase.createClass(firestore);

export default firebaseInit;
