window.addEventListener('DOMContentLoaded', function() {
	/* Валидация */
	let aboutForm = document.querySelector('.about__photo');
	let contactsForm = document.querySelector('.contacts__form');

	function validate(mail) {
		let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		return reg.test(mail)
	}
	
	aboutForm.addEventListener('submit', (event) => {
		event.preventDefault();

		let mailStatus = validate(event.currentTarget.email.value);

		if(mailStatus) {
			event.currentTarget.querySelector('.about__mail-error').classList.remove('about__mail-error_active');
			event.currentTarget.email.classList.remove('about__setMail_error');
		} else {
			event.currentTarget.email.classList.add('about__setMail_error');
			event.currentTarget.querySelector('.about__mail-error').classList.add('about__mail-error_active');
		}
	})

	contactsForm.addEventListener('submit', (event) => {
		event.preventDefault();

		let mailStatus = validate(event.currentTarget.email.value);

		if(mailStatus) {
			event.currentTarget.querySelector('.request__mail-error').classList.remove('request__mail-error_active');
			event.currentTarget.email.classList.remove('request__setMail_error');
		} else {
			event.currentTarget.email.classList.add('request__setMail_error');
			event.currentTarget.querySelector('.request__mail-error').classList.add('request__mail-error_active');
		}
	})

	/* Поиск в шапке */
	let searchButton = document.querySelector('.header__search-button');

	searchButton.addEventListener('click', function(event) {
		if(event.currentTarget.type == 'button') {
			event.preventDefault();
			event.currentTarget.type = 'submit';
			document.querySelector('.header__search-text').classList.add('header__search-text_active');
			document.querySelector('.header__wrap-search').classList.add('header__wrap-search_active');
		}
	});

	document.querySelector('.header__close-search').addEventListener('click', () => {
		searchButton.type = 'button';
		document.querySelector('.header__search-text_active').classList.remove('header__search-text_active');
		document.querySelector('.header__wrap-search_active').classList.remove('header__wrap-search_active');
	});

	/* Меню мобильный */
	let mobButtonOpen = document.querySelector('.menu-button');
	let mobButtonClose = document.querySelector('.menu-close');

	mobButtonOpen.addEventListener('click', function() {
		document.querySelector('body').classList.toggle('body__lock');
		document.querySelector('.header__nav').classList.toggle('header__nav_active');
	});

	mobButtonClose.addEventListener('click', function() {
		document.querySelector('body').classList.toggle('body__lock');
		document.querySelector('.header__nav').classList.toggle('header__nav_active');
	});

	/* Карта */

	ymaps.ready(init);
	function init() {
		let myMap = new ymaps.Map("contacts__map", {
			center: [55.76963601332982, 37.63899990000000],
			zoom: 17
		});
		
		let myPlacemark = new ymaps.Placemark([55.76958762871792, 37.64029338891603], {
			hintContent: 'Собственный значок метки'
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/map_point.svg',
			iconImageSize: [12, 12],
			iconImageOffset: [-6, -6]
		});

		myMap.geoObjects.add(myPlacemark);

		myPlacemark.events.add('click', function() {
			document.querySelector('.map__content').classList.add('map__content_active');
		})
	}

	document.getElementById('map__close').addEventListener('click', function() {
		document.querySelector('.map__content').classList.remove('map__content_active');
	});
});