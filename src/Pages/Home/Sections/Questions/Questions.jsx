const Questions = () => {
  return (
    <div className="my-container ">
      <div className="md:ml-36 sm:ml-5 my-10 md:w-7/12 sm:w-11/12 px-2 w-full">
        <h3 className="md:text-4xl font-bold  text-2xl ">
          Frequently asked questions
        </h3>
        <div className="join border-none  rounded-none join-vertical ">
          <div className="collapse m-0 border-y mt-7 rounded-none border-gray-200 collapse-arrow join-item ">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-base font-bold">
              # What&apos;s a typical day like at the summer camps?
            </div>
            <div className="collapse-content pl-0">
              <p>
                Our summer camp programs include language courses and all sorts
                of activities you didn&apos;t know were possible. Total
                immersion in a new country, with other students from all around
                the world. You will certainly have the adventure of a lifetime.
                Here is an example of a full day during your summer camp with
                LVC:
              </p>
              <ul className="list-disc grid gap-3 mt-5">
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">08:00am:</p>
                  <p>
                    Have a meal with your homestay hosts or at your LVC
                    residence
                  </p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">10:30am:</p>
                  <p>
                    Intensive classroom learning in an international environment
                  </p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">12:15pm:</p>
                  <p>Take a lunch break in the city</p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">02:30pm:</p>
                  <p>LVC organized group excursion</p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">04:00pm:</p>
                  <p>LVC organized afternoon activity</p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">06:30pm:</p>
                  <p>
                    Eat a traditional local meal with your host or new
                    classmates
                  </p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">08:00pm:</p>
                  <p>LVC organized evening activity</p>
                </li>
                <li className="ml-4 flex items-center gap-2">
                  <p className="font-bold">10:00pm:</p>
                  <p>Return to your comfortable LVC accommodation</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b mt-10 rounded-none border-gray-200">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-base font-bold">
              # Who will I travel with during my summer camp?
            </div>
            <div className="collapse-content pl-0 grid gap-5  md:text-base text-sm">
              <p>
                A summer camp is a great place to get fresh ideas, make new
                friends, and fill up on energy for the coming year. Our summer
                camps abroad are designed to make the most of your vacation,
                with a combined academic program, tourism, and creative
                activities.
              </p>
              <p>
                Most of our summer camps are very international, regardless of
                the destination you choose, with students from 30 or more
                countries all meeting at camp and spending several exciting
                weeks together.
              </p>
              <p>
                Less experienced travelers can also choose to attend summer camp
                with a group from their own country, so they have the
                reassurance of their own language when they need it.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-y mt-10 rounded-none border-gray-200">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-base font-bold">
              # Which languages can I learn during a summer camp?
            </div>
            <div className="collapse-content pl-0 grid gap-5  md:text-base text-sm">
              <p>
                Going to camp is one of the highlights of many during the
                holidays. Why not do two things at once by attending a language
                camp? Our camps abroad teach language skills as well as giving
                you an action-packed vacation. Camps run during school holidays
                in over 14 destinations around the world, including Spain,
                France, Portugal, Italy, Costa Rica, China, Japan, Germany and
                more.
              </p>
              <p>
                An immersion language camp is an effective way to improve your
                foreign language skills by learning and applying essential
                knowledge in a fun and relaxed environment. We have a variety of
                options, including some camps exclusively for children who are
                just getting started learning foreign languages.
              </p>
              <p>
                All our camps include innovative language instruction classes
                with experienced teachers. Outside of class, campers participate
                in a range of activities with their new friends from all around
                the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
