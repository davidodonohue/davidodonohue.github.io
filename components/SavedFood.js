const SavedFood = Vue.component('saved-food', {
    props: ['data', 'index', 'hr'],
    methods: {
        remove() {
            this.$emit('remove', this.index);
        }
    },
    computed: {

    },
    template: `<div>
<p style="flex-grow:2">{{ data.name }}</br>
{{ Math.round(data.proteinratio) + '%'}} of calories from protein</br>
{{this.data.protein}} grams of protein per 100g</br>
{{'$' + parseFloat(this.data.costOfProtein).toFixed(2)}} per 100g of protein</br>
{{ Math.round(data.calories) }} calories per 100g</br>
{{parseFloat(this.data.proteinPerItem).toFixed(2)}} grams of protein per item</br>
{{Math.round(this.data.caloriesPerItem)}} calories per item</br>
<button @click="remove" class='remove'><i class="fas fa-ban"></i> Remove</button>
<hr v-if="hr" style="width: 100%;">
    </div>`
});
