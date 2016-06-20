'use strict'

var headers = document.querySelectorAll('.headline');
var descriptions = document.querySelectorAll('.info__description');
var placeholders = document.querySelectorAll('.placeholder');

console.log(placeholders);

placeholders[0].style.height = headers[0].offsetHeight + 'px'

var defaultPosition = Array.prototype.map.call(headers,function(el){
	return {
		top: el.getBoundingClientRect().top,
		height: el.offsetHeight
	};
});

var paddings = Array.prototype.map.call(descriptions,function(element){
	return parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-top"));
});

var stack = 0;

console.log(paddings + '   ' + stack);


var cls = 'info__header--sticky';

function manipulate(logic, element, index, clas) {
	if (logic && !element.classList.contains(clas)) {
		element.classList.add(clas);
		descriptions[index].style.paddingTop = paddings[index] + defaultPosition[index].height + 'px';
		//stack += defaultPosition[index].height;
	} else if (!logic && element.classList.contains(clas)) {
		element.classList.remove('info__header--sticky');
		descriptions[index].style.paddingTop = paddings[index] + 'px';
		//stack -= defaultPosition[index].height;
	}
};

function sticky() {
	for(var i = 1; i < headers.length; i++) {
		var bool = pageYOffset >= (defaultPosition[i].top - stack);
		manipulate(bool, headers[i], i, cls);
	}
}

window.onscroll = sticky;

