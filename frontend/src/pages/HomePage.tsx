import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Side-Up | Coaching, Sophrologie, Massage Bien-Être';
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;