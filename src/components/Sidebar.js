import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import arrow_down from '../assets/images/arrow_down.svg';
import arrow_up from '../assets/images/arrow_up.svg';
import star from '../assets/images/star.svg';
import star_filled from '../assets/images/star_filled.svg';
import '../styles/Sidebar.scss';
const Sidebar = ({
  searchFilter,
  showAllSidebar,
  setShowAllSidebar,
  handleSearch,
  handleChange,
  handleClear,
  checkboxes,
  handleClearAll,
  startDate,
  setStartDate,
  handleRating,
}) => {
  const [rating, setRating] = useState([
    { id: 1, image: star },
    { id: 2, image: star },
    { id: 3, image: star },
    { id: 4, image: star },
    { id: 5, image: star },
  ]);
  return (
    <div className="sidebar-container">
      <div className="inner-sidebar-container">
        <div className="input-container">
          <div className="flex-clear">
            <p>By name</p>
            <button
              className={searchFilter.length > 0 ? 'btn-display-flex' : 'btn-display-none'}
              name="name"
              onClick={handleClear}
            >
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
          {checkboxes.slice(0, !showAllSidebar ? 4 : undefined).map(({ id, name, checked }) => (
            <div key={id} className="skill-container">
              <input id={id} type="checkbox" name={name} onChange={handleChange} checked={checked} />
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
            <button>Clear</button>
          </div>
          <div className="rating-stars">
            {rating.map((star) => (
              <img key={star.id} src={star.image} onClick={() => handleRating(star.id)} alt="star"></img>
            ))}
            {/* {Array.from(Array(5), (e, i) => {
              if (i < currentrating) {
                // eslint-disable-next-line jsx-a11y/alt-text
                return <img src={star_filled} key={i} onClick={handlerating(i)} />;
              } else {
                // eslint-disable-next-line jsx-a11y/alt-text
                return <img src={star} key={i} onClick={handlerating(i)} />;
              }
            })} */}
          </div>
        </div>
        <div className="availability-container">
          <div className="flex-clear">
            <p>By availability</p> <button>Clear</button>
          </div>
          <div className="date-input-cont">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd.MM.yyyy" />
            {/* <input type="text" placeholder="Available from" /> */}
          </div>
        </div>
        <div className="clear-all-btn-cont">
          <button onClick={handleClearAll}>Clear all filters</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
