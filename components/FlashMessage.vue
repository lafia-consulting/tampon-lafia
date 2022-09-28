<template>
    <div>
        <transition leave-active-class="duration-200">
            <div v-if="isVisible" class="fixed z-50 top-0 inset-x-0 px-4 pt-6 sm:px-0 sm:flex sm:items-center sm:justify-center">
                <div class="fixed inset-0 transform transition-all" @click.prevent="close">
                    <div class="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <transition enter-active-class="ease-out duration-300" enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200" leave-class="opacity-100 translate-y-0 sm:scale-100" leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div v-if="isVisible" class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
                        <!-- Closed button -->
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button @click.prevent="close" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span class="sr-only">Close</span>
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <!-- Content -->
                        <div class="max-h-screen flex items-center justify-center bg-gray-50 overflow-y-auto px-2 py-12">
                            <div class="max-w-md w-full">
                                <div class="flex items-center justify-center">
                                    <div class="animate-bounce flex items-center justify-center w-16 h-16 rounded-full border border-green-400">
                                        <svg class="w-12 h-12 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{{ type }}</h5>
                                    <p class="mb-2 text-lg font-normal text-gray-700 dark:text-gray-400 leading-tight">{{ message }}</p>
                                </div>

                                <div class="flex justify-end mt-6">
                                    <button type="button" @click.prevent="" class="py-2 px-8 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-offset-2">
                                        OK
                                    </button>
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
    name: 'FlashMessage',
    data () {
        return {
            
        }
    },

    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'Succès'
        },
        message: String
    },

    mounted() {
        let timer;

        this.$on('flash-message', (message) => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                this.close();
            }, 3000);
        });

        const closeOnEscape = (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.close();
            }
        };

        document.addEventListener('keydown', closeOnEscape);

        this.$once('hook:destroyed', () => {
            document.removeEventListener('keydown', closeOnEscape);
        })
    },

    methods: {
        close() {
            this.$emit('close-modal')
        },
        /* submit() {
            this.close();
        } */
    },
}
</script>