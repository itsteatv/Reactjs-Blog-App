import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
                    <img src="https://images.wallpaperscraft.com/image/single/code_text_colorful_140555_1280x720.jpg" alt="image1" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src="https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg" alt="image2" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src="https://www.codingdojo.com/blog/wp-content/uploads/javacript-1280x720.gif" alt="image3" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src="https://wallpapercropper.com/view/og2R0-119-1280x720.jpg" alt="image4" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src="https://images.wallpaperscraft.com/image/single/laptop_code_programming_212332_1280x720.jpg" alt="image5" style={{ width: "100%" }} />
                </div>
                <div>
                    <img src="https://images.wallpaperscraft.com/image/single/code_programming_text_155013_1280x720.jpg" alt="image6" style={{ width: "100%" }} />
                </div>
            </Slider>
        </div>

    );
}


export default Header;
