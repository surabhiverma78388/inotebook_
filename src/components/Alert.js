import React from 'react'

function Alert(props) {
    const capitalise=(word)=>{
       const lower=word.toLowerCase();
       return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (
  props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{
      position: 'fixed',
      top: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: '90%',
      height:"45px",
      maxWidth: '500px',
      display: 'flex',
     alignItems: 'center'
    }}>
    <strong>{capitalise(props.alert.type)}</strong>:{props.alert.msg}
  </div>
  )
}

export default Alert

