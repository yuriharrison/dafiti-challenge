import React from 'react'

import { Color } from '../../types'

type AlertProps = { 
	message:string,
	type: Color,
}
export const Alert = ({ type, message }:AlertProps) => (
	<div className={`alert alert-${type}`} role="alert">
		{ message }
	</div>
)