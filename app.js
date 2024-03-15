(function () {
	/**
	 * Format the phone number
	 *
	 * @param {*} input
	 */
	function handleInput(e) {
		e.target.value = phoneMask(e.target.value);
	}

	/**
	 * Format the phone number
	 *
	 * @param {*} input
	 */
	function phoneMask(phone) {
		return phone
			.replace(/\D/g, "")
			.replace(/^(\d)/, "($1")
			.replace(/^(\(\d{2})(\d)/, "$1) $2")
			.replace(/(\d{1,5})(\d{4})/, "$1-$2")
			.replace(/(-\d{4})\d+?$/, "$1");
	}

	/**
	 * Generate WhatsApp link with number and message
	 *
	 * @param {*} phone
	 * @param {*} message
	 */
	function generateLink(phone = "", message = "") {
		const domInputLinkGenerator = document.querySelector("#inputLinkGenerator");
		if (!domInputLinkGenerator || phone == "" || message == "") {
			console.log("Input not found");
		}

		const domContainerLinkGenerator = document.querySelector("#container-link-generator");
		const domain = "https://wa.me/"; //https://api.whatsapp.com/send?
		const phoneFormated = phone.replace(/\D/g, "");
		const messageFormated = message ? `?text=${encodeURIComponent(message)}` : '';

		domInputLinkGenerator.innerHTML = `${domain}55${phoneFormated}${messageFormated}`;

		domContainerLinkGenerator.classList.add("is-active");

		// Verificar se o elemento está visível na tela
    if (!isElementInViewport(domContainerLinkGenerator)) {
			scrollToElement(domContainerLinkGenerator, 80);
		}

    
	}

	/**
	 * Function to smoothly scroll to the desired element
	 * 
	 * @param {*} element 
	 * @param {*} padding 
	 */
	function scrollToElement(element, padding) {
    window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - padding
    });
	}

	// Função para verificar se o elemento está visível na tela
	function isElementInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
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

		domInputPhone.addEventListener("input", handleInput, false);

		// Shoow message
		domInputMessage.addEventListener("keyup", function (e) {
			domInputLinkWhatsapp.innerHTML = e.target.value;
		});

		// Submit form
		domForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const getPhoneValue = domInputPhone.value;
			const getMessageValue = domInputMessage.value;

			generateLink(getPhoneValue, getMessageValue);
		});

		const domBtnCopyLink = document.getElementById("btn-copy-link");
		domBtnCopyLink.addEventListener("click", () => {
			const contentLink = document.getElementById("inputLinkGenerator");

			const tempElement = document.createElement("textarea");
			tempElement.textContent = contentLink.textContent;

			document.body.appendChild(tempElement);
			tempElement.select();
			document.execCommand("copy");
			document.body.removeChild(tempElement);

			const domModalCopyLink = document.createElement("div");
			domModalCopyLink.innerHTML = `
				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">
						<div class="modal-dialog modal-dialog-centered">
								<div class="modal-content">
										<div class="modal-header border-0">
												<p class="modal-title" id="exampleModalLabel">Link copiado com sucesso!</p>
												<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
								</div>
						</div>
				</div>`;

			document.body.appendChild(domModalCopyLink);

			const modalCopyLink = new bootstrap.Modal(document.getElementById("exampleModal"));
			modalCopyLink.show();
		});
	});
})();
