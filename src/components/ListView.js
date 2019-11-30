// Lien Ho Hoang - 2019/11/02

import React from 'react'
import ListItem from './ListItem'
import { Container, Row } from 'reactstrap';


function ListView(props) {
  return (
    <Container className="container">
      <Row>
        {props.items && props.items.map((item) => (
          <ListItem key={item.id} item={item} handleEdit={props.handleEdit} handleDelete={props.handleDelete} />
        ))
        }
      </Row>
    </Container>
  )
}

export default ListView


