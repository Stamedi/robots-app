import React from 'react';
import search from '../assets/images/search_off.svg';
import '../styles/Main.scss';

const Main = () => {
  return (
    <main>
      <div className="robots-container">
        <img src={search} alt="search icon" />
        <h3>No results</h3>
        <p>Your selected filters did not match any of the results</p>
        <button>Clear All Filters</button>
      </div>
      <div className="sidebar-container">
        <p>By name</p>
        <input type="text" />
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
