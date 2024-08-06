const adminHome = Vue.component('adminHome',{
    template:`
    <div class="container">
        <img src="/static/ratings.png"><br>
        Top Comments:
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
            comments:[]
        }
    },
    async mounted(){
        this.getGraph();
    },
    methods:{
        async getGraph(){
            const url = window.location.origin;
            const response = await fetch(url+'/test');
            if (response.ok){
                const data = await response.json();
                this.comments = data;
            } else {
                console.log('failed.');
            }
        }
    }
});

export default adminHome;