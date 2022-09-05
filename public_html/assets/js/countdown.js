class Countdown {
	constructor(countdown, date) {
		this.countdown = countdown;
		this.date = date;
	}
	
	loop() {
		this.interval = setInterval(() => {
			this.updateCountdown();
		}, 1000);
	}
	
	updateCountdown() {
		let now = (new Date()).getTime();
		let dateDistance = this.date - now;
		
		let days = 0;
		let hours = 0;
		let minutes = 0;
		let seconds = 0;
		
		if(dateDistance > 0) {
			days = Math.floor(dateDistance / (1000 * 60 * 60 * 24));
			hours = Math.floor((dateDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutes = Math.floor((dateDistance % (1000 * 60 * 60)) / (1000 * 60));
			seconds = Math.floor((dateDistance % (1000 * 60)) / 1000);
		} else {
			clearInterval(this.interval);
		}
		
		const slots = [
			this.countdown.find('.countdown__item1'),
			this.countdown.find('.countdown__item2'),
			this.countdown.find('.countdown__item3'),
		];
		let labels = ['days', 'hours', 'minutes', 'seconds'];
		let values = [days, hours, minutes, seconds];
		
		if(days === 0) {
			labels.shift();
			values.shift();
		}
		
		for (let i = 0; i < slots.length; i++) {
			this.timeOutput(slots[i], values[i], labels[i]);
		}
	}
	
	timeOutput(item, value, label) {
		item.find('.item__value').text(value);
		item.find('.item__label').text(label);
	}
}
