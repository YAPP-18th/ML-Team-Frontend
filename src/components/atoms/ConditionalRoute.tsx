import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from 'react-router';

const ConditionalRoute: React.FC<
  RouteProps & {
    condition: boolean;
    onTrue?: () => any;
    onFalse?: () => any;
    redirectPath: string;
  }
> = ({
  children,
  condition,
  onTrue,
  onFalse,
  redirectPath,
  ...remainingProps
}) => {
  useEffect(() => {
    if (condition) {
      onTrue && onTrue();
    } else {
      onFalse && onFalse();
    }
  }, []);
  return (
    <Route
      {...remainingProps}
      render={({ location }) => {
        if (condition) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};
export default ConditionalRoute;
