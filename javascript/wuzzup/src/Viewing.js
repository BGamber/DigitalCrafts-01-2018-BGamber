import React from 'react';

let Viewing = ({ activeUser, author }) => {
  let target = (activeUser === author ? 'your' : `${author}'s`);
  return (
    <div className="now-viewing">
      Now viewing {author !== undefined ? `${target} posts` : 'all posts'}.
    </div>
  );
};

export default Viewing;
