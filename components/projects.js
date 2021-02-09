const Projects = Vue.component('projects', {
    template: `<div>
    <div class="pageTile">
    <h1 class="banner">Projects</h1>
</div>
<div class="pageTile">
    <div class="card">
        <a href="foodsleuth.html" class="styledButton">Food sleuth</a>Measure calories, protein, and cost of protein in the foods you eat.<hr>
        <a href="forge.apk" class="styledButton">Forge workout tracker (unsigned android apk)</a>Plan and track your workouts, and receive recommendations based on a proprietary algorithm.<hr>
        <a href="fly.html" class="styledButton">Fly</a>A flappy-bird/helicopter-inspired game I developed in order to first learn javascript. Press spacebar or tap to fly up, your aim is to go through as many of the hoops as possible.
    </div>
</div>
    </div>`
});
