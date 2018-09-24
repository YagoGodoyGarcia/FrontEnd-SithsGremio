import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardImg, CardImgOverlay, CardTitle, Button, CardText, Row} from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import backgroundImage from 'assets/img/bg/palestrante.jpg';

const PalestranteOpcao = ({ image, title, subtitle, todos, ...restProps }) => {
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
        <Button color="secondary">Palestrante</Button>
        </Card>
    </div>
    
  );
};

PalestranteOpcao.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  todos: TodosPropTypes.todos,
};

PalestranteOpcao.defaultProps = {
  image: backgroundImage,
  title: 'Palestrante',
  subtitle: 'Gerenciamento de Palestrante',
};

export default PalestranteOpcao;
