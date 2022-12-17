import React, { useEffect, useState } from 'react';
import search from '../assets/images/search_off.svg';
import '../styles/Main.scss';
import star from '../assets/images/star.svg';
import star_filled from '../assets/images/star_filled.svg';

const Main = () => {
  // const [filters, setFilters] = useState({
  //   'Carpet cleaning': false,
  //   Sweeping: false,
  //   'Deep cleaning': false,
  //   Mopping: false,
  //   'Window treatment cleaning': false,
  // });
  const [filters, setFilters] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
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
  const [filteredRobots, setFilteredRobots] = useState(robots);

  // const arr = Array.from(Array(robot.rating), (e, i) => {
  //   <img key={i} src={star} alt="" />;
  // })
  // const robotRating = (robot) => {
  //   Array.from(Array(robot.rating), (e, i) => {
  //     return i;
  //   });
  // };
  // const handleSearch = (event) => {
  //   setSearchFilter(event.target.value);
  //   if (event.target.value === '') {
  //     setFilteredRobots(robots);
  //     return;
  //   }

  //   const filteredValues = robots.filter(
  //     (robot) => robot.firstName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
  //   );
  //   setFilteredRobots(filteredValues);
  // };

  // const handleChange = (event) => {
  //   console.log(event.target.checked);
  //   console.log(event.target.name);
  // };

  const handleChange = (event) => {
    // const { name } = event.target;
    // if (filters.includes(name)) {
    //   const findIndex = filters.indexOf(name);
    //   console.log(filters.splice(findIndex, 1));
    // } else {
    //   setFilters(filters.push(name));
    // }

    let updatedList = [...filters];
    if (event.target.checked) {
      updatedList = [...filters, event.target.name];
    } else {
      updatedList.splice(filters.indexOf(event.target.name), 1);
    }
    setFilters(updatedList);
    // setFilters((prevState) => ({ ...prevState, [name]: !prevState[name] }));
    // setFilteredRobots(robots);
  };

  console.log(filters);

  const handleClear = (event) => {
    const { name } = event.target;

    if (name === 'name') {
      setSearchFilter('');
    } else if (name === 'skills') {
      setFilters({
        'Carpet cleaning': false,
        Sweeping: false,
        'Deep cleaning': false,
        Mopping: false,
        'Window treatment cleaning': false,
      });
      setFilteredRobots(robots);
    }
  };

  const handleClearAll = () => {
    setFilters({
      'Carpet cleaning': false,
      Sweeping: false,
      'Deep cleaning': false,
      Mopping: false,
      'Window treatment cleaning': false,
    });
    setSearchFilter('');
    setFilteredRobots(robots);
  };

  useEffect(() => {
    if (searchFilter === '') {
      setFilteredRobots(robots);
    }

    const filteredValues = filteredRobots.filter(
      (robot) => robot.firstName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
    );
    setFilteredRobots(filteredValues);
  }, [searchFilter]);

  // useEffect(() => {
  //   // const checkedSkills = Object.entries(filters)
  //   //   .filter((skill) => skill[1])
  //   //   .map((skill) => skill[0]);

  //   const checkedSkills = filters.filter((skill) => !skill === true);
  //   console.log(checkedSkills);
  //   const filterCheckedRobots = filteredRobots.filter((robot) =>
  //     checkedSkills.every((skill) => robot.skills.includes(skill))
  //   );

  //   setFilteredRobots(filterCheckedRobots);
  // }, [filters]);

  // useEffect(() => {
  // const checkedSkills = Object.entries(filters)
  //   .filter((category) => category[1])
  //   .map((category) => category[0]);

  // const filterCheckedRobots = filteredRobots.filter((robot) =>
  //   checkedSkills.every((skill) => robot.skills.includes(skill))
  // );
  // setFilteredRobots(filterCheckedRobots);
  // console.log(filteredRobots)
  // }, [filters, filteredRobots]);

  return (
    <main>
      {filteredRobots.length === 0 ? (
        <div className="robots-container">
          <img src={search} alt="search icon" />
          <h3>No results</h3>
          <p>Your selected filters did not match any of the results</p>
          <button onClick={handleClearAll}>Clear All Filters</button>
        </div>
      ) : (
        <div className="robots-flex-container">
          {filteredRobots.map((robot) => (
            <div className="card-container" key={robot.id}>
              <div className="card-img-container">
                <img src={robot.images.thumbnail} alt="" />
              </div>
              <div className="raiting-container">
                {Array.from(Array(5), (e, i) => {
                  if (i < robot.rating) {
                    // eslint-disable-next-line jsx-a11y/alt-text
                    return <img src={star_filled} key={i} />;
                  } else {
                    // eslint-disable-next-line jsx-a11y/alt-text
                    return <img src={star} key={i} />;
                  }
                })}
              </div>
              <p>{robot.firstName}</p>
              <button>Learn more</button>
            </div>
          ))}
        </div>
      )}
      <div className="sidebar-container">
        <div className="input-container">
          <div>
            <p>By name</p>
            <button name="name" onClick={handleClear}>
              Clear
            </button>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={searchFilter}
            onChange={(event) => setSearchFilter(event.target.value)}
          />
        </div>
        <div className="skills-container">
          <div>
            <p>By skills</p>
            <button name="skills" onClick={handleClear}>
              Clear
            </button>
          </div>
          <div className="skill-container">
            <input
              id="1"
              type="checkbox"
              name="Carpet cleaning"
              // checked={filters['Carpet cleaning']}
              onChange={handleChange}
            />
            <label htmlFor="1" onChange={handleChange}>
              Carpet cleaning
            </label>
          </div>
          <div className="skill-container">
            <input id="2" type="checkbox" name="Sweeping" checked={filters.Sweeping} onChange={handleChange} />
            <label htmlFor="2">Sweeping</label>
          </div>
          <div className="skill-container">
            <input
              id="3"
              type="checkbox"
              name="Deep cleaning"
              checked={filters['Deep cleaning']}
              onChange={handleChange}
            />
            <label htmlFor="3">Deep cleaning</label>
          </div>
          <div className="skill-container">
            <input id="4" type="checkbox" name="Mopping" checked={filters.Mopping} onChange={handleChange} />
            <label htmlFor="4">Mopping</label>
          </div>
          <div className="skill-container">
            <input
              id="5"
              type="checkbox"
              name="Window treatment cleaning"
              checked={filters['Window treatment cleaning']}
              onChange={handleChange}
            />
            <label htmlFor="5">Window treatment cleaning</label>
          </div>
        </div>
        <div className="rating-container">
          <div>
            <p>By rating</p>
            <button>Clear</button>
          </div>
          <h3>.. .. .. .. ..</h3>
        </div>
        <div className="availability-container">
          <div>
            <p>By availability</p> <button>Clear</button>
          </div>
          <input type="text" placeholder="Available from" />
        </div>
        <button onClick={handleClearAll}>Clear all filters</button>
      </div>
    </main>
  );
};

export default Main;

{
  /* <div className="raiting-container">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div> */
}
