const Tracker = Vue.component('tracker', {
    props: ['tracker'],
    computed: {
        trackedCalories() {
            return 0;
        },
        trackedProtein(){
            return 0;
        }
    },
    methods: {
        clearTracker(){
            this.$emit('clear-tracker');
        },
        printData(){
            console.log("Data: ", this.tracker.trackedFood);
        }
    },
    template: `<div class="tracker">
        Note: tracker is not yet functional<br>
        Calories eaten today: {{trackedCalories}}<br>
        Protein eaten today: {{trackedProtein}}<br>
        <tracked-item v-for="(item, name) in tracker.trackedFood" :key="item"></tracked-item>
        <button @click="clearTracker" class='remove'><i class="fas fa-ban"></i> Reset tracker</button>
        <button @click="printData" class='remove'><i class="fas fa-ban"></i> Print Data</button>
</div>`
});
