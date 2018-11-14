import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  // NavbarToggler,
  Nav,
  Button,
  CardTitle
} from 'reactstrap';

import {
  MdClearAll,
} from 'react-icons/lib/md';


const bem = bn.create('header');


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
    return (
      <Navbar light className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav> 
        <CardTitle id="ola" innerHTML="Ola">{"Olá "+localStorage.getItem('nome')}</CardTitle>
      </Navbar>
    );
  }
}

export default Header;
