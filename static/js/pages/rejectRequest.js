const rejectRequest = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Reject Request:</h1>
              <p><strong>Are you sure you want to reject this request?</strong></p>
              <button class="btn btn-danger" @click="reject">Confirm</button>
            </div>
        </div>
    `,
    data(){
        return{
            request:{},
            message:''
        }
    },
    async mounted(){
        this.fetchRequest();
    },
    methods:{
        close(){
            if (this.$route.path != '/admin/requests'){
                this.$router.push('/admin/requests');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async fetchRequest(){
            const url = window.location.origin;
            console.log('fetched request');
            const response = await fetch(url+'/request/'+this.$route.params.requestid,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('fetched request.');
            } else {
                console.log('Failed to fetch request.');
            }
        },
        async reject(){
            const url = window.location.origin;
            console.log('clicked on reject request.');
            const response = await fetch(url+'/request/reject/'+this.$route.params.requestid,{
                method: 'DELETE',
                headers:{
                    'X-CSRF-Token':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json'
                },
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('rejected request.',data);
                if (this.$route.path != '/admin/requests'){
                    this.$router.push('/admin/requests');
                }
            } else {
                console.log('Failed.')
            }
        }
    },
}

export default rejectRequest;