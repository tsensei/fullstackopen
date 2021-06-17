import React from "react";

const AddForm = ({ addPerson, nameRef, numberRef }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input ref={nameRef} />
        </div>
        <div>
          number: <input ref={numberRef} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
