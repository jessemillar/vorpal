var command_history = new Array();
var bash_prompt = "%> ";

var terminal = document.getElementById('terminal');

function init () {
	insert_string(bash_prompt);
	terminal.focus();
}

function parse (event) {
	var command = terminal.value.substr(terminal.value.lastIndexOf('\n') + 1 + bash_prompt.length);
	var command_parts = command.split(' ');

	// Do something with the command here
	if (command_parts[0] == 'ssh')
	{
		ssh(command_parts[1]);
	}

	insert_string('\n' + bash_prompt);
	// console.log(command, command_parts);
}

function log_command (command) {
	command_history.push(command);
}

function insert_string (string) {
	terminal.value += string;
}

function ssh (command) {
	// Stuff
	var parts = command.split('@');

	ssh_password_prompt(command);

	console.log(parts);
}

	function ssh_password_prompt (command) {
		// Add password prompt
		insert_string('\n' + command + '\'s password: ');
	}