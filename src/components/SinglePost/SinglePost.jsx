import styles from "./SinglePost.module.scss"
import UserImage from "../../assets/UserImage.png"
import SinglePostImage from "../../assets/SinglePostImage.png"
import SecSinglePostImage from "../../assets/SecSinglePostImage.png"
import { useSelector } from "react-redux";

function SinglePost() {
    const selectedPost = useSelector(state => state.posts.selectedPost);
    console.log(selectedPost)

    return (
        <>
            {selectedPost ?
                <section className={styles["single-post"]}>
                    <div className={styles["content-container"]}>
                        <div className={styles["main-content"]}>
                            <div className={styles.content}>
                                <article className={styles.article}>
                                    <div className={styles["blog-info"]}>
                                        <div className={styles.heading}>
                                            <div className={styles.badge}>
                                                <p>Technology</p>
                                            </div>
                                            <div className={styles["heading-title"]}>{selectedPost.name}</div>
                                        </div>
                                        <div className={styles["user-info"]}>
                                            <div className={styles.author}>
                                                <img src={UserImage} alt="user image" />
                                                <p className={styles["author-name"]}>{selectedPost.user.name}</p>
                                            </div>
                                            <p className={styles.date}>August 20, 2022</p>
                                        </div>
                                    </div>
                                    <img className={styles["single-post-image"]} src={SinglePostImage} alt="single post image" />
                                    {/* PARAGRAPHS */}
                                    <div className={styles["first-paragraph"]}>
                                        <p className={`${styles.paragraph} ${styles.first}`}>
                                            Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.
                                            <br />
                                            One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
                                        </p>
                                    </div>
                                    <div className={styles["second-paragraph"]}>
                                        <div className={styles.title}>Research Your Destination</div>
                                        <p className={`${styles.paragraph} ${styles.second}`}>
                                            Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.
                                        </p>
                                    </div>
                                    <div className={styles["third-paragraph"]}>
                                        <div className={styles.title}>Plan Your Itinerary</div>
                                        <p className={`${styles.paragraph} ${styles.third}`}>
                                            While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.
                                            <br />
                                            Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.
                                        </p>
                                    </div>
                                    <div className={styles["quote-paragraph"]}>
                                        <p className={`${styles.paragraph} ${styles.first}`}>
                                            “ Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. ”</p>
                                    </div>
                                    <img className={styles["second-image"]} src={SecSinglePostImage} alt="second single post image" />
                                    <div className={styles["fourth-paragraph"]}>
                                        <div className={styles.title}>Pack Lightly and Smartly</div>
                                        <p className={`${styles.paragraph} ${styles.fourth}`}>
                                            Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to it, focusing on versatile and comfortable clothing that can be mixed and matched. Invest in quality luggage and packing organizers to maximize space and minimize wrinkles.
                                        </p>
                                    </div>
                                    <div className={styles["fifth-paragraph"]}>
                                        <div className={styles.title}>Stay Safe and Healthy</div>
                                        <p className={`${styles.paragraph} ${styles.fifth}`}>
                                            Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. This includes researching any required vaccinations or medications, staying hydrated, washing your hands frequently, and using sunscreen and insect repellent. It's also essential to keep your valuables safe and secure and to be aware of your surroundings at all times.
                                        </p>
                                    </div>
                                    <div className={styles["sixth-paragraph"]}>
                                        <div className={styles.title}>Immerse Yourself in the Local Culture</div>
                                        <p className={`${styles.paragraph} ${styles.sixth}`}>
                                            One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
                                        </p>
                                    </div>
                                    <div className={styles["seventh-paragraph"]}>
                                        <div className={styles.title}>Capture Memories</div>
                                        <p className={`${styles.paragraph} ${styles.seventh}`}>
                                            Finally, don't forget to capture memories of your journey. Whether it's through photographs, journaling, or souvenirs, preserving the moments and experiences of your travels can bring joy and nostalgia for years to come. However, it's also essential to be present in the moment and not let technology distract you from the beauty of your surroundings.
                                        </p>
                                    </div>
                                </article>
                                {/* CONCLUSION */}
                                <div className={styles.conclusion}>
                                    <div className={styles["conclusion-paragraph"]}>
                                        <div className={styles.title}>
                                            Conclusion:
                                        </div>
                                        <p className={`${styles.paragraph} ${styles.conclusionP}`}>
                                            Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                :
                <p>Error</p>
            }
        </>
    )
}

export default SinglePost
