var drag_target;

var mouse_x;
var mouse_y;

var div_left;
var div_top;

var difference_x;
var difference_y;

function select_drag (div, event) {
    drag_target = div.parentNode;

    mouse_x = event.clientX;
    mouse_y = event.clientY;

    div_left = parseInt(drag_target.style.left);
    div_top = parseInt(drag_target.style.top);

    difference_x = mouse_x - div_left;
    difference_y = mouse_y - div_top;
}

function deselect_drag () {
    drag_target = null;
}

function drag (event) {
    if (drag_target)
    {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
        
        drag_target.style.left = mouse_x - difference_x + 'px';
        drag_target.style.top = mouse_y - difference_y + 'px';
    }
}