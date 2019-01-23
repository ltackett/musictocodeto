import React from 'react'
const GlobalContext = React.createContext('GlobalContext')

export default GlobalContext

export const CTX = ({ children, component }) => {
  const Component = component

  return (
    <GlobalContext.Consumer>
      {(context) => (
        <Component {...context}>
          {children}
        </Component>
      )}
    </GlobalContext.Consumer>
  )
}
