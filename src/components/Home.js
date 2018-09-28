import React, { Component } from "react";
import Slider from "react-slick";

class Home extends Component {
  render() {
    var settings = {
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
        <div>
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-city-415687.jpg')} />
        </div>
        <div>
          <img width="100%" alt="house demo" src={require('../assets/image/agriculture-architecture-building-273892.jpg')} />
        </div>
        <div>
          <img width="100%" alt="house demo" src={require('../assets/image/agriculture-barn-cabin-463734.jpg')} />
        </div>
        <div>
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-art-276724.jpg')} />
        </div>
        <div>
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-bookcase-257344.jpg')} />
        </div>
        <div>
          <img width="100%" alt="house demo" src={require('../assets/image/apartment-architecture-ceiling-259962.jpg')} />
        </div>
      </Slider>
    );
  }
}

export default Home
