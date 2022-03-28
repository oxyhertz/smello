<template>
    <header>
        <h1>Drello</h1>
    </header>
    <main class="login-container">
        <h3>Log in to Drello</h3>
        <form @submit.prevent="onLoginSignup">
            <input type="text" v-model="user.username" placeholder="Enter Username" />
            <input
                v-if="!isLogin"
                v-model="user.fullname"
                type="text"
                placeholder="Enter Full Name"
            />
            <input type="password" v-model="user.password" placeholder="Enter password" />
            <button class="login-btn">Log in</button>
        </form>

        <hr />
        <p @click="toggleLoginSignup">{{ loginSignupTxt }}</p>
    </main>
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
            const actionType = this.isLogin ? 'login' : 'signup';
            console.log(actionType);
            await this.$store.dispatch({ type: actionType, cred: this.user });
            this.$router.push('/board');
        },
        toggleLoginSignup() {
            this.isLogin = !this.isLogin;
            this.fullname = '';
            this.username = '';
            this.password = '';
        }
    },
    computed: {
        loginSignupTxt() {
            return this.isLogin ? 'Sign up for an account' : 'Already have an account? Log in';
        }
    }
}
</script>