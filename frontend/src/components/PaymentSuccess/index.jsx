import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const PaymentSucess = () => {
	const [status, setStatus] = useState(null);
	const [customerEmail, setCustomerEmail] = useState('');

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		const sessionId = urlParams.get('session_id');

		if (sessionId) {
			fetch(`http:///127.0.0.1:3001/session-status?session_id=${sessionId}`)
				.then((res) => res.json())
				.then((data) => {
					setStatus(data.status);
					setCustomerEmail(data.customer_email);
				});
		} else {
			window.location.href = '/';
		}
	}, []);

	if (status === 'open') {
		return <Navigate to="/checkout" />;
	}

	if (status === 'complete') {
		return (
			<section id="success">
				<h1>Payment successful</h1>
			</section>
		);
	}
};
