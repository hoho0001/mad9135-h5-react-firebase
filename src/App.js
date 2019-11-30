// Lien Ho Hoang - 2019/11/30

import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import firebase from "./components/FireStore";
import cuid from 'cuid';

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ListView from './components/ListView'
import NewItemView from './components/NewItemView';
import './App.css'

var db = firebase.firestore();
var categoriesRef = db.collection("courses");


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      isLoading: true
    }
  }

  componentDidMount() {

    categoriesRef.get().then(snapshot => {
      if (snapshot) {
        let courses = []
        snapshot.forEach(course => {
          courses.push({ id: course.id, ...course.data() })
        })
        this.buildList(courses)

      }
    }).catch(error => {
      // Handle the error
      console.log("Error getting documents: ", error);
    })

  }

  buildList = (data) => {
    this.setState({
      list: data,
      isLoading: false
    })
  }

  addItem = (item) => {
    item.id = cuid()
    let newList = this.state.list.concat(item) // OR list.push(item)  add new value to the ending of the existing array
    // this.setState({ list: [item, ...this.state.list] }) // add new value to the beginning of the existing array

    categoriesRef
      .doc(item.id).set({
        name: item.name,
        detail: item.detail
      });

    this.buildList(newList)
  }

  editItem = (item) => {
    if (item) {
      let newList = this.state.list
      const index = newList.findIndex((e) => e.id === item.id)
      if (index !== -1) {
        newList[index] = item
        categoriesRef
          .doc(item.id).update({
            name: item.name,
            detail: item.detail
          })
          .then(function () {
            console.log("Successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating: ", error);
          });
        this.buildList(newList)
      }
    }
  }

  deleteItem = (targetItem) => {
    // remove item in this.state.list
    let newList = this.state.list.filter(item => item.id !== targetItem.id)

    categoriesRef
      .doc(targetItem.id)
      .delete()
      .then(function () {
        console.log(`Deleted`);
      })
      .catch(function (error) {
        console.log(error);
      })

    // Update State
    this.buildList(newList)
  }


  render() {
    return (
      (this.state.isLoading) ? <div>Loading</div> :
        <HashRouter basename='/'>
          <div className="App">
            <AppHeader />
            <Switch>
              <Route path={`/item`} render={(props) => <NewItemView {...props} handleAdd={this.addItem} />} />
              <Route exact path='/' render={(props) => <ListView {...props} items={this.state.list} handleDelete={this.deleteItem} handleEdit={this.editItem} />} />
            </Switch>
            <AppFooter />
          </div>

        </HashRouter>
    );
  }
}

export default App;
