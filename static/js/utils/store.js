const store = new Vuex.Store({
    state : {
        User : '',
    },
    getters : {
        setUser : (state) => state.User,
    },
    mutations : {
        setUser : (state,User) => {
            state.User = User;
        },
        updateUser : (state,User) => {
            state.User = User;
        }
    },
    actions : {
        async fetchUser({commit}) {
            const url =window.location.origin;
            const response = await fetch(url+'/profile');
            if (response.ok) {
                const data = await response.json();
                console.log(data,'fetched Profile');
                commit('setUser',data);
            } else {
                console.log('Failed to get Profile.')
            }
        }
    },
});

export default store;