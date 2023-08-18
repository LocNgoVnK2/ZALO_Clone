import React, { Component } from "react";
import Test from "./assets/test.png";
import { Button, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import SearchIcon from "./assets/icon/searchIcon.png";
import AddUserIcon from "./assets/icon/addUserIcon.png";
import AddGroupUserIcon from "./assets/icon/add-friend.png";
import AddFriendDialog from "./AddFriendDialog";
import CreateGroupDialog from "./CreateGroupDialog";

import { GetUserContacts, getuserApi } from "../Services/userService";

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinishLoading: false,
      contacts: [],

      contactChosenId: "",
      showAddFriendDialog: false,
      showCreateGroupDialog:false
    };

  }

  componentDidMount = () => {
    // this.props.id &&
    //   GetUserContacts(this.props.id).then((response) => {
    //     this.setState({
    //       contacts: response.data,
    //       isFinishLoading: true,
    //     });
    //   });
  };
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.id !== this.props.id) {
    //   GetUserContacts(this.props.id).then((response) => {
    //     this.setState({
    //       contacts: response.data,
    //       isFinishLoading: true,
    //     });
    //   });
    // }
  }
  handleOpenCreateGroupDialog = ()=>{
    this.setState({ showCreateGroupDialog: true });
  }
  handleCloseCreateGroupDialog = () => {
    this.setState({ showCreateGroupDialog: false});

  };
  handleOpenAddFriendDialog = () => {
    this.setState({ showAddFriendDialog: true });
  };

  handleCloseAddFriendDialog = () => {
    this.setState({ showAddFriendDialog: false});

  };

  render = () => {
    let updateChatView = this.props.updateChatView;
    let rows = [];
    if (this.props.contacts) {
      let contacts = this.props.contacts;
      for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i].contactName;
        rows.push(
          <ListGroupItem
            key={contacts[i].id}
            action
            onClick={(e) => {
              if (this.state.contactChosenId !== contacts[i].id)
                updateChatView(contacts[i].id, e);
              this.setState({ contactChosenId: contacts[i].id });
            }}
          >
            <div className="float-start">
              <img
                src={Test}
                className="rounded-circle"
                width="48 px"
                height="48 px"
                alt=""
              />
            </div>
            <div className="float-start ms-3">
              <span className="float-right">{name}</span>
              <div className="text-muted">
                {this.props.contacts[i].lastMessageContent}
              </div>
            </div>
          </ListGroupItem>
        );
      }

    }

    return (
      <>
      <CreateGroupDialog show={this.state.showCreateGroupDialog} handleClose={this.handleCloseCreateGroupDialog} userId={this.props.id}/>
       <AddFriendDialog show={this.state.showAddFriendDialog} handleClose={this.handleCloseAddFriendDialog} userId={this.props.id}/>
        <div className="conversation-list-container">
          <div className="contact-search">
            <span className="contact-search-box">
              <InputGroup size="sm" className="mb-3 float-start">
                <InputGroup.Text>
                  <img src={SearchIcon} alt="" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className="bg-light"
                />
              </InputGroup>
            </span>
            <span className="float-start ms-1">
              <Button variant="light" onClick={this.handleOpenAddFriendDialog}>
                <img src={AddUserIcon} alt="" width="14 px" height="14 px" />
              </Button>
            </span>
            <span className="float-start ms-1">
              <Button variant="light" onClick={this.handleOpenCreateGroupDialog}> 
                <img src={AddGroupUserIcon} alt="" width="14 px" height="14 px" />
              </Button>
            </span>
          </div>
          <div className="conversation-list"> 
            <ListGroup variant="pills">{rows}</ListGroup>
          </div>
        </div>
      </>
    );
  };
}

export default ConversationList;
