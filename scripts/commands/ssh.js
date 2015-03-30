terminal.commands.ssh = function(command) {
	this.parts = command.split('@');

	for (var i = 0; i < database.ssh.sites.length; i++)
	{
		if (database.ssh.sites[i].url == this.parts[1])
		{
			terminal.textarea.value += '\n';
			terminal.prefix = command + '\'s password: ';

			terminal.switch.response();
		}
		else if (i == database.ssh.sites.length - 1)
		{
			terminal.textarea.value += '\nServer unresponsive\n';

			terminal.switch.command();
		}
	}
}