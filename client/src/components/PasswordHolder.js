import React from 'react';
import { Image, Input, Icon } from 'semantic-ui-react'

const PasswordHolder = (props) => {
  return (
    <div className='password-holder'>
        <Image src={props.logo} size='small' centered />
        {props.error ? (<p>Password is incorrect</p>) : ('')}
        <Input
            className='password-input'
            icon={<Icon name='chevron right' onClick={props.handleAuth} inverted circular link />}
            onChange={props.handlePasswordChange}
            value={props.password}
            onKeyPress={props.handleKeyPress}
            name='password'
            type='password'
            placeholder='Password'
        />
    </div>
  )
};

export default PasswordHolder;