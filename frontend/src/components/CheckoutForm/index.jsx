import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';

export const CheckoutForm = ({ cart }) => {
	const stripePromise = loadStripe(
		'pk_test_51OykzIA6yAG2rVG1LJ45elyXfMY5OJmP3jeXUuZB7xDIpS1FsPTv50WhAe773iLqz2zVKhwqTAsehVBfqIhvuuhW00TyHerS2B'
	);

	const fetchClientSecret = useCallback(() => {
		return fetch('http://127.0.0.1:3001/create-checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ cart }),
		})
			.then((res) => res.json())
			.then(({ clientSecret }) => clientSecret);
	}, []);

	const options = { fetchClientSecret };

	return (
		<div id="checkout">
			<EmbeddedCheckoutProvider
				stripe={stripePromise}
				options={options}
			>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	);
};
