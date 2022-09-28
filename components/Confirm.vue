<template>
    <div>
        <transition leave-active-class="duration-200">
            <div v-if="isVisible" class="fixed z-50 top-0 inset-x-0 px-4 pt-6 sm:px-0 sm:flex sm:items-center sm:justify-center">
                <div class="fixed inset-0 transform transition-all" @click.prevent="close">
                    <div class="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <transition enter-active-class="ease-out duration-300" enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200" leave-class="opacity-100 translate-y-0 sm:scale-100" leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div v-if="isVisible" class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-2xl">
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button @click.prevent="close" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span class="sr-only">Close</span>
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <!-- Content -->
                        <div class="">
                            <div class="max-h-screen flex items-center justify-center bg-gray-50 overflow-y-auto px-2 py-12">
                                <div class="max-w-lg w-full">
                                    <div>
                                        <p class="text-xl text-blue-900 text-center font-courgette">Renseignez vos informations pour recevoir votre tampon digital</p>
                                    </div>
                                    <form class="mt-4 space-y-6" @submit.prevent="submit">
                                        <div class="grid grid-cols-6 gap-6">
                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="firstname" class="block text-sm font-medium text-gray-700">Prénom</label>
                                                <div class="mt-1">
                                                    <input id="firstname" name="firstname" type="text" v-model="form.firstname" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                </div>
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="lastname" class="block text-sm font-medium text-gray-700">Nom</label>
                                                <div class="mt-1">
                                                    <input id="lastname" name="lastname" type="text" v-model="form.lastname" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                </div>
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
                                                <div class="mt-1">
                                                    <input id="email" name="email" type="email" v-model="form.email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p class="text-xs font-bold text-gray-600">En cliquant sur le boutton "Recevoir mon tampon", vous acceptez que vos informations soient traitées à des fins de prospection par Lafia Consulting.</p>
                                        </div>

                                        <div class="flex space-x-6">
                                            <button type="button" @click.prevent="close" class="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-offset-2">
                                               Annuler
                                            </button>
                                            <button type="submit" class="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                               Recevoir mon tampon
                                            </button>
                                        </div>
                                    </form>
                                </div>
                             </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Confirm',
    data () {
        return {
            form: {
                firstname: '',
                lastname: '',
                email: '',
            }
        }
    },

    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        const closeOnEscape = (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.close()
            }
        };

        document.addEventListener('keydown', closeOnEscape);

        this.$once('hook:destroyed', () => {
            document.removeEventListener('keydown', closeOnEscape)
        })
    },

    methods: {
        close() {
            this.$emit('close-modal')
        },
        submit() {
            this.$emit('save-tampon', this.form);
            this.resetForm();
            this.close();
        },
        resetForm() {
            this.form.firstname = '';
            this.form.lastname = '';
            this.form.email = '';
        }
    },
}
</script>