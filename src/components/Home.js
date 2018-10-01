import React, { Component } from "react";
import Slider from "react-slick";

class Home extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    };
    return (
      <Slider {...settings}>
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-city-415687.jpg')} />
          <img width="100%" alt="house demo" src={require('../assets/image/agriculture-architecture-building-273892.jpg')} />
          <img width="100%" alt="house demo" src={require('../assets/image/agriculture-barn-cabin-463734.jpg')} />
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-art-276724.jpg')} />
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-bookcase-257344.jpg')} />
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-ceiling-259962.jpg')} />
      </Slider>
    );
  }
}

export default Home
