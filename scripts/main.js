var controller = new function() {
	this.filter = function(event) {
		if (event.keyCode == 8 && document.activeElement.type !== 'text') // Disable global backspace "back button" shortcut
		{
			event.stopPropagation();
			event.preventDefault();
		}
	}

	this.clock = function() {
		// Run once
		var time = new Date();

		document.getElementById('clock').innerHTML = time;

		setInterval(function() { // Run every second
			var time = new Date();

			document.getElementById('clock').innerHTML = time;
		}, 1000);
	}
}