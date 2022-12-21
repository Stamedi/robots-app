import React, { useEffect, useState } from 'react';
import search from '../assets/images/search_off.svg';
import star from '../assets/images/star.svg';
import star_filled from '../assets/images/star_filled.svg';
import '../styles/Main.scss';
import Modal from './Modal';
import Sidebar from './Sidebar';
import data from '../data/data-v2.json';

const Main = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: '1', name: 'Carpet cleaning', checked: false },
    { id: '2', name: 'Sweeping', checked: false },
    { id: '3', name: 'Deep cleaning', checked: false },
    { id: '4', name: 'Mopping', checked: false },
    { id: '5', name: 'Window treatment cleaning', checked: false },
    { id: '6', name: 'Vacuuming', checked: false },
    { id: '7', name: 'Dusting', checked: false },
    { id: '8', name: 'Bathroom and bedroom cleaning', checked: false },
    { id: '9', name: 'Infection control', checked: false },
    { id: '10', name: 'Polishing', checked: false },
  ]);
  // const [filters, setFilters] = useState([]);
  // const [checkedFilter, setCheckedFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [showAllSidebar, setShowAllSidebar] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [robots] = useState(data);
  const [filteredRobots, setFilteredRobots] = useState(robots);
  const [startDate, setStartDate] = useState(null);
  const [openModal, setOpenModal] = useState({ value: false, robot: null });
  const [currentRating, setCurrentRating] = useState(null);
  const [resultsFound, setResultsFound] = useState(false);

  const handleSearch = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleChange = (event) => {
    setCheckboxes((prevState) => {
      return prevState.map((checkbox) => {
        if (checkbox.name === event.target.name) {
          return {
            ...checkbox,
            checked: !checkbox.checked,
          };
        } else {
          return { ...checkbox };
        }
      });
    });
  };

  const handleRating = (value) => {
    setCurrentRating(value);
  };

  const handleClear = (event) => {
    const { name } = event.target;

    if (name === 'name') {
      setSearchFilter('');
    } else if (name === 'skills') {
      setCheckboxes(
        checkboxes.map((checkbox) => {
          return { ...checkbox, checked: false };
        })
      );
    } else if (name === 'rating') {
      setCurrentRating(null);
    } else if (name === 'date') {
      setStartDate(null);
    }

    setFilteredRobots(robots);
  };

  const handleClearAll = () => {
    setSearchFilter('');
    setCheckboxes(
      checkboxes.map((checkbox) => {
        return { ...checkbox, checked: false };
      })
    );
    setCurrentRating(null);
    setStartDate(null);
  };

  useEffect(() => {
    let updatedList = robots;

    // Sorting by date descending
    updatedList = updatedList.sort((a, b) => a.registered_at < b.registered_at);

    // Filter with searchbar
    if (searchFilter.length > 0) {
      updatedList = updatedList.filter((robot) => robot.firstName.toLowerCase().includes(searchFilter.toLowerCase()));
    }

    // Filter with checkboxes
    const skillsChecked = checkboxes.filter((skill) => skill.checked).map((skill) => skill.name);

    if (skillsChecked.length !== 0) {
      updatedList = updatedList.filter((robot) => robot.skills.some((skill) => skillsChecked.includes(skill)));
    }

    // Filter with star rating
    if (currentRating) {
      updatedList = updatedList.filter((robot) => robot.rating === currentRating);
    }

    if (startDate) {
      console.log(startDate);
    }

    setFilteredRobots(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  }, [searchFilter, checkboxes, currentRating, robots, startDate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let promise = Promise.resolve(data);
  //     promise.then((res) => setRobots(res));
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setRobots(robots.sort((a, b) => a.registered_at < b.registered_at));
  // }, [robots]);

  // useEffect(() => {
  //   // if (searchFilter === '') {
  //   //   setFilteredRobots(robots);
  //   // }

  //   // if (updatedList.length > 0) {
  //   //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   //   updatedList = updatedList.filter((robot) => robot.firstName.toLowerCase().includes(searchFilter.toLowerCase()));
  //   // }

  //   // console.log(searchFilter);
  //   // if (searchFilter.length > 0) {
  //   //   if (robots) {
  //   //     const filteredItems = robots.filter((robot) => robot.firstName.match(searchFilter));
  //   //     setFilteredRobots(filteredItems);
  //   //   }
  //   // } else {
  //   //   setFilteredRobots(robots);
  //   // }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchFilter]);

  // useEffect(() => {
  //   if (checkedFilter.length !== 0) {
  //     const filteredRobotsArr = robots.filter((robot) => robot.skills.some((skill) => checkedFilter.includes(skill)));
  //     setFilteredRobots(filteredRobotsArr);
  //   } else {
  //     setFilteredRobots(robots);
  //   }
  // }, [checkedFilter, robots]);

  return (
    <main>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="inner-container-main">
        {!resultsFound ? (
          <div className="robots-container">
            <img src={search} alt="search icon" />
            <h3>No results</h3>
            <p>Your selected filters did not match any of the results</p>
            <button onClick={handleClearAll}>Clear All Filters</button>
          </div>
        ) : (
          <div className="robots-btn-container">
            <div className="robots-flex-container">
              {filteredRobots.map((robot) => (
                <div className="card-container" key={robot.id}>
                  <div className="card-img-container">
                    <img src={robot.images.thumbnail} alt="" />
                  </div>
                  <div className="rating-container">
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
                  <button onClick={() => setOpenModal({ value: true, robot: robot })}>Learn more</button>
                </div>
              ))}
            </div>
            <div onClick={() => setLoadMore(!loadMore)} className="load-more-container">
              <button>Load more</button>
            </div>
          </div>
        )}
        <Sidebar
          searchFilter={searchFilter}
          showAllSidebar={showAllSidebar}
          setShowAllSidebar={setShowAllSidebar}
          handleSearch={handleSearch}
          handleChange={handleChange}
          handleClear={handleClear}
          checkboxes={checkboxes}
          handleClearAll={handleClearAll}
          startDate={startDate}
          setStartDate={setStartDate}
          handleRating={handleRating}
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
        />
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

// [
// {
//   age: 56,
//   rating: 2,
//   firstName: 'Cara',
//   lastName: 'Mccarthy',
//   phone: '(883) 512-2259',
//   email: 'cara.mccarthy@earbang.ca',
//   registered_at: '2014-04-25',
//   available_from: '2021-06-13',
//   description:
//     'Reprehenderit consectetur ullamco aliquip reprehenderit do voluptate. Laborum exercitation nulla reprehenderit minim. Aliquip dolor elit adipisicing consectetur officia. Fugiat commodo id sint esse proident non dolor.',
//   images: {
//     thumbnail: 'https://robohash.org/zg87yx8nsqrl5a8y.png/?set=set1&size=256x256',
//     medium: 'https://robohash.org/zg87yx8nsqrl5a8y.png/?set=set1&size=327x327',
//   },
//   skills: ['Sweeping', 'Infection control', 'Polishing'],
//   id: 1,
// },
// {
//   age: 48,
//   rating: 1,
//   firstName: 'Ayala',
//   lastName: 'Mcclain',
//   phone: '(856) 505-2278',
//   email: 'ayala.mcclain@plexia.biz',
//   registered_at: '2017-02-20',
//   available_from: '2021-07-24',
//   description:
//     'Nulla ipsum aute non elit nisi consequat culpa sit ex laboris proident voluptate. Incididunt enim exercitation fugiat cillum Lorem non non. Laboris fugiat veniam nisi et dolor aliqua proident Lorem. Minim eiusmod fugiat ut minim sint adipisicing.',
//   images: {
//     thumbnail: 'https://robohash.org/iy84628fu0482qra.png/?set=set1&size=256x256',
//     medium: 'https://robohash.org/iy84628fu0482qra.png/?set=set1&size=327x327',
//   },
//   skills: ['Vacuuming', 'Deep cleaning', 'Sweeping'],
//   id: 2,
// },
// {
//   age: 22,
//   rating: 3,
//   firstName: 'Clements',
//   lastName: 'Mccoy',
//   phone: '(827) 582-2958',
//   email: 'clements.mccoy@pearlessa.me',
//   registered_at: '2018-09-10',
//   available_from: '2021-10-26',
//   description:
//     'Excepteur deserunt commodo dolor Lorem. Et eu pariatur ea ipsum minim nostrud tempor officia. Exercitation labore magna exercitation magna ullamco. Pariatur aliquip proident magna anim.',
//   images: {
//     thumbnail: 'https://robohash.org/hj0o3es7bac84foh.png/?set=set1&size=256x256',
//     medium: 'https://robohash.org/hj0o3es7bac84foh.png/?set=set1&size=327x327',
//   },
//   skills: ['Vacuuming', 'Deep cleaning', 'Dusting'],
//   id: 3,
// },
// ]
