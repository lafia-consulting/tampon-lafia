<template>
  <div class="bg-gray-900 font-baloo">

    <div class="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-12">
      <div class="lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span class="block text-gray-100">Générer votre tampon digital gratuitement</span>
        </h2>
      </div>
    </div>

    <div class="bg-white py-12 min-h-screen">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
			<div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">

			<div class="shadow overflow-hidden sm:rounded-md">
				<div class="px-4 py-3 bg-gray-50 text-left sm:px-6">
					<p class="text-lg leading-6 font-medium text-gray-900">1. Vos informations</p>
				</div>

				<div class="px-4 py-5 bg-white sm:p-6">
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-6">
							<label for="company_name" class="block text-md font-medium text-gray-800">Nom de l'entreprise</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" name="company_name" v-model="company_name" id="company_name" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md" placeholder="" />
							</div>
						</div>

						<div class="col-span-6 sm:col-span-6">
							<label for="commercial_name" class="block text-md font-medium text-gray-800">Nom commercial</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" name="commercial_name" v-model="commercial_name" id="commercial_name" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md" placeholder="" />
							</div>
						</div>

						<div class="col-span-6 sm:col-span-6">
							<label for="siret" class="block text-md font-medium text-gray-800">Siret</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" name="siret" v-model.number="siret" id="siret" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md" placeholder="" />
							</div>
						</div>

						<div class="col-span-6 sm:col-span-6">
							<label for="address" class="block text-md font-medium text-gray-800">Adresse complète</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" name="address" v-model="address" id="address" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md" placeholder="" />
							</div>
						</div>

						<div class="col-span-6 sm:col-span-6">
							<label for="phone_number" class="block text-md font-medium text-gray-800">Numéro de téléphone</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<input type="text" name="city" v-model="phone_number" id="phone_number" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md" placeholder="" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="shadow overflow-hidden sm:rounded-md">
				<div class="px-4 py-3 bg-gray-50 text-left sm:px-6">
					<p class="text-lg leading-6 font-medium text-gray-900">2. Votre tampon digital</p>
				</div>

				<div class="px-2 py-5 sm:py-24">
					<div class="px-8 py-4 max-w-md mx-auto text-center rounded-lg border sm:p-8 dark:bg-gray-800 dark:border-gray-700">
						<div id="tampon">
							<h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{{ company_name ? company_name : 'Laravel Company' }}</h5>

							<p class="text-base text-gray-600 font-medium sm:text-xl dark:text-gray-400 mb-1">Siret : {{ siret }}</p>
							<p class="text-base text-gray-600 font-medium sm:text-lg dark:text-gray-400 leading-3">Adresse : {{ address }}</p>
							<a class="text-base text-gray-600 font-medium sm:text-lg dark:text-gray-400" href="07 00 00 00 00">Téléphone : {{ phone_number }}</a>
						</div>
					</div>
				</div>

				<div class="sm:flex w-full px-8 py-4">
					<button @click="showModal" class="w-full bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" :class="!allowedDownloaded ? 'cursor-not-allowed' : 'cursor-pointer'" :disabled="!allowedDownloaded">
						<svg class="mr-3 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<div class="text-left">
							<div class="mb-1 text-xs">Récupérer mon</div>
							<div class="-mt-1 font-sans text-sm font-semibold">tampon</div>
						</div>
					</button>
				</div>
			</div>
        </div>

		<!-- <button @click="openFlash = !openFlash" class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
			Flash message
		</button> -->
      </div>
    </div>

	<Confirm :isVisible="modalIsVisible" @close-modal="hideModal" @save-tampon="download"/>
	<FlashMessage :isVisible="openFlash" @close-modal="hideFlashMsg" message="Votre tampon vous a été envoyé par mail avec succès" />

    <footer class="w-full bg-gray-50 max-w-container mx-auto py-10 text-center flex items-center justify-center text-sm text-gray-500">
		<p>© 2022 Lafia Consulting. Tous droits réservés.</p>
		<p class="ml-3 border-l border-gray-500 pl-3">
			<span class="hover:text-teal-600">By Abdoul Rahim</span>
		</p>
	</footer>
  </div>
</template>

<script>
import dti from 'dom-to-image';
import Confirm from '~/components/Confirm.vue';
import FlashMessage from '~/components/FlashMessage.vue';

export default {
	components: {
		Confirm,
		FlashMessage
	},
	head() {
		return {
		title: 'Tampon digital'
		}
	},

	data() {
		return {
			company_name: '',
			commercial_name: '',
			siret: '',
			address: '',
			phone_number: '',
			modalIsVisible: false,
			openFlash: false
		}
	},

	watch: {
		allowedDownloaded: function (newValue, oldValue) {
			console.warn(newValue, oldValue);
		}
	},
  
	mounted() {
		console.log('BASE_URL=', process.env.BASE_URL);
	},

	computed: {
		allowedDownloaded: function () {
			return this.company_name !== '' && this.siret !== '' && this.address !== '' && this.phone_number !== '';
		}
	},

	methods: {
		async download({ firstname, lastname, email }) {
			let blob = await dti.toBlob(document.getElementById('tampon'))

			let formData = new FormData();
			formData.append('firstname', firstname);
			formData.append('lastname', lastname);
			formData.append('email', email);
			formData.append('blob', blob);

			this.$axios.post('/api/mail', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(_ => {
				console.warn('success')
				this.openFlash = !this.openFlash
				this.$emit('flash-message', { message: 'Votre tampon vous a été envoyé par mail avec succèss' })
			});

			this.resetFields();
		},
		showModal() {
			this.modalIsVisible = !this.modalIsVisible;
		},
		hideModal() {
			this.modalIsVisible = !this.modalIsVisible;
		},
		hideFlashMsg() {
			this.openFlash = !this.openFlash;
		},
		resetFields() {
			this.company_name = '',
			this.commercial_name = '',
			this.siret = '',
			this.address = '',
			this.phone_number = ''
		}
	}
}
</script>
