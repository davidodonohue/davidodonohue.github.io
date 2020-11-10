const TrackedItem = Vue.component('tracked-item', {
    props: ['item', 'index'],
    methods: {
        removeTrackedItem(){
            this.$emit('remove-tracked-item', this.index)
        }
    },
    template: `<div class="trackedItem">
    Name: {{item.name}}<br>
    Amount: {{item.amount}} grams<br>
    <button @click="removeTrackedItem" class="edit"><i class="fas fa-minus-circle"></i> Remove item from tracker</button>
</div>`
});
