import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import arrow_down from '../assets/images/arrow_down.svg';
import arrow_up from '../assets/images/arrow_up.svg';
import star_empty from '../assets/images/star.svg';
import CalendarIcon from '../assets/images/star.svg';
import star_filled_green from '../assets/images/star_filled_green.svg';
import '../styles/Sidebar.scss';
const Sidebar = ({
  searchFilter,
  setSearchFilter,
  showAllSidebar,
  setShowAllSidebar,
  handleSearch,
  handleChangeCheckbox,
  checkboxes,
  setCheckboxes,
  handleClearAll,
  startDate,
  setStartDate,
  handleRating,
  currentRating,
  setCurrentRating,
}) => {
  const [rating] = useState([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const detectWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectWidth);
    if (windowWidth > 1200) {
      setSidebarOpen(true);
    }
    return () => {
      window.removeEventListener('resize', detectWidth);
    };
  }, [windowWidth]);

  return (
    <>
      <button className="sidebar-mobile-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        Sidebar
      </button>
      {sidebarOpen && (
        <div className="sidebar-container">
          <div className="inner-sidebar-container">
            <div className="input-container">
              <div className="flex-clear">
                <p>By name</p>
                <button
                  className={searchFilter.length > 0 ? 'btn-display-flex' : 'btn-display-none'}
                  onClick={() => setSearchFilter('')}
                >
                  Clear
                </button>
              </div>
              <input type="text" placeholder="Name" value={searchFilter} onChange={handleSearch} />
            </div>
            <div className="skills-container">
              <div className="flex-clear">
                <p>By skills</p>
                <button
                  className={
                    checkboxes.filter((skill) => skill.checked).map((skill) => skill.name).length > 0
                      ? 'btn-display-flex'
                      : 'btn-display-none'
                  }
                  onClick={() =>
                    setCheckboxes(
                      checkboxes.map((checkbox) => {
                        return { ...checkbox, checked: false };
                      })
                    )
                  }
                >
                  Clear
                </button>
              </div>
              {checkboxes.slice(0, !showAllSidebar ? 4 : undefined).map(({ id, name, checked }) => (
                <div key={id} className="skill-container">
                  <input id={id} type="checkbox" name={name} onChange={handleChangeCheckbox} checked={checked} />
                  <label htmlFor={id}>{name}</label>
                </div>
              ))}
              <div onClick={() => setShowAllSidebar(!showAllSidebar)} className="show-all-container">
                {!showAllSidebar ? (
                  <button>
                    <img src={arrow_down} alt="arrow-down" /> Show all
                  </button>
                ) : (
                  <button>
                    <img src={arrow_up} alt="arrow-up" /> Show less
                  </button>
                )}
              </div>
            </div>
            <div className="rating-container">
              <div className="flex-clear">
                <p>By rating</p>
                <button
                  className={currentRating ? 'btn-display-flex' : 'btn-display-none'}
                  onClick={() => setCurrentRating(null)}
                >
                  Clear
                </button>
              </div>
              <div className="rating-stars">
                {rating.map((star) => (
                  <img
                    key={star.value}
                    src={currentRating >= star.value ? star_filled_green : star_empty}
                    onClick={() => handleRating(star.value)}
                    alt="star"
                  ></img>
                ))}
              </div>
            </div>
            <div className="availability-container">
              <div className="flex-clear">
                <p>By availability</p>
                <button
                  className={startDate ? 'btn-display-flex' : 'btn-display-none'}
                  onClick={() => setStartDate(null)}
                >
                  Clear
                </button>
              </div>
              <div className="date-input-cont">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Available from"
                  showYearDropdown
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                />
              </div>
            </div>
            <div className="clear-all-btn-cont">
              <button onClick={handleClearAll}>Clear all filters</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
