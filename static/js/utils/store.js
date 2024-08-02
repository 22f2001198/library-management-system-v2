const store = new Vuex.Store({
    state : {
        User : '',
        Sections : [],
        Books : [],
    },
    getters : {
        setUser : (state) => state.User,
        setSections : (state) => state.Sections,
        setBooks : (state) => state.Books,
    },
    mutations : {
        setUser : (state,User) => {
            state.User = User;
        },
        setSections : (state,Sections) => {
            state.Sections = Sections;
        },
        setBooks : (state,Books) => {
            state.Books = Books;
        },
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
        },
        async fetchSections({commit}){
            const url = window.location.origin;
            const response = await fetch(url+'/section');
            if (response.ok){
                const data = await response.json();
                console.log('fetched sections',data);
                commit('setSections',data);
            } else {
                const data = await response.json();
                console.log('Failed to get sections.');
                alert(data.message);
            }
        },
        async fetchBooks({commit}){
            const url = window.location.origin;
            const response = await fetch(url+'/books');
            if (response.ok){
                const data = await response.json();
                console.log('fetched books',data);
                commit('setBooks',data);
            } else {
                const data = await response.json();
                console.log('Failed to get books.');
                alert(data.message);
            }
        }
    },
});

export default store;