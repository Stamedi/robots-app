import React, { useEffect, useState, useReducer } from 'react';
import search from '../assets/images/search_off.svg';
import star from '../assets/images/star.svg';
import star_filled from '../assets/images/star_filled.svg';
import '../styles/Main.scss';
import Modal from './Modal';
import Sidebar from './Sidebar';
import data from '../data/data-v2.json';

export const ACTIONS = {
  SET_ROBOTS: 'set-robots',
  SET_FILTERED_ROBOTS: 'set-filtered-robots',
  SEARCH_FILTER: 'search-filter',
  CHECKBOX_FILTER: 'checkbox-filter',
  RATING_FILTER: 'rating-filter',
  DATE_FILTER: 'date-filter',
  CLEAR_ALL: 'clear-all',
  CLEAR_SEARCH: 'clear-search',
  CLEAR_CHECKBOXES: 'clear-checkboxes',
  CLEAR_RATING: 'clear-rating',
  CLEAR_DATE: 'clear-date',
};

const initialState = {
  robots: [],
  filteredRobots: [],
  activeFilters: {
    searchFilter: '',
    checkboxes: [
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
    ],
    rating: 0,
    startDate: null,
  },
};

const filteredDataByName = (robots, searchVal) => {
  if (searchVal.length > 0) {
    const filterByName = robots.filter((robot) => robot.firstName.toLowerCase().includes(searchVal.toLowerCase()));
    return filterByName;
  } else {
    return robots;
  }
};

const filteredDataBySkills = (robots, checkboxes) => {
  const skillsChecked = checkboxes.filter((skill) => skill.checked).map((skill) => skill.name);
  const filteredBySkill = robots.filter((robot) => {
    return skillsChecked.every((skill) => robot.skills.includes(skill));
  });

  return filteredBySkill;
};

const filteredDataByRating = (robots, rating) => {
  if (rating) {
    return robots.filter((robot) => robot.rating === rating);
  } else {
    return robots;
  }
};

const filteredDataByDate = (robots, startDate) => {
  if (startDate) {
    const filteredByDate = robots.filter((robot) => startDate - new Date(robot.available_from) < 0);
    return filteredByDate;
  } else {
    return robots;
  }
};

const applyFilters = (robots, { searchFilter, checkboxes, rating, startDate }) => {
  const filteredRobotsByName = filteredDataByName(robots, searchFilter);
  const filteredByNameAndSkills = filteredDataBySkills(filteredRobotsByName, checkboxes);
  const filteredByNameSkillsRating = filteredDataByRating(filteredByNameAndSkills, rating);
  const filteredByNameSkillsRatingDate = filteredDataByDate(filteredByNameSkillsRating, startDate);
  return filteredByNameSkillsRatingDate;
};

const reducer = (state, action) => {
  const { activeFilters } = state;
  // const { searchFilter, checkboxes, rating, startDate } = initialState.activeFilters;
  switch (action.type) {
    case ACTIONS.SET_ROBOTS: {
      const { robots } = action.payload;
      return {
        ...state,
        robots,
        filteredRobots: robots,
      };
    }

    case ACTIONS.SEARCH_FILTER: {
      const { searchVal } = action.payload;

      const updatedFilters = {
        ...state.activeFilters,
        searchFilter: searchVal,
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.CHECKBOX_FILTER: {
      const { checkboxName } = action.payload;

      const updatedFilters = {
        ...state.activeFilters,
        checkboxes: state.activeFilters.checkboxes.map((checkbox) => {
          if (checkbox.name === checkboxName) {
            return {
              ...checkbox,
              checked: !checkbox.checked,
            };
          } else {
            return { ...checkbox };
          }
        }),
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.RATING_FILTER: {
      const { rating } = action.payload;

      const updatedFilters = {
        ...state.activeFilters,
        rating,
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.DATE_FILTER: {
      const { date } = action.payload;

      const updatedFilters = {
        ...state.activeFilters,
        startDate: date,
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.CLEAR_ALL: {
      return {
        ...state,
        filteredRobots: state.robots,
        activeFilters: initialState.activeFilters,
      };
    }

    case ACTIONS.CLEAR_SEARCH: {
      const updatedFilters = { ...activeFilters, searchFilter: initialState.activeFilters.searchFilter };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.CLEAR_CHECKBOXES: {
      const updatedFilters = {
        ...activeFilters,
        checkboxes: initialState.activeFilters.checkboxes,
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.CLEAR_RATING: {
      const updatedFilters = {
        ...activeFilters,
        rating: initialState.activeFilters.rating,
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }

    case ACTIONS.CLEAR_DATE: {
      const updatedFilters = {
        ...activeFilters,
        startDate: initialState.activeFilters.startDate,
      };

      return {
        ...state,
        activeFilters: updatedFilters,
        filteredRobots: applyFilters(state.robots, updatedFilters),
      };
    }
    default:
      return state;
  }
};

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showAllSidebar, setShowAllSidebar] = useState(false);
  const [loadMore, setLoadMore] = useState(12);
  const [openModal, setOpenModal] = useState({ value: false, robot: null });
  const [resultsFound, setResultsFound] = useState(false);

  const handleClearAll = () => {
    dispatch({ type: ACTIONS.CLEAR_ALL });
  };

  useEffect(() => {
    // Fetching robots from data.json
    // Filtering out the ones that don't have firstName to prevent errors that might occur later
    // Sorting by registered_at date descending
    const fetchData = async () => {
      let promise = Promise.resolve(data);
      promise.then((res) => {
        const filterNoNames = res.filter((robot) => robot.firstName);
        const sortDateDesc = filterNoNames.sort((a, b) => a.registered_at < b.registered_at);
        dispatch({ type: ACTIONS.SET_ROBOTS, payload: { robots: sortDateDesc } });
        setResultsFound(true);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    !state.filteredRobots.length ? setResultsFound(false) : setResultsFound(true);
  }, [state.filteredRobots]);

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
              {state.filteredRobots.map(
                (robot, index) =>
                  index < loadMore && (
                    <div
                      className="card-container"
                      key={robot.id}
                      onClick={() => setOpenModal({ value: true, robot: robot })}
                    >
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
                      <button>Learn more</button>
                    </div>
                  )
              )}
            </div>
            {state.filteredRobots.length > loadMore ? (
              <div onClick={() => setLoadMore(loadMore + 12)} className="load-more-container">
                <button>Load more</button>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
        <Sidebar
          state={state}
          showAllSidebar={showAllSidebar}
          setShowAllSidebar={setShowAllSidebar}
          handleClearAll={handleClearAll}
          dispatch={dispatch}
        />
      </div>
    </main>
  );
};

export default Main;
