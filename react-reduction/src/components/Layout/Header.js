import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdInsertChart,
  MdPersonPin,
  MdMessage,
  MdSettingsApplications,
  MdHelp,
  MdClearAll,
  MdExitToApp,
} from 'react-icons/lib/md';

import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';

import withBadge from 'hocs/withBadge';

import { notificationsData } from 'demos/header';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
      </Navbar>  
    );
  }
}

export default Header;
