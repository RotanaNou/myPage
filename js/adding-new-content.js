$(function() {
    $('ul').before('<p>Just Updated</p>');
    $('li.hot').prepend('+ ');
    var $newEl = $('<li><em>gluten-free</em> soy sauce</li>');
    $('li:last').after($newEl);
});
