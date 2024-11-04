import React from 'react';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} ref={ref} {...props} />
));
Card.displayName = 'Card';

export default Card;
