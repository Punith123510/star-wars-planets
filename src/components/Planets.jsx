import React, { useEffect, useState } from "react";
import axios from "axios";
// console.log(React);
function Planets() {
	const [isLoading, setLoading] = useState(true);
	const [starWarsDataPlanets, setStarWarsDataPlanets] = useState();
	const [urlPlanets, setUrlPlanets] = useState(
		`https://swapi.dev/api/planets/?page=1`
	);

	useEffect(() => {
		axios.get(urlPlanets).then((response) => {
			setStarWarsDataPlanets(response.data);
			setLoading(false);
		});
	}, [urlPlanets]);

	if (isLoading) {
		return (
			<div>
				<div>
					<h1 className="txt-shadow-gold">Planets</h1>
					<button
						disabled={true}
					>
						⏪ Previous Page
					</button>
					<button
						disabled={true}
					>
						Next Page⏩
					</button>
				</div>
				<div className="overlay">
					Loading...
				</div>
			</div>
		);
	}

	const allPlanetsOnPage = starWarsDataPlanets.results.map((planet) => {
		console.log(planet);

		return (
			<div key={planet.name} className="card card-planet">
				<h2 >{planet.name}</h2>
				<p>Climate: {planet.climate}</p>
				<p>Terrain: {planet.terrain}</p>
				<p>Population: {planet.population}</p>
				<br />
			</div>
		);
	});

	return (
		<div>
			<h1 className="txt-shadow-gold">Planets</h1>
			<button
				onClick={previousPage}
				disabled={starWarsDataPlanets.previous ? false : true}
			>
				⏪ Previous Page
			</button>
			<button
				onClick={nextPlanetPage}
				disabled={starWarsDataPlanets.next ? false : true}
			>
				Next Page⏩
			</button>

			<main>{allPlanetsOnPage}</main>
		</div>
	);

	function nextPlanetPage() {
		setLoading(true);
		setUrlPlanets(starWarsDataPlanets.next);
	}

	function previousPage() {
		setLoading(true);
		setUrlPlanets(starWarsDataPlanets.previous);
	}
}

export default Planets;
