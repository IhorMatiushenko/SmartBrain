import React from 'react';
import PropTypes from "prop-types";

const Rank = ({ user }) => {
  if (!user) return;

  return (
    <div>
      <div className='f3 mt4'>
        {`${user.name}, your current entry count is...`}
      </div>
      <div className='f1'>
        {`#${user.entries}`}
      </div>
    </div>
  );
};

Rank.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default Rank;
