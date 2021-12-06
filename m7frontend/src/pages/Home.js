import "./Home.css";
import banner from "../assets/Home/banner.png";
import award1 from "../assets/Home/award1.png";
import award2 from "../assets/Home/award2.png";
import award3 from "../assets/Home/award3.png";
import award4 from "../assets/Home/award4.png";
import manwalkingonbridge from "../assets/Home/man-walking-on-bridge.png";
import testimonials from "../assets/Home/testimonials.png";
import quoteleftbtn from "../assets/Home/quoteleft-btn.png";
import quoterightbtn from "../assets/Home/quoteright-btn.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banners-container">
        <div className="home-banner-left">LEFT</div>
        <img src={banner} className="home-banner-right" />
      </div>
      <div className="home-awards-container">
        <img src={award1} className="home-award" />
        <img src={award2} className="home-award" />
      </div>
      <div className="home-whychoose-container">
        <div className="home-whychoose-left">
          <img src={manwalkingonbridge} className="home-bridgepic" />
        </div>

        <div className="home-whychoose-right">
          <h1>Why choose Auckland Property Management</h1>
          <div className="home-divider-container">
            <div className="home-divider"></div>
          </div>
          <p>
            With over 25 plus years of experience, we focus on reducing residential, commercial and
            body corporate property management risks.
            <br />
            <br />
            We aim to be genuinely useful to both our landlords and our tenants.
          </p>
        </div>
      </div>
      <div className="home-moreawards-container">
        <img src={award3} className="home-moreawards" />
        <img src={award4} className="home-moreawards" />
      </div>
      {/* FIGURE OUT HOW TO MAKE THE TESTIMONIALS SLIDESHOW */}
      <div className="home-testimonials-container">
        <div className="home-testimonials-left">
          <h1>What our clients say</h1>
          <div>
            <p className="home-testimonials-text home-quote1">
              “Auckland Property Management are professional and committed to providing excellent
              service. Any query or problem is dealt with efficiently and courteously. I have been
              with Auckland Property Management since 2009 and would not think of changing.”
            </p>
            <p className="home-testimonials-author">John &amp; Muriel Ingram</p>
          </div>

          <div className="home-quotenav">
            <img src={quoteleftbtn} className="home-quotebtn" />
            <img src={quoterightbtn} className="home-quotebtn" />
          </div>
        </div>
        <div className="home-testimonials-right">
          <img src={testimonials} className="home-testimonialspic" />
        </div>
      </div>
      <div className="home-housebuttons-container">HOUSE BUTTONS</div>
    </div>
  );
};

export default Home;
