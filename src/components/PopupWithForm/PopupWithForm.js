import React from 'react';
import './PopupWithForm.css'

function PopupWithForm(props) {
  const {
    isOpen,
    onClose,
    onSubmit,
    children,
  } = props;

  return (
    <div className={'popup ' + (isOpen && 'popup_opened')}>
      <form className="popup__form" onSubmit={onSubmit}>
        {children}
        <button onClick={onClose} className="popup__close-button" type="button"></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
