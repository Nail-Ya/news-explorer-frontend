import React from 'react';
import ReactDOM from 'react-dom';

export type PortalProps = {
  children: React.ReactNode;
};

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [container] = React.useState(document.createElement('div'));

  React.useEffect(() => {
    container.classList.add('portal');
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return (
    ReactDOM.createPortal(children, container)
  );
};

export default Portal;
