'use strict';
let URL = window.location.hostname + window.location.pathname;
let rawData = localStorage.getItem(`WDepth ${URL}`);
let storedScrollDepth = 0;
const dc = new Date();
const currentDate = `${dc.getFullYear()}-${String(dc.getMonth() + 1).padStart(2, '0')}-${String(dc.getDate()).padStart(2, '0')}`;

if (rawData != null) {
	storedScrollDepth = Number(rawData.split(' ')[0]);
	if (storedScrollDepth > 0) {
		window.scrollTo({
		top: storedScrollDepth,
		behavior: 'smooth'
	})}
}

window.addEventListener('beforeunload', () => {
	let y = window.scrollY;
	if (y > 0 || storedScrollDepth != y) {
		localStorage.setItem(`WDepth ${URL}`, `${y} ${currentDate}`)
	}
})

for (let i = 0; i < localStorage.length; i++) {
	let key = localStorage.key(i);
	if (key.startsWith('WDepth')) {
		if (checkExpire(localStorage.getItem(key).split(' ')[1]) === true) {
			localStorage.removeItem(key)
		}
	}
}

function checkExpire(d) {
	if (Math.floor((dc - new Date(d)) / (1000 * 60 * 60 * 24)) >= 7) {
		return true
	} else {
		return false
	}
}