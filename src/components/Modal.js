import React from 'react';
import ReactModal from 'react-modal';
import star from '../assets/images/star.svg';
import star_filled from '../assets/images/star_filled.svg';
import close_btn from '../assets/images/close_btn.svg';
import cart_white from '../assets/images/cart_white.svg';
import phone from '../assets/images/phone.svg';
import mail from '../assets/images/mail.svg';
import '../styles/Modal.scss';
import moment from 'moment/moment';

ReactModal.setAppElement('#root');
const Modal = ({ openModal, setOpenModal }) => {
  const { value, robot } = openModal;
  return (
    <ReactModal
      style={{
        overlay: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          background: 'rgba(19, 19, 19, 0.4)',
          zIndex: 3,
        },
        content: {
          maxWidth: '928px',
          margin: 'auto',
          padding: '0px',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '8px',
          border: '1px solid #F3F3F3',
        },
      }}
      isOpen={value}
      onRequestClose={() => setOpenModal({ value: false, robot: null })}
    >
      {robot && (
        <>
          <div className="top-modal">
            <h6>
              More about {robot.firstName} {robot.lastName}
            </h6>
            <img src={close_btn} alt="close_btn" onClick={() => setOpenModal({ value: false, robot: null })} />
          </div>
          <div className="modal-body-cont">
            <div className="left-modal">
              <div className="header-modal">
                <div className="rating-container">
                  {Array.from(Array(5), (element, index) => {
                    if (index < robot.rating) {
                      return <img src={star_filled} key={index} alt="star_filled" />;
                    } else {
                      return <img src={star} key={index} alt="star_empty" />;
                    }
                  })}
                </div>
                <div className="name-green-btn-container">
                  <h3>
                    {robot.firstName} {robot.lastName}
                  </h3>
                  <p>Available</p>
                </div>
              </div>
              <div className="about-modal">
                <p className="subhead-modal">About</p>
                <p className="body-text-modal">{robot.description}</p>
              </div>
              <div className="registered-at-modal">
                <p className="subhead-modal">Registered at</p>
                <p className="body-text-modal">{moment(robot.registered_at).format('MM.DD.yyyy')}</p>
              </div>
              <div className="skills-modal">
                <p className="subhead-modal">Skills</p>
                <ul className="body-text-modal">
                  {robot.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="contact-info-modal">
                <p className="subhead-modal">Contact information</p>
                <p className="body-text-modal">
                  <img src={phone} alt="phone" />
                  {robot.phone}
                </p>
                <p className="body-text-modal">
                  <img src={mail} alt="mail" />
                  {robot.email}
                </p>
              </div>
            </div>
            <div className="right-modal">
              <img className="robot-img-modal" src={robot.images.medium} alt="" />
              <button>
                <img src={cart_white} alt="cart_white" /> Add to cart
              </button>
            </div>
          </div>
        </>
      )}
    </ReactModal>
  );
};

export default Modal;
