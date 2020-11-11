const FoodItem = Vue.component('food-item', {
    data () {
        return {
            inputData: {
                carbs: null,
                protein: null,
                fat: null,
                name: null,
                cost: null,
                gramSize: null
            }
        }
    },
    mounted: {
        if (editData){
            this.inputData = Object.assign({}, editData);
            this.$refs.inputData.focus();
        }
    },
    computed: {
        proteinratio: function() {
            return (this.inputData.carbs && this.inputData.protein && this.inputData.fat) ? Math.round(this.inputData.protein * 400 / (this.inputData.carbs * 4 + this.inputData.protein * 4 + this.inputData.fat * 4)) : 0;
        },
        calories: function() {
            return (this.inputData.carbs * 4 + this.inputData.protein * 4 + this.inputData.fat * 4)
        },
        costOfProtein: function() {
            if (this.inputData.cost && this.inputData.gramSize){
                return ((this.inputData.cost * 10000) / (this.inputData.gramSize * this.inputData.protein));
            } else {
                return 0;
            }
        },
        proteinPerItem: function(){
            if (this.inputData.protein && this.inputData.gramSize){
                return (this.inputData.protein * (this.inputData.gramSize / 100))
            } else {
                return 0;
            }
        },
        caloriesPerItem: function(){
            if (this.inputData.gramSize){
                return ((this.calories * this.inputData.gramSize) / 100); 
            } else {
                return 0;
            }
        }
    },
    props: ['index', 'editData'],
    methods: {
        save() {
            this.$emit('save', {
                name:this.inputData.name, 
                carbs: this.inputData.carbs,
                protein: this.inputData.protein,
                fat: this.inputData.fat,
                proteinratio: this.proteinratio,
                calories: this.calories,
                cost: this.inputData.cost,
                gramSize: this.inputData.gramSize,
                costOfProtein: this.costOfProtein,
                proteinPerItem: this.proteinPerItem,
                caloriesPerItem: this.caloriesPerItem
            });
            this.inputData.name = null,
            this.inputData.carbs = null;
            this.inputData.protein = null;
            this.inputData.fat = null;
            this.inputData.gramSize = null,
            this.inputData.cost = null,
            this.inputData.caloriesPerItem = null
        }
    },
    template: `<div>
    <input type='text' ref='input' v-model='name' placeholder='Food name' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='inputData.carbs' placeholder='Carbs per 100g' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='inputData.protein' placeholder='Protein per 100g' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='inputData.fat' placeholder='Fat per 100g' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='inputData.cost' placeholder='Cost per item' class='mobileBlock' @keydown.enter="save"/>
    <input type='number' v-model='inputData.gramSize' placeholder='Grams per item' class='mobileBlock' @keydown.enter="save"/>
<p class='mobileBlock'>Percent protein: {{ Math.round(proteinratio) }}<br>
Calories per 100g: {{ Math.round(calories) }}<br>
Cost per 100g of protein: {{parseFloat(costOfProtein).toFixed(2)}}</p>
<button @click="save" class='save'><i class="far fa-save"></i> Save Item</button>
    </div>`
});
