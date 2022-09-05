(function ($) {
	function submitCountdown($form) {
		const $countdownRow = $form.parents('.countdown-row');
		const $countdown = $form.parents('.countdown');
		const $dateLabel = $form.find('.form__label');
		const $dateInput = $form.find('.form__date');
		const $endDateRow = $countdown.find('.end-date-row');
		const $endDateValue = $endDateRow.find('.end-date-row__value');
		
		const endDateInput = $dateInput.val();
		
		if(endDateInput.length > 0 && $dateLabel.val().length > 0) {
			let endDate = new Date(endDateInput);
			
			$form.css('display', 'none');
			$endDateRow.removeClass('d-none');
			$endDateValue.text($dateLabel.val() + ' : ' + endDate.toLocaleString());
			
			Cookies.appendPageCookie({
				'id': $countdownRow.prop('id'),
				'label': $dateLabel.val(),
				'date': $dateInput.val()
			});
			
			(new Countdown($countdown, endDate.getTime())).loop();
		} else {
			alert('Please, insert the label and the end date!');
		}
	}
	
	$(document).ready(function () {
		
		const pageCookies = Cookies.getPageCookies();
		pageCookies.forEach((cookie) => {
			const $countdown = $('.countdown-row-base').clone();
			
			$countdown.find('.form__label').val(cookie.label);
			$countdown.find('.form__date').val(cookie.date);
			
			$countdown.appendTo('.countdown-container')
				.removeClass('countdown-row-base')
				.removeClass('d-none')
				.prop('id', cookie.id);
			
			submitCountdown($countdown.find('.form'));
		});
		
		$('.countdown-container').on('submit', '.countdown form', function (event) {
			event.preventDefault();
			
			submitCountdown($(event.target));
		});
		
		$('#add-new-countdown').click(function () {
			$('.countdown-row-base').clone()
				.appendTo('.countdown-container')
				.removeClass('countdown-row-base')
				.removeClass('d-none')
				.prop('id', makeId(16));
		});
		
		$('.end-date-row__delete').click(function () {
			const $countdownRow = $(this).parents('.countdown-row');
			Cookies.deletePageCookie($countdownRow.prop('id'));
			$countdownRow.remove();
		});
	});
})(jQuery);
