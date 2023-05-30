import ImagePaths from "./ImagesPaths";
import Slider from 'react-slick';
import styles from "./Header.module.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Retrieve an array of image paths by extracting the values from the ImagePaths object. This allows us to easily access and iterate over the images in the slider component.
const images = Object.values(ImagePaths);
const titles = ['ReactJS', 'Vite', 'Redux', 'JSON Server', 'Firebase', 'Git'];
const desc = ['FrontEnd Library', 'Building Web Applications', 'State Management', 'Dummy Data', 'A Cloud-hosted NoSQL Database', 'A Version Control System'];

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
                {images.map((image, index) => (
                    <div key={index} className={styles.slideContainer}>
                        <LazyLoadImage
                            src={image}
                            alt={`image${index + 1}`}
                            effect="blur"
                            width="100%"
                        />
                        <div className={styles.overlay}>
                            <h2 className={styles.titleText}>{titles[index]}</h2>
                            <h4 className={styles.descText}>{desc[index]}</h4>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}


export default Header;
