var controller = new function() {
	this.filter = function(event) {
		if (event.keyCode == 8 && document.activeElement.type !== 'text') // Disable global backspace "back button" shortcut
		{
			event.stopPropagation();
			event.preventDefault();
		}
	}
}