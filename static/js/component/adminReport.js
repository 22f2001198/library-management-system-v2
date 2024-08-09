const adminReport = Vue.component('adminReport',{
    template:`
    <div class="container">
        <h1>Get Report:</h1>
        <div class="text-center">
            <button class="btn btn-primary" @click="view">Write</button>
            <button class="btn btn-success" @click="download">Download</button>
        </div>
        <div v-if="this.visiblity">
            <table class="table table-bordered" border="2px" border-color="black">
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Book ID</th>
                    <th>Book</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                </tr>
                <tr v-for="issue in this.content" :key="issue.issueid">
                    <td>{{issue.issueid}}</td>
                    <td>{{issue.id}}</td>
                    <td>{{issue.username}}</td>
                    <td>{{issue.bookid}}</td>
                    <td>{{issue.book}}</td>
                    <td>{{issue.doi}}</td>
                    <td>{{issue.dor}}</td>
                </tr>
            </table>
        </div>
    </div>
    `,
    data(){
        return{
            visibility:false,
            header:[],
            content:[]
        }
    },
    methods:{
        view(){
            const url = window.location.origin;
            fetch(url+'/report')
            .then(response => response.json())
            .then(data => {
                this.header = data.header,
                this.content = data.content
                this.visibility = true;
            })
            .catch(error => console.error('Error fetching CSV file:',error));
        },
        download(){
            const url = window.location.origin;
            fetch(url+'/report/download')
            .then(response => response.text())
            .then(content => {
                const blob = new Blob([content],{type:'text/csv'});
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'report.csv';
                link.click();
            })
            .catch(error => console.error('Error fetching CSV file:',error));
        }
    }
});

export default adminReport;