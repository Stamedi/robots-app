import React, { useState } from 'react';
import search from '../assets/images/search_off.svg';
import '../styles/Main.scss';
import star from '../assets/images/star.svg';

const Main = () => {
  const [robots] = useState([
    {
      age: 56,
      rating: 2,
      firstName: 'Cara',
      lastName: 'Mccarthy',
      phone: '(883) 512-2259',
      email: 'cara.mccarthy@earbang.ca',
      registered_at: '2014-04-25',
      available_from: '2021-06-13',
      description:
        'Reprehenderit consectetur ullamco aliquip reprehenderit do voluptate. Laborum exercitation nulla reprehenderit minim. Aliquip dolor elit adipisicing consectetur officia. Fugiat commodo id sint esse proident non dolor.',
      images: {
        thumbnail: 'https://robohash.org/zg87yx8nsqrl5a8y.png/?set=set1&size=256x256',
        medium: 'https://robohash.org/zg87yx8nsqrl5a8y.png/?set=set1&size=327x327',
      },
      skills: ['Sweeping', 'Infection control', 'Polishing'],
      id: 1,
    },
    {
      age: 48,
      rating: 1,
      firstName: 'Ayala',
      lastName: 'Mcclain',
      phone: '(856) 505-2278',
      email: 'ayala.mcclain@plexia.biz',
      registered_at: '2017-02-20',
      available_from: '2021-07-24',
      description:
        'Nulla ipsum aute non elit nisi consequat culpa sit ex laboris proident voluptate. Incididunt enim exercitation fugiat cillum Lorem non non. Laboris fugiat veniam nisi et dolor aliqua proident Lorem. Minim eiusmod fugiat ut minim sint adipisicing.',
      images: {
        thumbnail: 'https://robohash.org/iy84628fu0482qra.png/?set=set1&size=256x256',
        medium: 'https://robohash.org/iy84628fu0482qra.png/?set=set1&size=327x327',
      },
      skills: ['Vacuuming', 'Deep cleaning', 'Sweeping'],
      id: 2,
    },
    {
      age: 22,
      rating: 3,
      firstName: 'Clements',
      lastName: 'Mccoy',
      phone: '(827) 582-2958',
      email: 'clements.mccoy@pearlessa.me',
      registered_at: '2018-09-10',
      available_from: '2021-10-26',
      description:
        'Excepteur deserunt commodo dolor Lorem. Et eu pariatur ea ipsum minim nostrud tempor officia. Exercitation labore magna exercitation magna ullamco. Pariatur aliquip proident magna anim.',
      images: {
        thumbnail: 'https://robohash.org/hj0o3es7bac84foh.png/?set=set1&size=256x256',
        medium: 'https://robohash.org/hj0o3es7bac84foh.png/?set=set1&size=327x327',
      },
      skills: ['Vacuuming', 'Deep cleaning', 'Dusting'],
      id: 3,
    },
  ]);
  return (
    <main>
      {robots.length === 0 ? (
        <div className="robots-container">
          <img src={search} alt="search icon" />
          <h3>No results</h3>
          <p>Your selected filters did not match any of the results</p>
          <button>Clear All Filters</button>
        </div>
      ) : (
        <div className="robots-flex-container">
          {robots.map((robot) => (
            <div className="card-container">
              <div className="card-img-container">
                <img src={robot.images.thumbnail} alt="" />
              </div>
              <div className="raiting-container">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
              <p>{robot.firstName}</p>
              <button>Learn more</button>
            </div>
          ))}
        </div>
      )}
      <div className="sidebar-container">
        <p>By name</p>
        <input type="text" placeholder="Name" />
        <div className="skills-container">
          <p>By skills</p>
          <div className="skill-container">
            <input id="1" type="checkbox" name="Carpet cleaning" />
            <label htmlFor="1">Carpet cleaning</label>
          </div>
          <div className="skill-container">
            <input id="2" type="checkbox" name="Sweeping" />
            <label htmlFor="2">Sweeping</label>
          </div>
          <div className="skill-container">
            <input id="3" type="checkbox" name="Deep cleaning" />
            <label htmlFor="3">Deep cleaning</label>
          </div>
          <div className="skill-container">
            <input id="4" type="checkbox" name="Mopping" />
            <label htmlFor="4">Mopping</label>
          </div>
          <div className="skill-container">
            <input id="5" type="checkbox" name="Window treatment cleaning" />
            <label htmlFor="5">Window treatment cleaning</label>
          </div>
        </div>
        <div className="rating-container">
          <p>By rating</p>
          <h3>.. .. .. .. ..</h3>
        </div>
        <div className="availability-container">
          <input type="text" placeholder="Available from" />
        </div>
      </div>
    </main>
  );
};

export default Main;
