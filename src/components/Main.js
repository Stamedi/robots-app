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
  const [searchFilter, setSearchFilter] = useState('');
  const [showAllSidebar, setShowAllSidebar] = useState(false);
  const [loadMore, setLoadMore] = useState(12);
  const [robots, setRobots] = useState([]);
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

    // Filter with searchbar
    if (searchFilter.length > 0) {
      updatedList = updatedList.filter((robot) => robot.firstName.toLowerCase().includes(searchFilter.toLowerCase()));
    }

    // Filter with checkboxes
    // An array of checkbox names that are currently checked
    const skillsChecked = checkboxes.filter((skill) => skill.checked).map((skill) => skill.name);

    updatedList = updatedList.filter((robot) => {
      return skillsChecked.every((skill) => robot.skills.includes(skill));
    });

    // Filter with star rating
    if (currentRating) {
      updatedList = updatedList.filter((robot) => robot.rating === currentRating);
    }

    // Filter by available date
    if (startDate) {
      updatedList = updatedList.filter((robot) => startDate - new Date(robot.available_from) < 0);
    }

    setLoadMore(12);
    setFilteredRobots(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  }, [searchFilter, checkboxes, currentRating, robots, startDate]);

  useEffect(() => {
    // Fetching robots from data.json
    // Filtering out the ones that don't have firstName to prevent errors that might occur later
    // Sorting by registered_at date descending
    const fetchData = async () => {
      let promise = Promise.resolve(data);
      promise.then((res) => {
        const filterNoNames = res.filter((robot) => robot.firstName);
        const sortDateDesc = filterNoNames.sort((a, b) => a.registered_at < b.registered_at);
        setRobots(sortDateDesc);
      });
    };

    fetchData();
  }, []);

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
              {filteredRobots.map(
                (robot, index) =>
                  index < loadMore && (
                    <div className="card-container" key={robot.id}>
                      <div className="card-img-container">
                        <img src={robot.images.thumbnail} alt="" />
                      </div>
                      <div className="rating-container">
                        {Array.from(Array(5), (e, i) => {
                          if (i < robot.rating) {
                            return <img src={star_filled} key={i} alt="star_filled" />;
                          } else {
                            return <img src={star} key={i} alt="star_empty" />;
                          }
                        })}
                      </div>
                      <h5>{robot.firstName}</h5>
                      <button onClick={() => setOpenModal({ value: true, robot: robot })}>Learn more</button>
                    </div>
                  )
              )}
            </div>
            {filteredRobots.length > loadMore ? (
              <div onClick={() => setLoadMore(loadMore + 12)} className="load-more-container">
                <button>Load more</button>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
        <Sidebar
          filteredRobots={filteredRobots}
          setFilteredRobots={setFilteredRobots}
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
