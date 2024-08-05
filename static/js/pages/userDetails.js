const userDetails = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <div>
                <h4>User Information</h4>
                <p><strong>Username:</strong> {{this.user.username}}</p>
                <p><strong>Name:</strong> {{this.user.name}}</p>
                <p><strong>Role:</strong> {{this.user.role}}</p>
                <p><strong>Email:</strong> {{this.user.email}}</p>
              </div>
              <div>
              <h4>Ratings</h4>
                <div v-if="ratings.length !== 0">
                    <table class="table table-bordered" border="2px" border-color="black">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Book ID</th>
                            <th>Book</th>
                            <th>Rating</th>
                            <th>Comment</th>
                        </tr>
                        <tr v-for="rating in this.ratings" :key="rating.reviewid">
                            <td>{{rating.reviewid}}</td>
                            <td>{{rating.id}}</td>
                            <td>{{rating.bookid}}</td>
                            <td>{{rating.book}}</td>
                            <td>{{rating.rating}}</td>
                            <td>{{rating.comment}}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="ratings.length === 0">
                    <p><strong>No rating given.</strong></p>
                </div>
              </div>
              <div>
                <h4>Requests</h4>
                <div v-if="requests.length !== 0">
                    <table class="table table-bordered" border="2px" border-color="black">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Book ID</th>
                            <th>Book</th>
                        </tr>
                        <tr v-for="request in this.requests" :key="request.requestid">
                            <td>{{request.requestid}}</td>
                            <td>{{request.id}}</td>
                            <td>{{request.bookid}}</td>
                            <td>{{request.book}}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="requests.length === 0">
                <p><strong>No Requests made.</strong></p>
                </div>
              </div>
              <div>
              <h4>Issued Books</h4>
                <div v-if="issued.length !== 0">
                    <table class="table table-bordered" border="2px" border-color="black">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Book ID</th>
                            <th>Book</th>
                            <th>Issue Date</th>
                        </tr>
                        <tr v-for="issue in this.issued" :key="issue.issueid">
                            <td>{{issue.issueid}}</td>
                            <td>{{issue.id}}</td>
                            <td>{{issue.username}}</td>
                            <td>{{issue.bookid}}</td>
                            <td>{{issue.book}}</td>
                            <td>{{issue.doi}}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="issued.length === 0">
                <p><strong>No Books issued.</strong></p>
                </div>
              </div>
            </div>
        </div>
    `,
    data(){
        return{
            user:{},
            ratings:[],
            requests:[],
            issued:[]
        }
    },
    async mounted(){
        this.fetchUser();
        this.fetchRatings();
        this.fetchRequests();
        this.fetchIssued();
    },
    methods:{
        close(){
            if (this.$route.path != '/admin/users'){
                this.$router.push('/admin/users');
            }
        },
        async fetchUser(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/'+this.$route.params.id,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched user');
                this.user = data;
            } else {
                console.log('failed to fetch user.')
            }
        },
        async fetchRatings(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/ratings/'+this.$route.params.id,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched ratings');
                this.ratings = data;
            } else {
                console.log('failed to fetch ratings.')
            }
        },
        async fetchRequests(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/requests/'+this.$route.params.id,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched requests');
                this.requests = data;
            } else {
                console.log('failed to fetch requests.')
            }
        },
        async fetchIssued(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/issued/'+this.$route.params.id,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched issued');
                this.issued = data;
            } else {
                console.log('failed to fetch issued.')
            }
        },
    },
}

export default userDetails;