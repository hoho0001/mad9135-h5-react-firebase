// Lien Ho Hoang - 2019/11/02

import React from 'react'
import { Col, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import FormDetail from './FormDetail'

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item.id,
      name: props.item.name,
      detail: props.item.detail,
      status: props.item.status
    }
  }

  toggle = (ev) => {
    let item = { ...this.state }
    item.status = (item.status === 'edit') ? 'read' : 'edit'
    this.setState({ ...item })
  }

  handleFormSubmit = event => {
    let item = {
      id: this.state.id,
      name: event.name,
      detail: event.detail,
      status: 'read'
    }
    this.setState(item)
    this.props.handleEdit(item)

  };

  handleCancel = event => {
    this.setState({
      status: 'read', 
      name: this.props.item.name,
      detail: this.props.item.detail,
    })
  }
  handleDelete = event => {
    if (window.confirm("Do you want to remove the item?")) {
      this.props.handleDelete(this.props.item)
    }
  }

  render() {
    return (
      (this.state.status === 'edit') ?
      <Col sm='6'>
          <FormDetail item={this.state} handleCancel={this.handleCancel} handleFormSubmit={this.handleFormSubmit} />
        </Col>
        :
        <Col sm='6'>
          <Card>
            <CardBody>
              <CardTitle>{this.props.item.name}</CardTitle>
              <CardText>{this.props.item.detail}</CardText>
              <div><Button outline color="success" onClick={this.toggle}>Edit</Button>
                <Button outline color="danger" onClick={this.handleDelete}>Delete</Button>

              </div>
            </CardBody>
          </Card>
        </Col>
        
    )
  }
}

export default ListItem
