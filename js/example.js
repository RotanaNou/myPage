//Name: Rotana Nou
//Assignment: Classwork
//Date: 11/1/16
// ADD NEW ITEM TO END OF LIST
var list = document.getElementsByTagName('ul')[0];
var addLast = document.createElement('li');
var stringLast = document.createTextNode('cream');
addLast.appendChild(stringLast);
list.appendChild(addLast);

// ADD NEW ITEM START OF LIST
var addFirst = document.createElement('li');
var stringFirst = document.createTextNode('kale');
addFirst.appendChild(stringFirst);
list.insertBefore(addFirst, list.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listElements = document.querySelectorAll('li');
var i;
for (i = 0; i < listElements.length; i++) {
  listElements[i].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var elHeader = document.querySelector('h2');
var textHeader = elHeader.firstChild.nodeValue;
var numElements = listElements.length;
var newHeader = textHeader + '<span>' + numElements + '</span>';
elHeader.innerHTML = newHeader;
