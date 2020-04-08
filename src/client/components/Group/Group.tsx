import * as React from 'react'

interface Props {
  classNames?: any,
  children?: React.ReactNode
}

function Group ({ classNames = {}, children, ...otherProps }: Props) {
  return (
    <div className={classNames.root} {...otherProps}>
      {children}
    </div>
  )
}

export default Group
