import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
	//states
	const [isLoading, setIsLoading] = useState(true);
	const [tours, setTours] = useState([]);
	//functions
	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	const fetchTours = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(url);
			const tours = await response.json();
			setIsLoading(false);
			setTours(tours);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	if (isLoading) {
		return (
			<main>
				<Loading />
			</main>
		);
	}
	if (tours.length === 0) {
		return (
			<div className='title'>
				<h2>no tours left</h2>
				<div className='underline'></div>
				<button className='btn' onClick={fetchTours}>
					refresh
				</button>
			</div>
		);
	}
	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
			<div className='clr-btn-wrapper'>
				<button className='btn' onClick={() => setTours([])}>
					clear all
				</button>
			</div>
		</main>
	);
}

export default App;
