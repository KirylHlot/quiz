var body_element = document.querySelector('.body');
var button_next = document.querySelector('.button_next');
var button_back = document.querySelector('.button_back');
var quiz_item_mass = document.getElementsByClassName('quiz_item');
var quiz_wrapper = document.querySelector('.quiz_wrapper');


//////слушатель квиз-враппера
// создаем экземпляр наблюдателя
var observer = new MutationObserver(function(mutations) {
	showQuizItem(+quiz_wrapper.dataset.index);
	fillProgressLine(+quiz_wrapper.dataset.index);
	setRightColumnTips(quiz_item_mass[+quiz_wrapper.dataset.index-1]);
});
// настраиваем наблюдатель
var config = { attributes: true, childList: true, characterData: true }
//////конец слушатель квиз-враппера


window.onload = function() {
	////////////////////дефолтные настройки
	quiz_wrapper.dataset.index = 1;
	//раздаем всем элемнтам квиза индексы
	setIndexes();
	//наполняем линию прогресса элементами
	if (createPaintSteps(quiz_item_mass.length)){
	//устанавливаем текущий шаг
		fillProgressLine(1);
	//первый итем без класса d-none
		showQuizItem(+quiz_wrapper.dataset.index);
	}
	///сетит подсказки в правую колонку
	setRightColumnTips(quiz_item_mass[+quiz_wrapper.dataset.index-1]);

	/////////////////расстановка слушателей
	// передаем элемент и настройки в наблюдатель
	observer.observe(quiz_wrapper, config);
	//слушатель на следующий шаг
	button_next.addEventListener('click', function() {
		quiz_wrapper.dataset.index = +quiz_wrapper.dataset.index + 1;
	});	
	//слушатель на предыдущий шаг
	button_back.addEventListener('click', function() {
		quiz_wrapper.dataset.index = +quiz_wrapper.dataset.index - 1;
	});
	//слушатель на функция активации чекбокса
	toggleCheckboxActive();
	//слушатель на кнопка перехода к квизу
	document.getElementById('start_quiz').onclick = function() {
		body_element.classList.remove('main_view');
		body_element.classList.add('start_quiz');
	}

}


///высота правой колонки квиза
function main_right_wrapper_height() {
	document.getElementById('main_right_wrapper').style.height = document.documentElement.clientHeight - document.getElementById('footer').offsetHeight + "px";
	return true;
}

////расставляем индексы через дата
function setIndexes() {
	for (var i = 0; i < quiz_item_mass.length; i++) {
		quiz_item_mass[i].dataset.index = i+1;
	}
}

///Прячем итемы через д-ноун и первый оставляем
function showQuizItem(index) {
	for (var i = 0; i < quiz_item_mass.length; i++) {
		quiz_item_mass[i].classList.add('d-none');
	}

	for (var i = 0; i < quiz_item_mass.length; i++) {
		if(+quiz_item_mass[i].getAttribute('data-index') == +index){
			quiz_item_mass[i].classList.remove('d-none');
			return true;
		}
	}
}

////////Тоглим класс active чекбоксу по щелчку
function toggleCheckboxActive() {
	let	checkbox_mass = document.getElementsByClassName('checkbox');
	for (var i = 0; i < checkbox_mass.length; i++) {
		checkbox_mass[i].addEventListener('click', function() {
			this.classList.toggle('active');
			return true;
		});
	}
}


///////прогресс шагов и линия прогресса
/////общее количество шагов
document.querySelector('.all_steps').innerText = quiz_item_mass.length;

//наполняем линию итемами
function createPaintSteps(allSteps) {
	for (var i = 0; i < allSteps; i++) {
		let li = document.createElement('li');
		li.className = "progress_part d-none";
		li.style.width = 100/allSteps + "%";
		document.querySelector('.progress_line').appendChild(li);
	}
	return true;
}

////текущий шаг + заполнение линии прогресса
function fillProgressLine(currient_step) {
	document.querySelector('.current_step').innerText = currient_step;
	let progress_part_mass = document.getElementsByClassName('progress_part');

	for (var i = 0; i < progress_part_mass.length; i++) {
		if (i < currient_step) {
			progress_part_mass[i].classList.remove('d-none');
		} else {
			progress_part_mass[i].classList.add('d-none');
		}
	}
}

///Подсказки в правую колонку
function setRightColumnTips(elem){
	document.getElementById('right_part').innerHTML = elem.querySelector('.quiz_desc_in_right_column').innerHTML;

}



////animate (set viewportchecker)
//jQuery(document).ready(function() {
// jQuery('.fadeInDown_anim').addClass("hidden").viewportChecker({
//    classToAdd: 'visible animated initial fadeInDown delay-10s',
//   offset: 0,
//   repeat: true
// });
//});

// ScrollReveal animate (set viewportchecker)
//ScrollReveal().reveal('.anim2',{ 
// 	delay:300,
// 	reset: true
// });

// ScrollReveal().reveal('.anim3',{ 
// 	delay: 500,
// 	reset: true
// });

// ScrollReveal().reveal('.anim4',{ 
// 	delay: 700,
// 	reset: true
// });

// ScrollReveal().reveal('.anim5',{ 
// 	delay: 900,
// 	reset: true
// });





// window.onload = function() {

// //image resizer
//   setMaxHeightByWrapper ("projects_carousel_img_wrapper", "projects_carousel_img");
// // Simple height
//	setMaxHeightAllBlocks (blockClass)

// /// click out
// 	$(document).mouseup(function (e){ // отслеживаем событие клика по веб-документу
// 	    let block = $(".main_nav"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
// 	    if (!block.is(e.target) // проверка условия если клик был не по нашему блоку
// 	        && block.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
// 	      burger_button.classList.remove('hide_burger');
// 	      main_nav.classList.add('hide_main_nav');
// 	    }
// 	});
// }

//document.body.clientWidth

// $(document).ready(function() {
//    $("#form_popup").submit(function() {
//       $.ajax({
//          type: "POST",
//          url: "simple_mail.php",
//          data: $(this).serialize()
//       }).done(function() {
//          $(this).find("inpu, textarea").val("");
//          alertDone();
//          $("#form_popup").trigger("reset");
//       }).fail(function() {
//         alert('Ошибка соединения');
//       });
//       return false;
//    });
// });


//////////////////name of selected file
// var wnt_file_top = document.querySelector('.wnt_file_top');
// document.getElementById('fileToUpload').onchange = function () {
// let fname = this.value;
// let fname_mass = fname.split('\\');
// fname = fname_mass[fname_mass.length-1];
// wnt_file_top.innerText = fname;
// };

// var want_file = document.querySelector('.want_file');
// document.getElementById('fileToUpload_want').onchange = function () {
// let fname = this.value;
// let fname_mass = fname.split('\\');
// fname = fname_mass[fname_mass.length-1];
// want_file.innerText = fname;
// };


/////////////////////////////////scroll menu
// $(document).ready(function() {
// $("a.scroll").click(function() {
// $("html, body").animate({
// scrollTop: $($(this).attr("href")).offset().top + "px"
// }, {
// duration: 500,
// easing: "swing"
// });
// return false;
// });
// });




//////for path length SVG
// totalLength(); 
// function totalLength () { 
// var path = document.querySelector('.fil0'); 
// var len = Math.round(path.getTotalLength()); 
// console.log(len); 
// }







///////////////////////////////owl functions
//$('.logotypes_carousel').owlCarousel({
//		loop: true,
//		nav: false,
//		responsiveClass: true,
//		margin: 0,
//		padding: 0,
//		dots: false,
//		responsive: {
//     0: {
//       items: 1
//      },
//      576: {
//        items: 2
//      },
//      1200: {
//         items: 3
//      }
//   }
//});

///center by click and swipe
// set data-position(0++) in HTML


//var review_carousel = $('.review_carousel');

// $(document).on('click', '.owl-item>div', function() {
//   review_carousel.trigger('to.owl.carousel', $(this).data( 'position' ) );
// 	changeQuote(this.querySelector('.center'));
// });

// review_carousel.on('dragged.owl.carousel', function(event) {
// 	changeQuote();
// })

// changeQuote();
// function changeQuote(){
// 	let review_carousel_js = document.querySelector('.review_carousel')
// 	let review_carousel_text = review_carousel_js.querySelector('.center').querySelector('.personal_quote').innerText;
// 	document.querySelector('.change_quote').innerText = review_carousel_text;
// }

//$(window).scroll(function(){
//
//    var st = $(this).scrollTop();
//
//    $(".lift").css({
//        "transform" : "translate(0%, " + st/30+ "%)"
//    });    
//});


