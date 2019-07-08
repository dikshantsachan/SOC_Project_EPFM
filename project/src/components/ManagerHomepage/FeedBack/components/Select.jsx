import React from 'react';
import { FormControl } from 'react-bootstrap'

const Select = (props) => {
	return (
	<div className="form-group">
		<FormControl
			placeholder={props.name}
			aria-label="Username"
			aria-describedby="basic-addon1"
			disabled
		/>
  </div>)
}

export default Select;