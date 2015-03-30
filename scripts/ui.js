var dragger = new function() {
    this.target;

    this.mouse = new Object();
        this.mouse.x;
        this.mouse.y;

    this.div = new Object();
        this.div.x;
        this.div.y;

    this.difference = new Object();
        this.difference.x;
        this.difference.y;

    this.select = function(div, event) {
        this.target = div.parentNode;

        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;

        this.div.x = parseInt(this.target.style.left);
        this.div.y = parseInt(this.target.style.top);

        this.difference.x = this.mouse.x - this.div.x;
        this.difference.y = this.mouse.y - this.div.y;
    }

    this.deselect = function() {
        this.target = null;
    }

    this.drag = function(event) {
        if (this.target)
        {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
            
            this.target.style.left = this.mouse.x - this.difference.x + 'px';
            this.target.style.top = this.mouse.y - this.difference.y + 'px';
        }
    }
}