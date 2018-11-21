import React from 'react';
import {
  MdDashboard,
  MdWidgets,
} from 'react-icons/lib/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
let navItems = [];
const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];
      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };
  
  render() {
    if(localStorage.getItem('permissao') == 2){
      navItems = [
        { to: '/EventosAdm', name: 'Eventos', exact: true, Icon: MdDashboard },
        { to: '/Salas', name: 'Salas', exact: true, Icon: MdWidgets },
      ];
    }else{
      navItems = [
        { to: '/AlunoEventos', name: 'Eventos', exact: true, Icon: MdDashboard },
        { to: '/MeusEventos', name: 'Minha Lista', exact: true, Icon: MdWidgets },
      ];
    }
    return (
      <aside className={bem.b()}>
        <div className="menu"/>
        <div className={bem.e('content') }>
          <Navbar>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}          
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
