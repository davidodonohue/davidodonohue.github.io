const FoodItem = Vue.component('food-item', {
    data () {
        return {
            carbs: null,
            protein: null,
            fat: null,
            name: null,
            cost: null,
            gramSize: null
        }
    },
    computed: {
        proteinratio: function() {
            return (this.carbs && this.protein && this.fat) ? Math.round(this.protein * 400 / (this.carbs * 4 + this.protein * 4 + this.fat * 4)) : 0;
        },
        calories: function() {
            return (this.carbs * 4 + this.protein * 4 + this.fat * 4)
        },
        costOfProtein: function() {
            if (this.cost && this.gramSize){
                return ((this.cost * 10000) / (this.gramSize * this.protein));
            } else {
                return 0;
            }
        },
        proteinPerItem: function(){
            if (this.protein && this.gramSize){
                return (this.protein * (this.gramSize / 100))
            } else {
                return 0;
            }
        },
        caloriesPerItem: function(){
            if (this.gramSize){
                return ((this.calories * this.gramSize) / 100); 
            } else {
                return 0;
            }
        }
    },
    props: ['index'],
    methods: {
        save() {
            this.$emit('save', {
                name:this.name, 
                carbs: this.carbs,
                protein: this.protein,
                fat: this.fat,
                proteinratio: this.proteinratio,
                calories: this.calories,
                cost: this.cost,
                gramSize: this.gramSize,
                costOfProtein: this.costOfProtein,
                proteinPerItem: this.proteinPerItem,
                caloriesPerItem: this.caloriesPerItem
            });
            this.name = null,
            this.carbs = null;
            this.protein = null;
            this.fat = null;
            this.gramSize = null,
            this.cost = null,
            this.caloriesPerItem = null
        }
    },
    template: `<div>
    <input type='text' v-model='name' placeholder='Food name' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='carbs' placeholder='Carbs per 100g' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='protein' placeholder='Protein per 100g' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='fat' placeholder='Fat per 100g' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='cost' placeholder='Cost per item' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='gramSize' placeholder='Grams per item' class='mobileBlock' @keydown.enter="save"/>
<p class='mobileBlock'>Percent protein: {{ Math.round(proteinratio) }}<br>
Calories per 100g: {{ Math.round(calories) }}<br>
Cost per 100g of protein: {{parseFloat(costOfProtein).toFixed(2)}}</p>
<button @click="save" class='save'><i class="far fa-save"></i> Save Item</button>
    </div>`
});
