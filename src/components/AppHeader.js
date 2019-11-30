// Lien Ho Hoang - 2019/11/02

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Jumbotron, Button } from 'reactstrap';

const AppHeader = () => {
  return (
    <Jumbotron>
      <h1 className="display-3">React CRUD List with Firebase</h1>
      <p className="lead">
      <NavLink to='/item' className="App-link"><Button  color="primary" outline block={false}>Add Item</Button></NavLink>
      </p>
    </Jumbotron>
  )
}

export default AppHeader


