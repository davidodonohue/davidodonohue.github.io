const NavBar = Vue.component('nav-bar', {
    data () {
        return {
            pages: [
                {name: "Home", url: "index.html#"},
                {name: "Articles", url: "index.html#/articles"},
                {name: "Book Reviews", url: "index.html#/book-reviews"},
                {name: "Projects", url: "index.html#/projects"},
                {name: "Quotes", url: "index.html#/quotes"},
                {name: "YouTube", url: "https://www.youtube.com/channel/UCalf_ITbJtXeo3mWtMMVRkQ"},
                {name: "Social", url: "index.html#/social"},
            ]
        }
    },

    template: `<div class="navbar">
    <a :href="page.url" v-for="page in pages">{{page.name}}</a>
</div>`
});
