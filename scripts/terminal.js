var terminal = new function() {
	var self = this;

	this.history = new Array();
	this.commands = new Object();

	this.bash = 'vorpalOS: ~user$ ';
	this.cursor = String.fromCharCode(9616);
	this.prefix = '';

	this.inputs = new Object();
		this.inputs.command = document.getElementById('command_input');
		this.inputs.response = document.getElementById('response_input');

	this.textarea = document.getElementById('terminal');
	this.status = 'command';

	this.init = function() {
		this.textarea.value = this.bash;
		this.focus();
	}

	this.update = function() {
		this.textarea.value = this.textarea.value.substring(0, this.textarea.value.lastIndexOf('\n') + 1); // Don't overwrite the last linebreak

		if (this.status == 'command')
		{
			this.textarea.value += this.bash + this.inputs.command.value + this.cursor;
		}
		else if (this.status == 'response')
		{
			this.textarea.value += this.prefix + this.inputs.response.value + this.cursor;
		}
	}

	this.focus = function() {
		if (this.status == 'command')
		{
			this.inputs.command.focus();
		}
		else if (this.status == 'response')
		{
			this.inputs.response.focus();
		}
	}

		this.switch = new Object();

			this.switch.command = function() {
				self.inputs.command.focus();
				self.status = 'command';
			}

			this.switch.response = function() {
				self.inputs.response.focus();
				self.status = 'response';
			}

	this.log_command = function(command) {
		this.history.push(command);
	}

	this.key = function(event) {
		this.filter(event);

		this.update();
	}

		this.filter = function(event) {
			// console.log(event.keyCode);

			if (event.keyCode == 27) // Escape
			{
				this.switch.command();
			}

			if (event.keyCode == 8) // Backspace "back button" shortcut while in input form element
			{
				if (document.activeElement.id == 'command_input' && this.inputs.command.value.length == 0)
				{
					this.prevent(event);

					this.switch.command();
				}
				else if (document.activeElement.id == 'response_input' && this.inputs.response.value.length == 0)
				{
					this.prevent(event);

					this.switch.response();
				}
			}

			if (event.keyCode == 13) // Enter
			{
				this.prevent(event);

				this.parse();

				if (this.status == 'command')
				{
					this.inputs.command.value = '';
				}
				else if (this.status == 'response')
				{
					this.inputs.response.value = '';
				}
			}

			if (event.keyCode == 38) // Up arrow
			{
				this.prevent(event);
			}
		}

			this.prevent = function(event) {
				event.stopPropagation();
				event.preventDefault();
			}

			this.parse = function(event) {
				this.segments = this.inputs.command.value.split(' ');

				// Do something with the command here
				if (this.segments[0] == 'ssh')
				{
					this.commands.ssh(this.segments[1]);
				}
			}
}