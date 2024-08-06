const userHome = Vue.component('userHome',{
    template:`
    <div class="container">
        <h4>Most Popular:</h4>
        <div v-if="this.popular.length !== 0">
            <ul>
                <li v-for="book in this.popular">
                    <h6>{{book.name}}</h6>
                    <p>{{book.section}}</p>
                    <p>By: {{book.author}}</p>
                    <button class="btn btn-primary" @click="rate(book.bookid)">Rate</button><button class="btn btn-success" @click="request(book.bookid)">Request</button>
                </li>
            </ul>
        </div>
        <div v-if="this.popular.length === 0">
            <strong>No rating available yet.</strong>
        </div>
        <h4>New:</h4>
        <div v-if="this.latest.length !== 0">
            <ul>
                <li v-for="book in this.latest">
                    <h6>{{book.name}}</h6>
                    <p>{{book.section}}</p>
                    <p>By: {{book.author}}</p>
                    <button class="btn btn-primary" @click="rate(book.bookid)">Rate</button><button class="btn btn-success" @click="request(book.bookid)">Request</button>
                </li>
            </ul>
        </div>
        <div v-if="this.latest.length === 0">
            <strong>No books available yet.</strong>
        </div>
        <h4>Top Comments:</h4>
        <div v-if="this.comments.length !== 0">
            <ul>
                <li v-for="comment in this.comments">
                    <h6>{{comment.user}}</h6>
                    <p>{{comment.comment}}</p>
                </li>
            </ul>
        </div>
        <div v-if="this.comments.length === 0">
            <strong>No comments yet.</strong>
        </div>
    </div>
    `,
    data(){
        return{
            popular:[],
            latest:[],
            comments:[]
        }
    },
    async mounted(){
        this.getPopular();
        this.getLatest();
        this.getComments();
    },
    methods:{
        rate(bookid){
            if (this.$route.path != '/rate/book/'+bookid){
                this.$router.push('/rate/book/'+bookid);
            }
        },
        request(bookid){
            if (this.$route.path != '/request/book/'+bookid){
                this.$router.push('/request/book/'+bookid);
            }
        },
        async getPopular(){
            const url = window.location.origin;
            const response = await fetch(url+'/popular');
            if (response.ok){
                const data = await response.json();
                console.log('got it popular',data);
                this.popular = data;
            } else {
                console.log('failed.');
            }
        },
        async getLatest(){
            const url = window.location.origin;
            const response = await fetch(url+'/latest');
            if (response.ok){
                const data = await response.json();
                console.log('got it latest',data);
                this.latest = data;
            } else {
                console.log('failed.');
            }
        },
        async getComments(){
            const url = window.location.origin;
            const response = await fetch(url+'/comments');
            if (response.ok){
                const data = await response.json();
                console.log('got it comments',data);
                this.comments = data;
            } else {
                console.log('failed.');
            }
        }
    }
});

export default userHome;