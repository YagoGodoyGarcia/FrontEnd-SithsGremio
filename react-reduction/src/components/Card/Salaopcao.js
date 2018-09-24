import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardImg, CardImgOverlay, CardTitle, Button, CardText, Row} from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import backgroundImage from 'assets/img/bg/salas.jpg';

const Salaopcao = ({ image, title, subtitle, todos, ...restProps }) => {
  return (
    <div>
        <Card {...restProps}>
        <div className="position-relative">
            <CardImg src={image} />
            <CardImgOverlay className="bg-dark" style={{ opacity: 0.2 }}>
            <CardTitle className="text-white">{title}</CardTitle>
            <CardText className="text-white">{subtitle}</CardText>
            </CardImgOverlay>
        </div>
        <Button color="secondary">Salas</Button>
        </Card>
    </div>
    
  );
};

Salaopcao.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  todos: TodosPropTypes.todos,
};

Salaopcao.defaultProps = {
  image: backgroundImage,
  title: 'Salas',
  subtitle: 'Gerenciamento de Salas',
};

export default Salaopcao;
