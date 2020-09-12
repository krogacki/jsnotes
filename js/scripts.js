// 1. Po kliknieciu Dodaj, doda nowy element w liscie z domyslnym naglowkiem
// 2. przeskocz do nowej notatki a stara zapisz
// 3. mozliwosc edycji naglowka oraz tresci
// 4. dodanie przycisku do zapisywania;

var newItemTitle = "New Item";
var addButton = document.querySelector(".left .add");
var clearButton = document.querySelector(".left .clear");

var clearStorage = function() {
	localStorage.clear();
}

var getListContainerElement = function() {
	return document.querySelector('ul');
}

var createElement = function(tagName, options) {
	var element = document.createElement(tagName); 
	if (options) {
		for (var key in options) {
			if (options.hasOwnProperty(key)) {
				element[key] = options[key];
			}
		}
	}

	return element;
}

var save = function(id) {
	var data = {
		title: document.querySelector('li[id="' + id + '"] span').innerText,
		body: ""
	};
	localStorage.setItem(id, JSON.stringify(data));
}

var makeItem = function(id) {

	var data = JSON.parse(localStorage.getItem(id));
	var span = createElement('span', {
		innerText: data.title
	});
	var button = createElement('button', {
		className: 'delete',
		innerText: 'X'
	});
	var element = createElement('li', {
		id: id
	 });
	 element.appendChild(span);
	 element.appendChild(button);

	var container = getListContainerElement();
	container.appendChild(element);
} 

var load = function() {
	var keys = Object.keys(localStorage);
	keys.forEach(function(id) {

		if (!isNaN(parseInt(id))) {
			makeItem(id);
		}

	});
	if (localStorage.getItem('1')) {
		document.querySelector('li[id="' + localStorage.getItem("active") + '"]').classList.add("active");
	}
}

var newItem = function() {
	if (document.querySelector(".active")) {
		document.querySelector(".active").classList.remove("active");
	}
	var container = getListContainerElement();
	var items = container.querySelectorAll("li");	
	var id = items.length + 1;
	var span = createElement('span', {
		innerText: newItemTitle
	});
	var button = createElement('button', {
		className: 'delete',
		innerText: 'X'
	});
	var item = createElement('li', {
		id: id,
		className: 'active'
	});
	item.appendChild(span);
	item.appendChild(button);
	container.appendChild(item);

	save(id);
}

var toggleItem = function() {

}

load();

getListContainerElement().addEventListener('click', function(e) {

	var element = e.target;
	if (element.localName === "button") {
		var buttonParent = element.parentNode;
		localStorage.removeItem(buttonParent.id);
		buttonParent.parentNode.removeChild(buttonParent);
	}

	if (element.localName === "li") {
		var currentActiveItem = document.querySelector(".active");
		currentActiveItem.classList.remove("active");
		element.classList.add("active");
		localStorage.setItem("active", element.id);
	}
})
addButton.addEventListener("click", newItem);
clearButton.addEventListener("click", clearStorage);