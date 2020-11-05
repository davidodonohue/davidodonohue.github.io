const PatchNote = Vue.component('patch-note', {
    props: ['data'],
    template: `<div>
    <h3>{{data.date}}</h3>
    <ul>
        <li v-for="item in data.content">{{item}}</li>
    </ul>
    </div>`
});
