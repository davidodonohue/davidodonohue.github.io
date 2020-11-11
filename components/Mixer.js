const mix = Vue.component('mix', {
    props: ['mix'],
    computed: {
        trackedCalories() {
            return 0;
        },
        trackedProtein(){
            return 0;
        }
    },
    methods: {
        clearmix(){
            this.$emit('clear-mix');
        },
        printData(){
            console.log("Data: ", this.mix.trackedFood);
        }
    },
    template: `<div class="mix">
        Note: mix is not yet functional<br>
        Calories eaten today: {{trackedCalories}}<br>
        Protein eaten today: {{trackedProtein}}<br>
        <tracked-item v-for="(item, name) in mix.trackedFood" :key="item"></tracked-item>
        <button @click="clearmix" class='remove'><i class="fas fa-ban"></i> Reset mix</button>
        <button @click="printData" class='remove'><i class="fas fa-ban"></i> Print Data</button>
</div>`
});
