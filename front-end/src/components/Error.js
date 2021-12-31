import React from "react";
const Error = ({ errMsg = "" }) => {
  return (
    <div className='section section-center text-center'>
      <h2>משהו השתבש</h2>
      <p>{errMsg}</p>
    </div>
  );
};

export default Error;
