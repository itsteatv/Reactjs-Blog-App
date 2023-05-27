import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from "../../assets/image.jpg"
import image2 from "../../assets/image2.gif"
import image3 from "../../assets/image3.jpg"
import image4 from "../../assets/image4.jpg"
import image5 from "../../assets/image5.jpg"
import image6 from "../../assets/image6.jpg"

function Header() {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div style={{ overflow: "hidden" }}>
            <Slider {...settings}>
                <div>
                    <img src={image} alt="image1" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src={image2} alt="image2" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src={image3} alt="image3" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src={image4} alt="image4" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src={image5} alt="image5" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src={image6} alt="image6" style={{ width: "100%" }} />
                </div>
            </Slider>
        </div>

    );
}


export default Header;
