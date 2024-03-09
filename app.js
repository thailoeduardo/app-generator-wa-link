(function () {
	/**
	 * Format the phone number
	 * 
	 * @param {*} input 
	 */
	function phoneFormater(input) {
		let numeroTelefone = input.value.replace(/\D/g, "");

		if (numeroTelefone.length === 11) {
			input.value = `(${numeroTelefone.substring(0,2)}) 
			${numeroTelefone.charAt(2)} ${numeroTelefone.substring(3,7)}-${numeroTelefone.substring(7)}`;
		} else {
			input.value = `(${numeroTelefone.substring(0,2)}) ${numeroTelefone.charAt(2)} ${numeroTelefone.substring(3,7)}-${numeroTelefone.substring(7, 11)}`;
		}
	}

	/**
	 * Generate WhatsApp link with number and message
	 * 
	 * @param {*} phone 
	 * @param {*} message 
	 */
	function generateLink(phone = '', message = '') {
		const domInputLinkGenerator = document.querySelector("#inputLinkGenerator");
		if( !domInputLinkGenerator || phone == '' || message == '') {
			console.log("Input not found")
		}

		const domContainerLinkGenerator = document.querySelector("#container-link-generator");
		const domain = 'https://wa.me/'; //https://api.whatsapp.com/send?
		const phoneFormated =  phone.replace(/\D/g, '');
		const messageFormated = `?text=${encodeURIComponent(message)}`;
		
		domInputLinkGenerator.innerHTML = `${domain}${phoneFormated}${messageFormated}`;

		domContainerLinkGenerator.classList.add( 'is-active' );
	}

	/**
	 * Copy created WhatsApp link
	 * 
	 */
	function copylinkWhatsapp() {

	}

	document.addEventListener("DOMContentLoaded", function () {
		const domForm = document.getElementById("formPhoneMesssage");
		if (!domForm) {
			console.log("Form not found");
		}

		const domInputPhone = domForm.querySelector("#inputPhone");
		const domInputMessage = domForm.querySelector("#inputMessage");
		const domInputLinkWhatsapp = document.querySelector("#inputLinkWhatsapp");

		if (!domInputPhone || !domInputMessage) {
			console.log("Form not found");
		}

		domInputPhone.addEventListener("input", function () {
			phoneFormater(this);
		});

		// Shoow message
		domInputMessage.addEventListener( "keyup", function (e) {
			domInputLinkWhatsapp.innerHTML = e.target.value
		});

		// Submit form
		domForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const getPhoneValue = domInputPhone.value;
			const getMessageValue = domInputMessage.value;

			generateLink( getPhoneValue, getMessageValue );
		});


		const domBtnCopyLink = document.getElementById('btn-copy-link');
		domBtnCopyLink.addEventListener('click', () => {
			const contentLink = document.getElementById('inputLinkGenerator');

			const tempElement = document.createElement('textarea');
			tempElement.textContent = contentLink.textContent;
		
			document.body.appendChild(tempElement);
		
			tempElement.select();
		
			document.execCommand('copy');
	
			document.body.removeChild(tempElement);
		
			alert('Texto copiado!');
		}, false )
	});
})();
