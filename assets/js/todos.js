let list = $("ul");

// Checks off (mutes and strikes through) list items and updates the cookie
list.on("click", "li", function(){
    $(this).children().last().toggleClass("completed-task");
    createCookie('todo', list.html(), 7);
});

// Removes list items when the trash can is clicked and updates the cookie
list.on("click", "#trash", function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
        createCookie('todo', list.html(), 7);
    });
    event.stopPropogation();
});

// Adds a list item when the enter key is pressed and updates the cookie
$("input[type='text']").keypress(function(event) {
    if(event.which === 13) {
        var item = $(this).val();
        $(this).val("");
        list.append('<li><span id="trash"><i class="fas fa-trash"></i></span> <span>' + item + '</span></li>');
    };
    createCookie('todo', list.html(), 7);
});

// Collapses and expands the input box and changes the +/- to reflect the change
$("h3 i").click(function() {
    $(this).fadeOut(150, function() {
        $(this).toggleClass("fa-plus fa-minus")
        $(this).fadeIn(150);
    });
    $("input[type='text']").fadeToggle(200);
});

// Loads list items from the cookie on page load
list.html(readCookie('todo'));


// Functions for creating, reading, and deleting cookies are from quirksmode
// https://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	};
	return null;
};

function eraseCookie(name) {
	createCookie(name,"",-1);
};
