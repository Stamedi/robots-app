import React, { useEffect, useState, useRef } from 'react';
import search from '../assets/images/search_off.svg';
import '../styles/Main.scss';
import star from '../assets/images/star.svg';
import star_filled from '../assets/images/star_filled.svg';
import data from '../data/data-v2.json';

const Main = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: '1', name: 'Carpet cleaning', checked: false },
    { id: '2', name: 'Sweeping', checked: false },
    { id: '3', name: 'Deep cleaning', checked: false },
    { id: '4', name: 'Mopping', checked: false },
    { id: '5', name: 'Window treatment cleaning', checked: false },
  ]);
  // const [filters, setFilters] = useState([]);
  const [checkedFilter, setCheckedFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [showMoreSidebar, setShowMoreSidebar] = useState(false)
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
  const ref = useRef(null)

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchFilter(event.target.value);
  };

  const handleChange = (event) => {
    setCheckboxes(prevState => {
      return prevState.map((checkbox) => {
        if (checkbox.name === event.target.name) {
          return {
            ...checkbox,
            checked: !checkbox.checked,
          };
        } else {
          return {...checkbox}
        }
       })
    } )

    let updatedList = [...checkedFilter];
    if (event.target.checked) {
      updatedList = [...checkedFilter, event.target.name];
    } else {
      updatedList.splice(checkedFilter.indexOf(event.target.name), 1);
    }

    setCheckedFilter(updatedList);
  };

  const handleClear = (event) => {
    const { name } = event.target;

    if (name === 'name') {
      setSearchFilter('');
    } else if (name === 'skills') {
      setCheckboxes(checkboxes.map((checkbox) => { return {...checkbox, checked: false}}))
      setFilteredRobots(robots);
    }
  };

  const handleClearAll = () => 
  {
    setCheckboxes(checkboxes.map((checkbox) => { return {...checkbox, checked: false}}))
    setCheckedFilter([]);
    setSearchFilter('');
    setFilteredRobots(robots);
  };

  useEffect(() => {
    // if (searchFilter === '') {
    //   setFilteredRobots(robots);
    // }

    if (searchFilter.length > 0) {
      const filteredItems = filteredRobots.filter((robot) => {
        return robot.firstName.match(searchFilter);
      });
      setFilteredRobots(filteredItems);
    } else {
      setFilteredRobots(robots);
    }

    // const filteredValues = filteredRobots.filter(
    //   (robot) => robot.firstName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
    // );
    // setFilteredRobots(filteredValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  useEffect(() => {
    if (checkedFilter.length !== 0) {
      const filteredRobotsArr = robots.filter((robot) => robot.skills.some((skill) => checkedFilter.includes(skill)));
      setFilteredRobots(filteredRobotsArr);
    } else {
      setFilteredRobots(robots);
    }
  }, [checkedFilter, robots]);

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
      <div className="inner-container-main">
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
                <h5>{robot.firstName}</h5>
                <button>Learn more</button>
              </div>
            ))}
          </div>
        )}
        <div className="sidebar-container">
          <div className="inner-sidebar-container">
            <div className="input-container">
              <div className="flex-clear">
                <p>By name</p>
                <button className={searchFilter.length > 0 ? 'btn-display-flex' : 'btn-display-none'} name="name" onClick={handleClear}>
                  Clear
                </button>
              </div>
              <input type="text" placeholder="Name" value={searchFilter} onChange={handleSearch} />
            </div>
            <div className="skills-container">
              <div className="flex-clear">
                <p>By skills</p>
                <button name="skills" onClick={handleClear}>
                  Clear
                </button>
              </div>
              {checkboxes.map(({ id, name, checked }) => (
                <div key={id} className="skill-container">
                  <input id={id} type="checkbox" name={name} onChange={handleChange} checked={checked} />
                  <label htmlFor={id}>
                    {name}
                  </label>
                </div>
              ))}
              <div>
              </div>
            </div>
            <div className="rating-container">
              <div className="flex-clear">
                <p>By rating</p>
                <button>Clear</button>
              </div>
              <h3>.. .. .. .. ..</h3>
            </div>
            <div className="availability-container">
              <div className="flex-clear">
                <p>By availability</p> <button>Clear</button>
              </div>
              <div className="date-input-cont">
                <input type="text" placeholder="Available from" />
              </div>
            </div>
            <div className="clear-all-btn-cont">
              <button onClick={handleClearAll}>Clear all filters</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;

/* <div className="skill-container">
            <input id="1" type="checkbox" name="Carpet cleaning" onChange={handleChange} />
            <label htmlFor="1" onChange={handleChange}>
              Carpet cleaning
            </label>
          </div>
          <div className="skill-container">
            <input id="2" type="checkbox" name="Sweeping" onChange={handleChange} />
            <label htmlFor="2">Sweeping</label>
          </div>
          <div className="skill-container">
            <input id="3" type="checkbox" name="Deep cleaning" onChange={handleChange} />
            <label htmlFor="3">Deep cleaning</label>
          </div>
          <div className="skill-container">
            <input id="4" type="checkbox" name="Mopping" onChange={handleChange} />
            <label htmlFor="4">Mopping</label>
          </div>
          <div className="skill-container">
            <input id="5" type="checkbox" name="Window treatment cleaning" onChange={handleChange} />
            <label htmlFor="5">Window treatment cleaning</label>
          </div> */

// useEffect(() => {
//   const fetchData = async () => {
//     let res = await fetch('http://localhost:3000/data-v2.json');
//     let final = res.json();
//     let promise = Promise.resolve(final);
//     promise.then((res) => setRobots(res));
//   };
//   fetchData();
// }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     let promise = Promise.resolve(data.json);
//     promise.then((res) => setRobots(res));
//   };

//   fetchData();
// }, []);
