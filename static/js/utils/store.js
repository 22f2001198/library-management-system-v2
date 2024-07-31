const store = new Vuex.Store({
    state : {
        User : '',
        Sections : [],
        Section : '',
    },
    getters : {
        setUser : (state) => state.User,
        setSections : (state) => state.Sections,
        setSection : (state) => state.Section,
    },
    mutations : {
        setUser : (state,User) => {
            state.User = User;
        },
        setSections : (state,Sections) => {
            state.Sections = Sections;
        },

        setSection : (state,Section) => {
            state.Section = Section;
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
                console.log('fetched sections');
                commit('setSections',data);
            } else {
                console.log('Failed to get sections.');
            }
        },
    },
});

export default store;