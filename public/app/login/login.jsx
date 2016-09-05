import React from 'react';
import $ from 'jquery';

export default React.createClass({
	render: function() {
		return (
			<div>
				<h1>Login</h1>
				<a href='/auth/facebook'>Facebook</a>
				<a href='/auth/google'>Google</a>
			</div>
		);
	}
});
