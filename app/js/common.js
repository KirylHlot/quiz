var body_element = document.querySelector('.body');
var button_next = document.querySelector('.button_next');
var button_back = document.querySelector('.button_back');
var quiz_item_mass = document.getElementsByClassName('quiz_item');
var simple_input_wrapper_mass = document.getElementsByClassName('simple_input_wrapper');
var	checkbox_mass = document.getElementsByClassName('checkbox');
var	textarea_mass = document.getElementsByClassName('textarea');
var	messendger_mass = document.getElementsByClassName('messendger');
var	main_input_mass = document.getElementsByClassName('main_input');
var quiz_wrapper = document.querySelector('.quiz_wrapper');
var mob_click_button = document.querySelector('.mob_click_button');
var footer_wrapper = document.querySelector('.footer_wrapper');


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
	if(document.body.clientWidth >= 768){
		if (body_element.classList.contains('isfooter')) {
			main_right_wrapper_height();
		}
	}
	////////////////////дефолтные настройки////////////////////
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


	if (document.body.clientWidth < 577) {
		// setGoTopClass ();
	}

	/////////////////расстановка слушателей///////////////
	// передаем элемент и настройки в наблюдатель
	observer.observe(quiz_wrapper, config);

	//слушатель на следующий шаг или финальное окно
	button_next.addEventListener('click', function() {
		if(isAnswerValid(quiz_item_mass[quiz_wrapper.dataset.index-1])){
			if (quiz_wrapper.dataset.index != quiz_item_mass.length) {
				quiz_wrapper.dataset.index = +quiz_wrapper.dataset.index + 1;
			} else {
				body_element.classList.add('final_step');
				setAnswers();
			}
		} else {
			alert('Пожалуйста, заполните поля верно')
		}

		if (document.body.clientWidth < 577) {
			// setGoTop();
		}
	});	

	//слушатель на предыдущий шаг
	button_back.addEventListener('click', function() {
		if(quiz_wrapper.dataset.index != 1){
			quiz_wrapper.dataset.index = +quiz_wrapper.dataset.index - 1;
		}
		if (document.body.clientWidth < 577) {
			// setGoTop();
		}
	});

	//слушатель на кнопка перехода к квизу
	document.getElementById('start_quiz').onclick = function() {
		body_element.classList.remove('main_view');
		body_element.classList.add('start_quiz');
	}

	//слушатель на кнопке политики безопасности
	document.querySelector('.confid_wrap').addEventListener('click',function() {
		togglePoliticActive();
	});

	//слушатель/переключатель на инпутах
	toggleSimpleInputActive()

	//слушатель/переключатель на checkbox
	toggleCheckboxActive();	

	//слушатель/переключатель на textarea
	toggleTextareaActive();

	///слушатели финального окна (мессенджер)
	document.querySelector('.use_messenager_button').onclick = function() {
		document.querySelector('.first_window').classList.add('d-none');
		document.querySelector('.second_window').classList.remove('d-none');
		document.querySelector('.form_button').classList.add('d-none');
		for (var i = 0; i < main_input_mass.length; i++) {
			main_input_mass[i].removeAttribute('required');
		}
		document.getElementById('messenger_input').setAttribute('required', true);
	}	

	document.querySelector('.back_to_contacts').onclick = function() {
		document.querySelector('.first_window').classList.remove('d-none');
		document.querySelector('.second_window').classList.add('d-none');
		document.querySelector('.form_button').classList.remove('d-none');
		for (var i = 0; i < main_input_mass.length; i++) {
			main_input_mass[i].setAttribute('required', true);
		}
		document.getElementById('messenger_input').removeAttribute('required');
	}

	for (var i = 0; i < messendger_mass.length; i++) {
		messendger_mass[i].addEventListener('click', function() {
			document.querySelector('.second_window').classList.add('d-none');
			document.querySelector('.third_window').classList.remove('d-none');
			document.querySelector('.form_button').classList.remove('d-none');
			document.querySelector('.' + this.id).classList.remove('d-none');

		});
	}

	document.querySelector('.back_to_choise').onclick = function() {
		document.querySelector('.second_window').classList.remove('d-none');
		document.querySelector('.third_window').classList.add('d-none');
		let final_title_mass = document.getElementsByClassName('final_title');
		for (var i = 0; i < final_title_mass.length; i++) {
			final_title_mass[i].classList.add('d-none');
		}
		document.querySelector('.form_button').classList.add('d-none');
	}


//////////Настройка элементов первого экрана
if(document.body.clientWidth < 768){
	if (body_element.classList.contains('isfooter')) {
		mob_click_button.classList.remove('d-none');
		footer_wrapper.classList.add('d-none');

		mob_click_button.onclick = function() {
			showFooter();
		}


		$(document).mouseup(function (e){ // отслеживаем событие клика по веб-документу
			let block = $(".footer"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
			if (!block.is(e.target) // проверка условия если клик был не по нашему блоку
			    && block.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
					hideFooter();
			}
		});
	}

}

}//закрывает onload

function setGoTopClass () {

}

///////////////кнопка подсказки в мэйн окне в мобильной версии
function setGoTop() {
	document.querySelector('.right_part').classList.remove('rotate_fa');

	let li = document.createElement('li');
	li.className = "go_top";
	li.innerHTML = "<i class=\"fa fa-arrow-circle-up\" aria-hidden=\"true\"></i>"
	document.querySelector('.right_part').appendChild(li);
	let right_part_height = document.querySelector('.right_part').offsetHeight + 16;
	let right_part_height_flag = false;
	document.querySelector('.right_part').style.bottom = -right_part_height + "px";

	document.querySelector('.go_top').onclick = function() {
		this.parentNode.classList.toggle('rotate_fa');
		if (right_part_height_flag) {
			document.querySelector('.right_part').style.bottom = -right_part_height + "px";
			right_part_height_flag = false;
		} else {
			document.querySelector('.right_part').style.bottom = 0 + "px";
			right_part_height_flag = true;
		}
	}
}




///Подсказки в правую колонку
function setRightColumnTips(elem){
	document.getElementById('right_part').innerHTML = elem.querySelector('.quiz_desc_in_right_column').innerHTML;
	if (document.body.clientWidth < 577) {
		setGoTop();
	}
}


function showFooter() {
	mob_click_button.classList.toggle('bottom_view');
	footer_wrapper.classList.toggle('d-none');
}

function hideFooter() {
	mob_click_button.classList.remove('bottom_view');
	footer_wrapper.classList.add('d-none');
}



function setAnswers() {
	let all_answer_mass= [];

	for (let i = 0; i < quiz_item_mass.length; i++) {
		all_answer_mass.push('<br>' + quiz_item_mass[i].querySelector('.question_title').innerText + '<br>') ////сетит значение вопроса
		let currient_answers_mass = quiz_item_mass[i].getElementsByClassName('active');
		for (let i = 0; i < currient_answers_mass.length; i++) {
			////если активный элемент чекбокс
			if(currient_answers_mass[i].classList.contains('checkbox')){
				all_answer_mass.push(currient_answers_mass[i].querySelector('.answer_text').innerText + '<br>') ////сетит значение ответа
			}
			////если активный элемент textarea
			if(currient_answers_mass[i].classList.contains('textarea')){
				all_answer_mass.push(currient_answers_mass[i].getElementsByTagName('textarea')[0].value + '<br>') ////сетит значение ответа
			}			
			////если активный элемент input
			if(currient_answers_mass[i].classList.contains('simple_input_wrapper')){
				all_answer_mass.push(currient_answers_mass[i].getElementsByTagName('input')[0].value + '<br>') ////сетит значение ответа
			}
		}
	}

	let all_answers_string = "";

	for (var i = 0; i < all_answer_mass.length; i++) {
		all_answers_string = all_answers_string + all_answer_mass[i];
	}

	document.getElementById('answers').value = all_answers_string;
	console.log(document.getElementById('answers').value);
}

///////валидация ответов и переход на следующий шаг
function isAnswerValid (elem) {
	// oa = чекбокс и/или текстареа
	// oo = один вариант (чекбокс или текстареа)
	// all = все поля должны быть заполнены
	// oom = один или больше вариантов
	let answers_mass = elem.getElementsByClassName('answer_input');

	if (elem.classList.contains('oa')) { //один ответ (чекбокс или текстареа)
		let countCheckbox = 0;//считаем количество актив
		let countTextarea = 0;//считаем количество актив
		for (let i = 0; i < answers_mass.length; i++) {
			if(answers_mass[i].classList.contains('active')) {
				if(answers_mass[i].classList.contains('checkbox')){
					countCheckbox++;
					if (countCheckbox > 1) {
						return false;
					}		
				}				
				if(answers_mass[i].classList.contains('textarea')){
					countTextarea++;
				}
			}
		}
		if (countCheckbox == 0 && countTextarea == 0) {
			return false;
		}
		return true;
	} //end oa

	if (elem.classList.contains('oo')) { //только один ответ
		let countActive = 0;//считаем количество active checkbox
		for (let i = 0; i < answers_mass.length; i++) {
			if(answers_mass[i].classList.contains('active')) {
				countActive++;
				if (countActive > 1){ //если active больше одного false
					return false;
				}
			}
		}
		if(countActive < 1) { //если active меньше одного false
			return false;
		} else {
			return true;
		}
	} //end oo	

////////////////////////////////////////////
	if (elem.classList.contains('oaon')) { //один ответ или пропустить
		let countActive = 0;//считаем количество active checkbox

		for (let i = 0; i < answers_mass.length; i++) {
			if(answers_mass[i].classList.contains('active')) {
				countActive++;
				if (countActive > 1){ //если active меньше 2х
					return false;
				}
			}
		}
			return true;
	} //end oaon
///////////////////////////////////////////////




	if (elem.classList.contains('all')) { //все поля должны быть заполнены
		let countActive = 0;//считаем количество active checkbox
		for (let i = 0; i < answers_mass.length; i++) {
			if(answers_mass[i].classList.contains('active')) {
				countActive++;
			}
		}
		if(countActive != answers_mass.length){
			return false;
		}
		return true;
	} //end all

	if (elem.classList.contains('oom')) { //один или больше вариантов
		let countActive = 0;//считаем количество active checkbox
		for (let i = 0; i < answers_mass.length; i++) {
			if(answers_mass[i].classList.contains('active')) {
				countActive++;
			}
		}
		if(countActive < 1) { //если active еньше одного false
			return false;
		} else {
			return true;
		}
	} //end oom	
	return true;
} //end function isAnswerValid 


///высота правой колонки квиза
function main_right_wrapper_height() {
	document.getElementById('main_right_wrapper').style.height = document.documentElement.clientHeight - document.getElementById('footer').offsetHeight + "px";
	return true;
}

////расставляем индексы через дата
function setIndexes() {
	for (let i = 0; i < quiz_item_mass.length; i++) {
		quiz_item_mass[i].dataset.index = i+1;
	}
}

///Прячем итемы через д-ноун и первый оставляем
function showQuizItem(index) {
	for (let i = 0; i < quiz_item_mass.length; i++) {
		quiz_item_mass[i].classList.add('d-none');
	}

	for (let i = 0; i < quiz_item_mass.length; i++) {
		if(+quiz_item_mass[i].getAttribute('data-index') == +index){
			quiz_item_mass[i].classList.remove('d-none');
			return true;
		}
	}
}

//наполняем линию итемами
function createPaintSteps(allSteps) {
	for (let i = 0; i < allSteps+1; i++) {
		let li = document.createElement('li');
		li.className = "progress_part d-none";
		li.style.width = 100/(allSteps+1) + "%";
		document.querySelector('.progress_line').appendChild(li);
	}
	return true;
}

/////общее количество шагов
document.querySelector('.all_steps').innerText = quiz_item_mass.length+1;


////текущий шаг + заполнение линии прогресса
function fillProgressLine(currient_step) {
	document.querySelector('.current_step').innerText = currient_step;
	let progress_part_mass = document.getElementsByClassName('progress_part');

	for (let i = 0; i < progress_part_mass.length; i++) {
		if (i < currient_step) {
			progress_part_mass[i].classList.remove('d-none');
		} else {
			progress_part_mass[i].classList.add('d-none');
		}
	}
}


//добавяем галку в политике безопасности
function setPoliticActive() {
	if (document.querySelector('.politic_wrapper').classList.contains('active')) {
		return true;
	} else {
		togglePoliticActive();
		return false;
	}
}

//тоглим галку в политике безопасности
function togglePoliticActive() {
	document.querySelector('.politic_wrapper').classList.toggle('active');
}

////////тоглит класс active инпуту simple_input
function toggleSimpleInputActive() {
	for (let i = 0; i < simple_input_wrapper_mass.length; i++) {
		simple_input_wrapper_mass[i].firstElementChild.addEventListener('input', function() {
			if(this.value.length > 0) {
				this.parentNode.classList.add('active');
				this.parentNode.parentNode.classList.add('active');
				return true;
			} else {
				this.parentNode.classList.remove('active');
				this.parentNode.parentNode.classList.remove('active');
				return false;
			}
		});
	}
}

////////Тоглим класс active чекбоксу по щелчку
function toggleCheckboxActive() {
	for (let i = 0; i < checkbox_mass.length; i++) {
		checkbox_mass[i].addEventListener('click', function() {
			let parentElem = this.parentNode.parentNode;

			if(parentElem.classList.contains('oa') || parentElem.classList.contains('oo') || parentElem.classList.contains('oaon')){  //если можно выбрать только один чекбокс
				let answer_input_mass = parentElem.getElementsByClassName('answer_input'); //собираем все инпуты
				let checkbox_mass = [];//создаем пустой максив только для чекбоксов

				for (let i = 0; i < answer_input_mass.length; i++) {//наполняем только чекбоксами
					if (answer_input_mass[i].firstElementChild.type === 'checkbox') {
						checkbox_mass.push(answer_input_mass[i]);
					}
				}

				for (let i = 0; i < checkbox_mass.length; i++) {//чистим классы active
					if(checkbox_mass[i] != this){
						checkbox_mass[i].classList.remove('active');
					}
				}

				this.classList.toggle('active');//обавляем active
				return true
			}
			//если допустим множественный выбор
			this.classList.toggle('active');
			return true;
		});
	}
}

function toggleTextareaActive () {
	for (let i = 0; i < textarea_mass.length; i++) {
		textarea_mass[i].firstElementChild.addEventListener('input', function() {
			if(this.value.length > 0) {
				this.parentNode.classList.add('active');
				return true;
			} else {
				this.parentNode.classList.remove('active');
				return false;
			}
		});
	}
};

function setDopMessage(){
	if (body_element.classList.contains('final_textarea')){
		document.getElementById('dop_message').value = document.getElementById('content').value;
	}
	return true;
}

$(document).ready(function() {
   $(".final_form").submit(function() {
   	if(setPoliticActive() && setDopMessage()){
			$.ajax({
         type: "POST",
         url: "simple_mail.php",
         data: $(this).serialize()
      }).done(function() {
				$(this).find("input").val("");
				location.replace(location + "thank_you.html");
      }).fail(function() {
        alert('Ошибка соединения');
        //это убрать
				location.replace(location + "thank_you.html");
      });
    }
      return false;
   });
});

