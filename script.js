window.addEventListener('load', function () {
	fetch('https://handlers.education.launchcode.org/static/astronauts.json')
		.then((response) => {
			if (response.ok) return response.json();
			return Promise.reject(response.status);
		})
		.then((astronauts) => {
			const container = document.getElementById('container');
			const astronautCardTemplate = document.getElementById('astronautCard');

			astronauts.sort((a, b) => {
				return b.hoursInSpace - a.hoursInSpace;
			});

			for (let astronaut of astronauts) {
				let card = astronautCardTemplate.content.cloneNode(true);

				let name = astronaut.firstName + ' ' + astronaut.lastName;
				card.getElementById('name').innerText = name;
				card.getElementById('hoursInSpace').innerText += String(
					astronaut.hoursInSpace
				);
				let active = card.getElementById('active');
				active.innerText += String(astronaut.active);
				if (astronaut.active) active.classList.add('active');
				card.getElementById('skills').innerText += String(
					astronaut.skills.join(', ')
				);
				let avatar = card.getElementById('avatar');
				avatar.setAttribute('src', astronaut.picture);
				avatar.setAttribute('alt', name + "'s portrait");

				container.appendChild(card);
			}

			let total = document.createElement('h2');
			total.innerText = 'Total: ' + astronauts.length;
			total.classList.add('total');

			container.appendChild(total);
		})
		.catch((error) => {
			console.log('Error: %o', error);
		});
});
