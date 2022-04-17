import React from "react";

import "./styles.scss";

const Tags = ({ tag: todoTag, updateTags }) => {
  const [tag, setTag] = React.useState(todoTag);
  const [modal, setModal] = React.useState(false);
  const tagRef = React.useRef(null);

  const toggleModal = () => {
    setModal((p) => !p);
  };

  const closeModal = (newTag) => {
    setModal(false);
    setTag(newTag);
    updateTags(newTag);
  };

  return (
    <div className="tag__container" ref={tagRef}>
      <div className="tag" onClick={toggleModal}>
        {tag ? (
          <>
            <i className={`fas fa-tag tag__icon--${tag}`}></i>
            <span className="text-md ml-1">{tag}</span>
          </>
        ) : (
          <>
            <i className="fas fa-plus-circle"></i>
            <span className="text-md ml-1">Add Tag</span>
          </>
        )}
      </div>
      <div className={`modal__tags ${modal && `modal__tags--active`}`}>
        <div
          className={`modal__tags--item ${
            tag === "imp" ? "modal__tags--selected" : ""
          }`}
          onClick={() => closeModal("imp")}
        >
          <i className={`fas fa-tag tag__icon--imp`}></i>
          <span className="text-md ml-1">imp</span>
        </div>

        <div
          className={`modal__tags--item ${
            tag === "exp" ? "modal__tags--selected" : ""
          }`}
          onClick={() => closeModal("exp")}
        >
          <i className={`fas fa-tag tag__icon--exp`}></i>
          <span className="text-md ml-1">exp</span>
        </div>

        <div
          className={`modal__tags--item ${
            tag === "chill" ? "modal__tags--selected" : ""
          }`}
          onClick={() => closeModal("chill")}
        >
          <i className={`fas fa-tag tag__icon--chill`}></i>
          <span className="text-md ml-1">chill</span>
        </div>
      </div>
    </div>
  );
};

export default Tags;
