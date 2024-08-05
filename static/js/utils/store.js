const store = new Vuex.Store({
    state : {
        User : '',
        Sections : [],
        Books : [],
        Ratings : [],
        Requests : []
    },
    getters : {
        setUser : (state) => state.User,
        setSections : (state) => state.Sections,
        setBooks : (state) => state.Books,
        setRatings : (state) => state.Ratings,
        setRequests : (state) => state.Requests,
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
        setRatings : (state,Ratings) => {
            state.Ratings = Ratings;
        },
        setRequests : (state,Requests) => {
            state.Requests = Requests;
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
        },
        async fetchRatings({commit}){
            const url = window.location.origin;
            const response = await fetch(url+'/books/ratings');
            if (response.ok){
                const data = await response.json();
                console.log('fetched ratings',data);
                commit('setRatings',data);
            } else {
                const data = await response.json();
                console.log('Failed to get ratings.');
                alert(data.message);
            }
        },
        async fetchRequests({commit}){
            const url = window.location.origin;
            const response = await fetch(url+'/requests');
            if (response.ok){
                const data = await response.json();
                console.log('fetched requests',data);
                commit('setRequests',data);
            } else {
                const data = await response.json();
                console.log('Failed to get requests.');
                alert(data.message);
            }
        },
    },
});

export default store;