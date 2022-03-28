<template>
    <section class="main-container">
        <header>
            <span class="icon-trello"></span>
            <h1>Drello</h1>
        </header>
        <main class="login-container">
            <h2>Log in to Drello</h2>
            <form @submit.prevent="onLoginSignup">
                <input type="text" v-model="user.username" placeholder="Enter Username" />
                <input
                    v-if="!isLogin"
                    v-model="user.fullname"
                    type="text"
                    placeholder="Enter Full Name"
                />
                <input type="password" v-model="user.password" placeholder="Enter password" />
                <button class="login-btn">{{ loginSignupBtnTxt }}</button>
                <div class="login-option-sep">Or</div>
                <button class="login-with">
                    <span class="google-icon"></span>
                    <span class="btn-txt">Continue with Google</span>
                </button>
            </form>

            <hr />
            <p @click="toggleLoginSignup" class="change-form-link">{{ loginSignupLinkTxt }}</p>
        </main>
    </section>
</template>


<script>
export default {
    name: 'login-signup',
    data() {
        return {
            user: {
                fullname: '',
                username: '',
                password: ''
            },
            isLogin: true
        }
    },
    created() {
        this.isLogin = (this.$route.path === '/login');
    },
    methods: {
        async onLoginSignup() {
            try {
                const actionType = this.isLogin ? 'login' : 'signup';
                await this.$store.dispatch({ type: actionType, cred: this.user });
                this.$router.push('/board');
            } catch (err) {
                console.log(err)
            }
        },
        toggleLoginSignup() {
            this.isLogin = !this.isLogin;
            this.fullname = '';
            this.username = '';
            this.password = '';
        }
    },
    computed: {
        loginSignupBtnTxt() {
            return this.isLogin ? 'Login' : 'Signup';
        },
        loginSignupLinkTxt() {
            return this.isLogin ? 'Sign up for an account' : 'Already have an account? Log in';
        }
    }
}
</script>