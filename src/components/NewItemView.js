// Lien Ho Hoang - 2019/11/02

import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import FormDetail from './FormDetail'

class NewItemView extends React.Component {

  handleFormSubmit = item => {
    this.props.handleAdd(item)
    this.props.history.push('/')
  };

  handleCancel = event => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Container className="container">
        <Row className="title">Add Item</Row>
        <Row>
          <Col>
            <FormDetail item={{name:'',detail:''}} handleCancel={this.handleCancel} handleFormSubmit={this.handleFormSubmit} />
          </Col>

        </Row>
      </Container>

    )
  }

}

export default NewItemView
