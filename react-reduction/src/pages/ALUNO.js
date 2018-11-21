import GAListener from 'components/GAListener';
import { LayoutRoute, MainLayout } from 'components/Layout';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import EventosParaAlunos from 'pages/EventosParaAlunos';
import {browserHistory} from 'react-router';

const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split('/').pop()}`;
  };
class ALUNO extends React.Component {
    render() {
        if(localStorage.getItem("nome") == null){
            browserHistory.push('/Login')
        }
        return (
          <BrowserRouter basename={getBasename()}>
            <GAListener>
              <Switch>
                <LayoutRoute
                  exact
                  path="/AlunoEventos"
                  layout={MainLayout}
                  component={EventosParaAlunos}
                />
                <Redirect to="/AlunoEventos" />
              </Switch>
            </GAListener>
          </BrowserRouter>
        );
      }
    }
    
    const query = ({ width }) => {
      if (width < 575) {
        return { breakpoint: 'xs' };
      }
    
      if (576 < width && width < 767) {
        return { breakpoint: 'sm' };
      }
    
      if (768 < width && width < 991) {
        return { breakpoint: 'md' };
      }
    
      if (992 < width && width < 1199) {
        return { breakpoint: 'lg' };
      }
    
      if (width > 1200) {
        return { breakpoint: 'xl' };
      }
    
      return { breakpoint: 'xs' };
    };
    
export default componentQueries(query)(ALUNO);
