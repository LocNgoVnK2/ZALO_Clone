import React, { Component } from "react";

import SidebarMenu from "react-bootstrap-sidebar-menu";
import UserAvatar from "./assets/friends.png";
import ChatIcon from "./assets/icon/chatIcon.png";
import PhonebookIcon from "./assets/icon/phonebookIcon.png";
import TodoIcon from "./assets/icon/todoIcon.png";
import ToolboxIcon from "./assets/icon/toolboxIcon.png";
import SettingIcon from "./assets/icon/settingIcon.png";
import { Message, None } from "./Home";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import UserProfileDialog from "./UserProfileDialog";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      showPopover: true,
      avatarImage: 'data:image/jpeg;base64,' + this.props.user.avatar

    }

  }


  handleSignOut = () => {
    localStorage.removeItem('token');
    this.props.selectionChange('default');
    this.props.navigate("/");

  }
  handleOpenDialog = () => {
    this.setState({ showDialog: true, showPopover: false });
  };

  handleCloseDialog = () => {
    this.setState({ showDialog: false, showPopover: true });

  };

  render() {

    const popover = (
      <Popover id="popover-basic" className="custom-popover">
        <Popover.Header as="h3"><strong>{this.props.user.userName}</strong></Popover.Header>
        <Popover.Body>
          <span className="popover-body" onClick={this.handleOpenDialog}>Hồ sơ của bạn</span>

          <span className="popover-body">Cài đặt</span>
        </Popover.Body>
        <Popover.Header as="h3" onClick={this.handleSignOut}>Đăng xuất</Popover.Header>
      </Popover>
    );
    const popoverForSetting = (
      <Popover id="popover-basic" className="custom-popover">
        <Popover.Header as="h3"><span className="popover-body" onClick={this.handleOpenDialog}>Hồ sơ của bạn</span></Popover.Header>
        <Popover.Body>
          <span className="popover-body" onClick={this.handleSignOut}>Đăng xuất</span>
        </Popover.Body>

      </Popover>
    );
    return (
      <>

        <UserProfileDialog show={this.state.showDialog} handleClose={this.handleCloseDialog} user={this.props.user} />
        <SidebarMenu variant="pills" onSelect={this.props.changeState} activeKey="1" className="sidebar-container">
          <SidebarMenu.Body className="sidebar-body">
            <div className="sidebar-tabs-top">
              <SidebarMenu.Nav className="sidebar-tabs sidebar-avatar">
                {this.state.showPopover && (
                  <OverlayTrigger trigger="click" placement="right" overlay={popover}>

                    <img src={this.props.user.avatar ? this.state.avatarImage : UserAvatar} className="sidebar-avatar-image" alt="" />
                  </OverlayTrigger>
                )}
                {!this.state.showPopover && (
                  // load hình tịa đây
                  <img src={this.props.user.avatar ? this.state.avatarImage : UserAvatar} className="sidebar-avatar-image" alt="" />

                )}
              </SidebarMenu.Nav>
              <SidebarMenu.Nav.Link eventKey={Message} className="sidebar-tabs"  onClick={() => this.props.selectionChange('default')}>
                <img src={ChatIcon} className="icon" alt="" />
              </SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Link eventKey={None} className="sidebar-tabs" onClick={() => this.props.selectionChange('phonebook')}>
                <img src={PhonebookIcon} className="icon" alt="" />
              </SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Link eventKey="3" className="sidebar-tabs" onClick={() => this.props.selectionChange('todolist')}>
                <img src={TodoIcon} className="icon" alt="" />
              </SidebarMenu.Nav.Link>
            </div>
            <div className="sidebar-tabs-bottom">
              <SidebarMenu.Nav.Link eventKey="4" className="sidebar-tabs">
                <img src={ToolboxIcon} className="icon" alt="" />
              </SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Link eventKey="5" className="sidebar-tabs">
                {this.state.showPopover && (
                  <OverlayTrigger trigger="click" placement="right" overlay={popoverForSetting}>
                    <img src={SettingIcon} className="icon" alt="" />
                  </OverlayTrigger>
                )}
                {!this.state.showPopover && (
                  // load hình tịa đây
                  <img src={SettingIcon} className="icon" alt="" />

                )}

              </SidebarMenu.Nav.Link>
            </div>
          </SidebarMenu.Body>
        </SidebarMenu>
      </>

    );
  }
}

export default Sidebar;
