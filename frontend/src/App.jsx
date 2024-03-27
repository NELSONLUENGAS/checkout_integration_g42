import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CheckoutForm } from './components/CheckoutForm';
import { PaymentSucess } from './components/PaymentSuccess';

function App() {
	const cart = [
		{
			name: 'Producto 1',
			price: 10.99,
			image: 'imagen1.jpg',
			quantity: 5,
		},
		{
			name: 'Producto 2',
			price: 24.99,
			image: 'imagen2.jpg',
			quantity: 10,
		},
		{
			name: 'Producto 3',
			price: 7.5,
			image: 'imagen3.jpg',
			quantity: 3,
		},
		{
			name: 'Producto 4',
			price: 15.75,
			image: 'imagen4.jpg',
			quantity: 8,
		},
	];

	return (
		<>
			<Routes>
				<Route
					path="/checkout"
					element={<CheckoutForm cart={cart} />}
				/>
				<Route
					path="/success"
					element={<PaymentSucess />}
				/>
			</Routes>
		</>
	);
}

export default App;
