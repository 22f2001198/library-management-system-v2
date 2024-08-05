const revokeBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Revoke Book:</h1>
              <p><strong>Are you sure you want to revoke this book?</strong></p>
              <button class="btn btn-danger" @click="revoke">Confirm</button>
            </div>
        </div>
    `,
    data(){
        return{
            book : {},
            message : ''
        }
    },
    async mounted(){
        this.fetchBook();
    },
    methods:{
        close(){
            if (this.$route.path != '/admin/issued'){
                this.$router.push('/admin/issued');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async fetchBook(){
            const url = window.location.origin;
            const response = await fetch(url+'/book/'+this.$route.params.bookid,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                this.book = data;
                console.log('fetched book',data);
            } else {
                console.log('failed to get book.');
            }
        },
        async revoke(){
            const url = window.location.origin;
            const response = await fetch(url+'/book/revoke/'+this.$route.params.bookid,{
                method:'DELETE',
                headers:{
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('revoked Book',data);
                alert(data.message);
                if (this.$route.path != '/admin/issued'){
                    this.$router.push('/admin/issued');
                }
            } else {
                console.log('Failed to revoke.');
            }
        },
    }
}

export default revokeBook;