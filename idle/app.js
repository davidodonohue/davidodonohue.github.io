const shareBTN = $('#shareButton');
let answer = DUNGEONS.reduce((acc, element) => acc + element.monsters.length, 0);
// initalise tables and load any data from local storage or URL variables
window.onload = () => {
    tableCreate(DUNGEONS.length, $('.dungeon-table th').length, document.querySelector('.dungeon-table'));
    let totalMonsters = DUNGEONS.reduce((acc, element) => acc + element.monsters.length, 0);
    tableCreate(totalMonsters, $('.monster-table th').length, document.querySelector('.monster-table'));
    if (window.location.search.length > 0) {
        let entries = urlInputs();
        updateURLInputs(entries);
    }
    else if (localStorage.length > 0) {
        loadSave();
    }
    doTheThing();
};
// make input fields increment with mouse wheel
$('input[type=number]').on('wheel', function (e) {
    e.preventDefault();
    let step = $(this).attr('step') ? +$(this).attr('step') : 1;
    if (e.originalEvent.deltaY < 0) {
        $(this).val(+$(this).val() + step);
        doTheThing();
    }
    else {
        $(this).val(+$(this).val() - step);
        doTheThing();
    }
});
// initalise Tabs
$(".nav-tabs a").click(function (e) {
    $(this).tab('show');
    $(".show").removeClass("show active");
    if (e.target.id === "tab1") {
        $("#nav-dungeonTable").addClass("show active");
        $("#nav-inputs").addClass("show active");
    }
    if (e.target.id === "tab2") {
        $("#nav-monsterTable").addClass("show active");
        $("#nav-inputs").addClass("show active");
    }
    if (e.target.id === "tab3") {
        $("#nav-tab3").addClass("show active");
    }
});
//attach share function to share button
$('#shareButton').click(() => share());
//initalise pop overs and tooltips
$(function () {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
});
//add timer to popovers to fade after 2 seconds
$('[data-toggle="popover"]').popover().click(function () {
    setTimeout(function () {
        $('[data-toggle="popover"]').popover('hide');
    }, 2000);
});
//initialise dropdown input buttons
$(function () {
    $('.dropdown-item').click(function () {
        let button = $(this).closest('.dropdown').find(".btn");
        button.text($(this).text());
        if ($(this).text() === "Hardcore") {
            button.addClass('btn-hardcore');
        }
        else if ($(this).text() === "Normal" && button.hasClass('btn-hardcore')) {
            button.removeClass('btn-hardcore');
        }
        doTheThing();
    });
});
//initalise input fields
$('.input-field').change(doTheThing);
//initalise search bar
$("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".monster-table tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
function tableCreate(rows, collumns, tbl) {
    let tbody = document.createElement('tbody');
    for (var i = 0; i < rows; i++) {
        var tr = tbody.insertRow();
        for (var j = 0; j < collumns; j++) {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode('Cell'));
        }
    }
    tbl.appendChild(tbody);
}
function urlInputs() {
    // https://drboomtown.github.io/?hp=500&dr=65&ae=2&style=Ranged&mode=Hardcore
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.entries();
}
function share() {
    let copyURL = `https://drboomtown.github.io/?hp=${$('#currHealth').val()}&dr=${$('#currDR').val()}&ae=${$('#autoEatDropDown').text()}&style=${$('#combatStyleDropDown').text()}&mode=${$('#gameModeDropDown').text()}`;
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = copyURL;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
function updateURLInputs(entries) {
    for (let entry of entries) {
        if (entry[0] === 'hp' && +entry[1] >= 100 && +entry[1] <= 1030) {
            document.getElementById('currHealth').value = entry[1];
        }
        if (entry[0] === 'dr' && +entry[1] >= 0 && +entry[1] <= 85) {
            document.getElementById('currDR').value = entry[1];
        }
        if (entry[0] === 'ae' && +entry[1] >= 1 && +entry[1] <= 3) {
            document.getElementById('autoEatDropDown').innerText = entry[1];
        }
        if (entry[0] === 'style' && entry[1] === "Melee" || entry[1] === "Ranged" || entry[1] === "Magic") {
            document.getElementById('combatStyleDropDown').innerText = entry[1];
        }
        if (entry[0] === 'style' && entry[1] === "Normal" || entry[1] === "Hardcore") {
            document.getElementById('gameModeDropDown').innerText = entry[1];
            if (entry[1] === "Hardcore") {
                document.querySelector("#gameModeDropDown").classList.add("btn-hardcore");
            }
        }
    }
}
function localSave() {
    localStorage.setItem('hp', $('#currHealth').val());
    localStorage.setItem('dr', $('#currDR').val());
    localStorage.setItem('autoEat', $('#autoEatDropDown').text());
    localStorage.setItem('combatStyle', $('#combatStyleDropDown').text());
    localStorage.setItem('gameMode', $('#gameModeDropDown').text());
}
function loadSave() {
    if (localStorage.hp) {
        document.getElementById('currHealth').value = localStorage.hp;
    }
    if (localStorage.dr) {
        document.getElementById('currDR').value = localStorage.dr;
    }
    if (localStorage.autoEat) {
        document.getElementById('autoEatDropDown').innerText = localStorage.autoEat;
    }
    if (localStorage.combatStyle) {
        document.getElementById('combatStyleDropDown').innerText = localStorage.combatStyle;
    }
    if (localStorage.gameMode) {
        document.getElementById('gameModeDropDown').innerText = localStorage.gameMode;
        if (localStorage.gameMode === "Hardcore") {
            document.querySelector("#gameModeDropDown").classList.add("btn-hardcore");
        }
    }
}
/*
TODO
X make shit go colourfull if you have enough DR equipt
X input arrows not submit form,
X letter spacing, center collumn text (do i want this?)
X colour striping with green overlay (working but i want to do it better)
X stop shit moving about, fix width of columns
X If multiple monsters have 0 DR, show the one with the highest reduced max hit
X trim whitespace on URLgenerator
X change DR and HP needed columns to always show the highest in the dungeon, base toughest foe column off highest max hit monster
X see if i can improve minDR equation
X Mobiles lay out - table header move while scroll?
 -- table of output info, autoeat threshold + DR%s after combat triangle for all styles (done but need to place it somewhere)
X Save previous settings
X Tabs


Improve style
make code less shit
tabs with other calcs?
*/
//# sourceMappingURL=app.js.map