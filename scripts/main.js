var command_history = new Array();
var bash_prompt = "ctOS: ~user$ ";
var terminal_status = 'waiting';

var terminal = document.getElementById('terminal');

function init () {
	insert_string(bash_prompt);
	terminal.focus();
}

function get_cursor_position () {
	return terminal.value.slice(terminal.value.lastIndexOf('\n') + 1, terminal.selectionStart).length - bash_prompt.length;
}

function insert_string (string) {
	terminal.value += string;
}

function log_command (command) {
	command_history.push(command);
}

function key_event (event) {
	filter_keys(event);
}

	function filter_keys (event) {
		var key = event.keyCode;

		if (key == 13) // Enter
		{
			prevent_key(event);

			parse();
		}

		if (key == 38) // Up arrow
		{
			prevent_key(event);
		}
	}

		function prevent_key (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		function parse (event) {
			var command = terminal.value.substr(terminal.value.lastIndexOf('\n') + 1 + bash_prompt.length);
			var command_parts = command.split(' ');

			// Do something with the command here
			if (command_parts[0] == 'ssh')
			{
				ssh(command_parts[1]);
			}
		}

function ssh (command) {
	var parts = command.split('@');

	for (var i = 0; i < database.ssh.sites.length; i++)
	{
		if (database.ssh.sites[i].url == parts[1])
		{
			insert_string('\n' + command + '\'s password: ');
		}
	}
}