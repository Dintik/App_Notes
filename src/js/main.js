// ----- Кнопки под заголовком -----
let addNote = document.getElementById("addNote");
let deleteAllNote = document.getElementById("deleteAllNote");
// let editNote = document.getElementById("editNote");
// let deleteNote = document.getElementById("deleteNote");

// ----- Кнопки подтверждения -----
let addNoteSub = document.getElementById("addNoteSub");
let editNoteSub = document.getElementById("editNoteSub");

// ----- Окна для работы с заметками -----
let addNoteWindow = document.getElementById("addNoteWindow");
let editNoteWindow = document.getElementById("editNoteWindow");

// ----- Поля для редактирования заметок -----
let addNoteTitle = document.getElementById("addNoteTitle");
let addNoteText = document.getElementById("addNoteText");
let editNoteTitle = document.getElementById("editNoteTitle");
let editNoteText = document.getElementById("editNoteText");

// ----- Контейнер с заметками -----
let notesContainer = document.getElementById("notesContainer");

// ----- Фон для закрытия диалогового окна -----
let windowCloseBg = document.getElementById("windowCloseBg");
let bodyForWindow = document.getElementsByTagName("body")[0];

// ----- Preloader -----
let preloaderSpinner = document.querySelector(".lds-spinner");

// ----- Кнопки редактирования и удаления заметок к каждой отдельно -----
let buttonClickEdit = [];
let buttonClickRemove = [];




function toggleClass(element, className){
    if (!element || !className){
        return;
    }

    var classString = element.className, nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
    }
    element.className = classString;
}




addNote.onclick = () => {
	toggleClass(addNoteWindow, "dn");
	toggleClass(windowCloseBg, "dn");
	toggleClass(addNote, "operation-on-note--active");
	toggleClass(bodyForWindow, "overflow-h");
	bodyForWindow.scrollIntoView(top);
	addNoteTitle.value = "";
	addNoteText.value = "";
}

deleteAllNote.onclick = () => {
	toggleClass(preloaderSpinner, "dn");
	removeAllData();
}


windowCloseBg.onclick = () => {
	addNoteWindow.classList.add("dn");
	editNoteWindow.classList.add("dn");
	windowCloseBg.classList.add("dn");
	addNote.classList.remove("operation-on-note--active");
	bodyForWindow.classList.remove("overflow-h");
}


addNoteSub.onclick = () => {
	if (document.getElementById("empyNotesText")) {
		empyNotesText.parentNode.removeChild(empyNotesText);
	}
	if (addNoteTitle.value || addNoteText.value) {
		toggleClass(preloaderSpinner, "dn");
		toggleClass(addNoteWindow, "dn");
		toggleClass(windowCloseBg, "dn");
		toggleClass(addNote, "operation-on-note--active");
		toggleClass(bodyForWindow, "overflow-h");

		writeNote();
	} else {
		alert("Заполните одно из полей!");
	}
}












// ----- Количество заметок пользователя -----
let amountNotes;
// ----- Какая заметка сейчас редактируется -----
let howNoteEdinNow;


// ----- DataCode -----
// Web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDECIdac0n1r9lwAL1j9ub1hz_9NVswD-A",
authDomain: "sasand-e575b.firebaseapp.com",
databaseURL: "https://sasand-e575b.firebaseio.com/",
projectId: "sasand-e575b",
storageBucket: "sasand-e575b.appspot.com",
messagingSenderId: "238117300544",
appId: "1:238117300544:web:0e6ee4f1ccd16372c4f2a5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function removeAllData() {
	firebase.database().ref("user").set({
		notes: false
	});
	getData();
}

function writeNote() {

	let Data = new Date();
	let Year = Data.getFullYear();
	let Month = Data.getMonth();
	let Day = Data.getDate();
	let Hour = Data.getHours();
	let Minutes = Data.getMinutes();

	switch (Month)
	{
	  case 0: fMonth="января"; break;
	  case 1: fMonth="февраля"; break;
	  case 2: fMonth="марта"; break;
	  case 3: fMonth="апреля"; break;
	  case 4: fMonth="мая"; break;
	  case 5: fMonth="июня"; break;
	  case 6: fMonth="июля"; break;
	  case 7: fMonth="августа"; break;
	  case 8: fMonth="сентября"; break;
	  case 9: fMonth="октября"; break;
	  case 10: fMonth="ноября"; break;
	  case 11: fMonth="декабря"; break;
	}

	if (amountNotes != undefined) {
		firebase.database().ref("user/notes").update({
			[amountNotes]: [addNoteTitle.value, addNoteText.value, [Day, fMonth, Year, Hour, Minutes]]
		});
		getData();
	} else {
		amountNotes = 0;
		writeNote();
	}
}



function toTwoSimbolTime(argument) {
	if (argument < 10) {
		let twoTime = "0" + String(argument);
		return twoTime;
	} else {
		return argument;
	}
}




function showEditNoteWindow(i, title, text) {
	console.log(title);
	let titleForEdit = title;
	let textForEdit = text;

	toggleClass(editNoteWindow, "dn");
	toggleClass(windowCloseBg, "dn");
	toggleClass(bodyForWindow, "overflow-h");
	bodyForWindow.scrollIntoView(top);
	editNoteTitle.value = titleForEdit;
	editNoteText.value = textForEdit;

	howNoteEdinNow = i;
}

editNoteSub.addEventListener("click", () => {editNoteDB(howNoteEdinNow)}, false);

function editNoteDB(i) {


	if (editNoteTitle.value || editNoteText.value) {
		toggleClass(preloaderSpinner, "dn");
		toggleClass(editNoteWindow, "dn");
		toggleClass(windowCloseBg, "dn");
		toggleClass(bodyForWindow, "overflow-h");

		let Data = new Date();
		let Year = Data.getFullYear();
		let Month = Data.getMonth();
		let Day = Data.getDate();
		let Hour = Data.getHours();
		let Minutes = Data.getMinutes();

		switch (Month) {
		  case 0: fMonth="января"; break;
		  case 1: fMonth="февраля"; break;
		  case 2: fMonth="марта"; break;
		  case 3: fMonth="апреля"; break;
		  case 4: fMonth="мая"; break;
		  case 5: fMonth="июня"; break;
		  case 6: fMonth="июля"; break;
		  case 7: fMonth="августа"; break;
		  case 8: fMonth="сентября"; break;
		  case 9: fMonth="октября"; break;
		  case 10: fMonth="ноября"; break;
		  case 11: fMonth="декабря"; break;
		}

		firebase.database().ref("user/notes/").update({
			[i]: [editNoteTitle.value, editNoteText.value, [Day, fMonth, Year, Hour, Minutes]]
		});
		getData();
	} else {
		alert("Заполните одно из полей!");
	}
}

function deleteNoteDB(i) {
	console.log(i);
	toggleClass(preloaderSpinner, "dn");
	firebase.database().ref("user/notes/").update({
		[i] : false
	});
	getData();
	amountNotes--;
}



// ----- Получение данных с БД -----
function getData() {
	firebase.database().ref('/').once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			amountNotes = childData['notes'].length;
			function getNotesСontent() {
				if (childData['notes']) {
					let notesСontent = "";
					for (let i = 0; i < amountNotes; i++) {
						if (childData['notes'][i]) {
							notesСontent += `<div class="container__notes__note">
							<div class="container__notes__note__control-icons"><img id="editNoteOnNote${i}" src="img/edit.svg" alt=""><img id="deleteNoteOnNote${i}" src="img/trash.svg" alt=""></div>
							<p class="container__notes__note__title">${childData['notes'][i][0]}</p>
							<p class="container__notes__note__text">${childData['notes'][i][1]}</p>
							<p class="container__notes__note__data">${toTwoSimbolTime(childData['notes'][i][2][3])}:${toTwoSimbolTime(childData['notes'][i][2][4])}, ${childData['notes'][i][2][0]} ${childData['notes'][i][2][1]} ${childData['notes'][i][2][2]}</p></div>`;
							}
						}
						if (notesСontent) {
							return notesСontent;
						} else {
							toggleClass(preloaderSpinner, "dn");
							removeAllData();
						}
					
				} else {
					return '<p id="empyNotesText" class="empy-notes-text">У вас нету заметок, нажмите на кнопку "Добавить заметку"</p>';
				}
			}
			notesContainer.innerHTML = getNotesСontent();
			toggleClass(preloaderSpinner, "dn");


// ----- Кнопки редактирования и удаления заметок к каждой отдельно -----
				if (childData['notes']) {
					for (let i = 0; i < amountNotes; i++) {
						if (childData['notes'][i]) {
							buttonClickEdit[i] = document.getElementById(`editNoteOnNote${i}`);
							buttonClickEdit[i].addEventListener("click", () => {showEditNoteWindow(i, childData['notes'][i][0], childData['notes'][i][1])}, false);
							
							buttonClickRemove[i] = document.getElementById(`deleteNoteOnNote${i}`);
							buttonClickRemove[i].addEventListener("click", () => {deleteNoteDB(i)}, false);
						}
					}
				}
		})
	})
}

getData();