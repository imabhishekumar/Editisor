let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let listButtons = document.querySelectorAll(".list");
const copyButton = document.getElementById("copy");
const copyText = document.querySelector(".output");
const txtSave = document.querySelector("#saveTxt");
const pdfSave = document.querySelector("#savePdf");

// List of fontlist

let fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive"];

// Intial Settings

const initializer = () => {
	// Function calls for highlighting alignButtonsNo highlights for links, unlink, list, undo, redo since they are one time operations

	highlighter(alignButtons, true);
	highlighter(spacingButtons, true);
	highlighter(formatButtons, false);
	highlighter(scriptButtons, true);
	highlighter(listButtons, true);

	// create options for font names
	fontList.map((value) => {
		let option = document.createElement("option");
		option.value = value;
		option.innerHTML = value;
		fontName.appendChild(option);
	});

	// Font size allows only till 7
	for(let i = 1; i <= 7; i++){
		let option = document.createElement("option");
		option.value = i;
		option.innerHTML = i;
		fontSizeRef.appendChild(option);
	}

	// default size 

	fontSizeRef.value = 4;
};

// main logic
const modifyText  = (command, defaultUi, value) => {
	document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameters

optionsButtons.forEach((button) => {
	button.addEventListener("click", () => {
		modifyText(button.id, false, null);
	});
});

// options that require value parameters (e.g color, fonts)
advancedOptionButton.forEach((button) => {
	button.addEventListener("change", () => {
		modifyText(button.id, false, button.value);
	});
});

copyButton.addEventListener("click", () => {
	document.execCommand("selectAll");
	document.execCommand("copy");
	copyText.classList.add("show");
	window.getSelection().removeAllRanges();
	setTimeout(function(){
		copyText.classList.remove("show");
	}, 2500);
});


// links
linkButton.addEventListener("click", () => {
	let userLink = prompt("Enter a URL");
	// iflink has http then pass directly else add https
	if(/https/i.test(userLink)){
		modifyText(linkButton.id, false, userLink);
	} else {
		userLink = "https://" + userLink;
		modifyText(linkButton.id, false, userLink);
	}
});

//Save

saveTxt.addEventListener("click", () => {
	const a = document.createElement('a');
	const blob = new Blob([writingArea.innerHTML]);
	const dataUrl = URL.createObjectURL(blob);
	a.href = dataUrl;
	a.download = "document.txt";
	a.click();
});

savePdf.addEventListener("click", () => {
	html2pdf().from(writingArea).save("document.pdf");
});

// HIghtlight clicked option-button

const highlighter = (className, needsRemoval) => {
	className.forEach((button) => {
		button.addEventListener("click", () => {
			// needsRemoval = true means only one button should be highlight and other would be normal
			if(needsRemoval){
				let alreadyActive = false;
				// If currently clicked button is already active
				if(button.classList.contains("active")){
					alreadyActive = true;
				}

				// Remove higghlight from other buttons
				highlighterRemover(className);

				if(!alreadyActive) {
					button.classList.add("active");
				}
			} else {
				button.classList.toggle("active");
			}
		});
	});
}


const highlighterRemover = (className) => {
	className.forEach((button) => {
		button.classList.remove("active");
	}); 
};


window.onload = initializer();


