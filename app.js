(function () {
	function phoneFormater(input) {
		let numeroTelefone = input.value.replace(/\D/g, "");

		if (numeroTelefone.length === 11) {
			input.value = `(${numeroTelefone.substring(
				0,
				2
			)}) ${numeroTelefone.charAt(2)} ${numeroTelefone.substring(
				3,
				7
			)}-${numeroTelefone.substring(7)}`;
		} else {
			input.value = `(${numeroTelefone.substring(
				0,
				2
			)}) ${numeroTelefone.charAt(2)} ${numeroTelefone.substring(
				3,
				7
			)}-${numeroTelefone.substring(7, 11)}`;
		}
	}

	function generateLink(phone = '', message = '') {
		const domInputLinkGenerator = document.querySelector("#inputLinkGenerator");
		if( !domInputLinkGenerator || phone == '' || message == '') {
			console.log("Input not found")
		}

		const domain = 'https://wa.me/'; // https://api.whatsapp.com/send?
		const phoneFormated =  phone.replace(/\D/g, '');
		const messageFormated = `?text=${encodeURIComponent(message)}`;
		
		domInputLinkGenerator.value = `${domain}${phoneFormated}${messageFormated}`;
	}

	document.addEventListener("DOMContentLoaded", function () {
		const domForm = document.getElementById("formPhoneMesssage");
		if (!domForm) {
			console.log("Form not found");
		}

		const domInputPhone = domForm.querySelector("#inputPhone");
		const domInputMessage = domForm.querySelector("#inputMessage");
		const domInputLinkWhatsapp = document.querySelector("#inputLinkWhatsapp");

		console.log(domInputLinkWhatsapp)

		if (!domInputPhone || !domInputMessage) {
			console.log("Form not found");
		}

		domInputPhone.addEventListener("input", function () {
			phoneFormater(this);
		});

		domInputMessage.addEventListener( "keyup", function (e) {
			domInputLinkWhatsapp.value = e.target.value
		});

		domForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const getPhoneValue = domInputPhone.value;
			const getMessageValue = domInputMessage.value;

			generateLink( getPhoneValue, getMessageValue );
		});
	});
})();
