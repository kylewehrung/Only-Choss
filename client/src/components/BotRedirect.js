import React from "react"

const BotRedirect = ({ url, message }) => {
    return (
      <div>
        <a href={url} target="_blank">
          {message}
        </a>
      </div>
    );
  };

export default BotRedirect;


