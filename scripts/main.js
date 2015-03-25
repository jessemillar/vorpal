// window.history.forward(1);
// window.onbeforeunload = function() { return "Do you want to log out of cursOS?" }

var command_history = new Array();

var bash_prompt = 'cursOS: ~user$ ';
var block_character = String.fromCharCode(9616);
var response_prefix = '';

var command_input = document.getElementById('command_input');
var response_input = document.getElementById('response_input');

var terminal = document.getElementById('terminal');
var terminal_status = 'command';

function init () {
	terminal.value = bash_prompt;
	grab_focus();
}

function update_output () {
	terminal.value = terminal.value.substring(0, terminal.value.lastIndexOf('\n') + 1); // Don't overwrite the last linebreak

	if (terminal_status == 'command')
	{
		terminal.value += bash_prompt + command_input.value + block_character;
	}
	else if (terminal_status == 'response')
	{
		terminal.value += response_prefix + response_input.value + block_character;
	}
}

function grab_focus () {
	if (terminal_status == 'command')
	{
		command_input.focus();
	}
	else if (terminal_status == 'response')
	{
		response_input.focus();
	}
}

	function switch_to_command () {
		command_input.focus();
		terminal_status = 'command';
	}

	function switch_to_response () {
		response_input.focus();
		terminal_status = 'response';
	}

function log_command (command) {
	command_history.push(command);
}

function key_event (event) {
	filter_keys(event);

	update_output();
}

	function filter_keys (event) {
		// console.log(event.keyCode);

		if (check_key(27, event)) // Escape
		{
			switch_to_command();
		}

		if (check_key(8, event)) // Backspace "back button" shortcut
		{
			if (document.activeElement.id == 'command_input' && command_input.value.length == 0)
			{
				prevent_key(event);

				switch_to_command();
			}
			else if (document.activeElement.id == 'response_input' && response_input.value.length == 0)
			{
				prevent_key(event);

				switch_to_response();
			}
		}

		if (check_key(13, event)) // Enter
		{
			prevent_key(event);

			parse();

			if (terminal_status == 'command')
			{
				command_input.value = '';
			}
			else if (terminal_status == 'response')
			{
				response_input.value = '';
			}
		}

		if (check_key(38, event)) // Up arrow
		{
			prevent_key(event);
		}
	}

		function check_key (key_code, event) {
			// console.log(event.keyCode);

			if (event.keyCode == key_code)
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		function prevent_key (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		function parse (event) {
			var segments = command_input.value.split(' ');

			// Do something with the command here
			if (segments[0] == 'ssh')
			{
				ssh(segments[1]);
			}
		}

function ssh (command) {
	var parts = command.split('@');

	for (var i = 0; i < database.ssh.sites.length; i++)
	{
		if (database.ssh.sites[i].url == parts[1])
		{
			terminal.value += '\n';
			response_prefix = command + '\'s password: ';

			switch_to_response();
		}
		else if (i == database.ssh.sites.length - 1)
		{
			console.log('HERE');

			terminal.value += '\nServer is unresponsive\n';

			switch_to_command();
		}
	}
}