// Lien Ho Hoang - 2019/11/02

import React from 'react'
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';

class NewItemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.item.name,
      detail: props.item.detail
    }
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.name || !this.state.detail) {
      alert("Please enter information, Name and Detail are required!")
      return
    }
    this.props.handleFormSubmit({
      name: this.state.name,
      detail: this.state.detail,
      status: 'read'
    })

    this.setState({ name: '', detail: '' })

  };

  render() {
    return (

      <Form className='form'>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="itemName" className="mr-sm-2">Name</Label>
          <Input type="text" name="name" id="itemName" placeholder="Item name" value={this.state.name} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="itemDetail" className="mr-sm-2">Detail</Label>
          <Input type="textarea" name="detail" id="itemDetail" placeholder="Item detail" value={this.state.detail} onChange={this.handleInputChange} />
        </FormGroup>
        <Button outline color="success" onClick={this.handleFormSubmit}>Save</Button>
        <Button outline onClick={this.props.handleCancel}>Cancel</Button>
      </Form>
    )
  }

}

export default NewItemView
