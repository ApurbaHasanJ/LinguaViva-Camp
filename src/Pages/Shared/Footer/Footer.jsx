import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'
import linkedin from '../../../assets/linkedin.png'
import { TiMessages } from 'react-icons/ti'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {

  useEffect(() => {
    AOS.init();
  }, []);

    return (
        <footer className="bg-sky-50 pt-8">
            <div className="flex justify-center mx-5 items-center flex-col">
                <div className="md:flex gap-4 items-center">
                <img className="rounded-full w-20" src={logo} alt="" />
                <div>
                <h2 className="footer-title text-2xl text-black opacity-100 capitalize">LinguaViva Camp</h2>
                <p className="text-xs lg:max-w-xs mt-2">Providing the right education, in the right place, at the right time for an experience that goes beyond the classroom.</p>
                </div>
                </div>
                
            </div>
            <div className="footer p-10  text-base-content">
  <div>
    <span className="footer-title text-black opacity-100 capitalize">Programs by age</span> 
    <Link to="#" className="link link-hover text-xs">10 - 14 years</Link> 
    <Link to="#" className="link link-hover text-xs">14 - 18 years</Link> 
    <Link to="#" className="link link-hover text-xs">18 - 25 years</Link> 
    <Link to="#" className="link link-hover text-xs">All ages</Link>
    <div className="flex flex-col gap-2 mt-4">
    <span className="footer-title text-black opacity-100 capitalize">Follow Us</span> 
   <div 
   
      className=" flex  gap-3">
    <img className="h-9 w-9 bg-sky-100 p-2 rounded-lg" src="https://i.postimg.cc/d0Yz1tks/facebook.png" alt="" />
    <img className="h-9 w-9 bg-sky-100 p-2 rounded-lg" src="https://i.postimg.cc/rF7BB9qt/instagram.png" alt="" />
    
    <img className="h-9 w-9 bg-sky-100 p-2 rounded-lg" src={linkedin} alt="" />
   </div>
  </div>
  </div>
  <div>
  <span className="footer-title text-black opacity-100 capitalize">Popular programmes</span> 
  <Link to='#' className="link link-hover text-xs">Student exchange programs</Link>
  <Link to='#' className="link link-hover text-xs">Learn French in France</Link>
  <Link to='#' className="link link-hover text-xs">Learn Italian in Italy</Link>
  <Link to='#' className="link link-hover text-xs">Language school in Japan</Link>
  <Link to='#' className="link link-hover text-xs">Learn French in Paris</Link>
  <Link to='#' className="link link-hover text-xs">Learn Spanish in Spain</Link>
  <Link to='#' className="link link-hover text-xs">Language school in Korea
</Link>

  </div> 
  <div>
    <span className="footer-title text-black opacity-100 capitalize">Discover</span> 
    <Link to="#" className="link link-hover text-xs">LVC Blog</Link> 
    <Link to="#" className="link link-hover text-xs">LVC English Proficiency Index (LVC EPI)</Link> 
    <Link to="#" className="link link-hover text-xs">Resources for learning English</Link> 
    <Link to="#" className="link link-hover text-xs">Language tests</Link>
    <Link to="#" className="link link-hover text-xs">LVC Teacher Zone</Link>
    <Link to="#" className="link link-hover text-xs">Useful guides</Link>
  </div> 
  <div>
    <span className="footer-title text-black opacity-100 capitalize">About LVC Education First</span> 
    <Link to="#" className="link link-hover text-xs">About us</Link> 
    <Link to="#" className="link link-hover text-xs">All LVC Programs</Link> 
    <Link to="#" className="link link-hover text-xs">Jobs</Link> 
    <Link to="#" className="link link-hover text-xs">Careers at LVC</Link>
    <div className="flex flex-col gap-1 mt-4">
    <span className="footer-title text-black opacity-100 capitalize">Address</span> 
    <p className=" text-xs">2469 Collins Ave</p> 
    <p className=" text-xs">FL 33140, United States</p> 
    <p className=" text-xs">+1 (877) 235-7895</p>
  </div>
  </div> 
   
 
</div>
<div   className="border-t mx-10 sm:flex justify-between  items-center">
  <button data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" className="flex items-center  gap-2 md:mt-0 mt-6 lg:mx-0 mx-auto text-white bg-sky-400 hover:bg-sky-500 hover:shadow-2xl rounded-full px-5 py-1 h-1/3">
    <TiMessages/>
    <p>Appointment</p>
  </button>
<div className=" flex flex-col  ">
<div className="md:flex grid gap-4 mt-4">
<Link to="#" className="link link-hover text-xs">Privacy policy</Link>
<Link to="#" className="link link-hover text-xs">Terms and Conditions</Link>
<Link to="#" className="link link-hover text-xs">Cookies</Link>
  
</div>
<Link to="#" className="link link-hover text-xs my-4">© Signum International AG 2023. All rights reserved.</Link>

</div>
</div>
        </footer>
    );
};

export default Footer;