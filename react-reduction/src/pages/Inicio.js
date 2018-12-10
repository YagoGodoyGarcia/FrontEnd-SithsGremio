import React from 'react';
import '../styles/CardEventos.css';
import ecommerce from '../styles/image/ecommerce.jpeg';
import eventos from '../styles/image/eventos.jpeg';
import Page from 'components/Page';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { browserHistory } from 'react-router';
const items = [
  {
    id: 1,
    src: ecommerce,
    caption: 'Loja Bandtec'
  },
  {
    id: 2,
    src: eventos,
    caption: 'Cadastro de Eventos'
  },
];
class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  chamado= UserURL => () => {
    console.log(UserURL)
      if(UserURL ==1){
        // document.getElementById('siteselect').href("http://35.193.12.25/");
      }
      else{
        browserHistory.push('/Login')
      }
  }
    render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
        <img  id="siteselect" href=""className="imag-tag"src={item.src} onClick={this.chamado(item.id)} ></img>
          <CarouselCaption className="text-danger"captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 40.19em;
                background: black;
              }
              .imag-tag {
                width: 100%;
                height: 40.19em;
                background: black;
              }`

          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default Inicio;