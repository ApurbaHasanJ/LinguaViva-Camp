import { motion } from 'framer-motion';
import { GiLeafSwirl } from 'react-icons/gi';

const SummerLife = () => {
  return (
    <div className="my-container md:relative md:flex gap-10 md:mb-24 mb-10">
      <div data-aos="fade-right" className="md:w-3/6 md:mb-0 mb-6">
        <h2 className="text-3xl font-bold mb-7">Get ready for the summer of your life</h2>
        <p className="text-lg">
          Go on a summer camp abroad with LVC ⛺️☀️! Our summer camps include
          language classes in the mornings and all kinds of sports and cultural
          activities in the afternoons so you can make the most of your time. If
          you want to learn a language, play soccer ⚽, dance and meet new
          friends, our summer camps are the best option this year. ✈
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 10 }}
        transition={{ duration: 2 }}
        className="ml-auto border-t border-gray-100 md:border-none md:absolute md:-top-44 z-40 md:right-8 md:w-2/6 card  bg-base-100 shadow-xl"
      >
        <div className='card-body'>
          <h2 className="text-xl font-bold card-title border-b pb-6 gray-900 flex place-items-start gap-3">
            <span className='w-8'><GiLeafSwirl className='text-3xl'/></span>
            <p> Why go on a summer camp with LVC?</p>
          </h2>
          <ul className="mt-6 grid gap-2">
            <li>Over 50 years of experience</li>
            <li>Have fun with students from over 100 countries Comprehends</li>
            <li>Comprehensive package including, flights, meals & activities</li>
            <li>Combine language learning with activities at top LVC destinations</li>
            <li>Guaranteed progress with the LVC Method</li>
            <li>Globally recognized and accredited summer camps</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SummerLife;
