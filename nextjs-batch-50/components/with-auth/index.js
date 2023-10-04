import React from 'react'

export function wihtAuth(Component) {

  return function WihtAuth(props) {
    const isLogin = false;
    if (!isLogin) return <div>anda harus login</div>

    return <Component {...props} />;
  };

}


