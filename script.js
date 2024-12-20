/*
Michael Kellems
CIT 215
Prof. Kane
11/25/24
*/

/*
    If I had more time on this final project, I would do much more with features like filtering trips being displayed, 
    having more dynamic red "discloure" details for each trip, and even more styling. I am very proud to say, however,
    that I did not use any AI for this and everything is written by me. My only sources have been this class' brightspace
    and my notes, Mozilla Developer Network (MDN), jquery.com, and W3 schools.
*/

//define some global variables
let currentselectedpass = null;
let currentselectedbike = null;
let trips = []


/*I wanted to use a <select> tag with custom styling but realize soon you cannot do that 
without simply making your own select UI so here is my function to make a select UI */
const fakeSelect = (target, options, attribute) => {
    let optionsvalue = options==getPasses() ? `passes` : `biketypes`;
    let texttodisplay = options==getPasses() ? "Select a pass..." : `Select a bike...`;
    let selection = options==getPasses() ? "currentselectedpass" : `currentselectedbike`;

    console.log(target)
    //if the attribute "opened" is true for the custom select, the scrolling select menu pops up
    if (target.attr("opened") == "false"){
        target.attr("opened", "true");
        target.parent().append(`<div id = "${optionsvalue}selectionmenu"></div>`);
        /*I kept running into a reference issue when trying to open both custom selects then realized I needed to 
        specify which select drop down to append, which I did by giving specific ids.*/
        selectionmenu = $(`#${optionsvalue}selectionmenu`);
        //create a button for each item in the parameter called options
        options.forEach(option => {
            selectionmenu.append(`<button class = "optionbutton" storedvalue = "${option[attribute]}" onclick = "${selection} = getvalue($(this), ${optionsvalue}, '${attribute}')">${`${option[attribute]}`}</button>`);
            $(".optionbutton");
        }); 
        return
    }
    //close the custom select if it is open
    else if (target.attr("opened") == "true") {
        target.attr("opened", "false");
        //returns html to original state
        //console.log(options);
        //console.log(passes)
        //console.log(biketypes)
        currentselectedbike = null;
        currentselectedpass = null;
        minutes = null;
        target.parent().html(`<button id = "select" opened = "false" onclick = "fakeSelect($(this), ${optionsvalue}, '${attribute}');">${texttodisplay}</button>`)
    }
};

//completely clears the trips array and the content box
function resetcontent(target){
    buttonclick(target);
    trips = [];
    $("#content").html("");
    return;
}

//this function generates the trip estimates that eventually fill the trips array and visually displays them in the content box with jquery
function generatecontent(target){
    buttonclick(target);
    if(currentselectedpass && currentselectedbike){
        let content = $("#content");
        let timeinput = $("#timeinput input");
        let time = parseInt(timeinput.val());
        console.log(time)
        if (time){
            let usagefee = null;
            let checkoutfee = null;
            let total = null;
            let rate = null;
            content.html("");
            if (currentselectedbike == biketypes[0].name){
                checkoutfee = biketypes[0].checkoutcost;
                rate = biketypes[0].usagerate;
            } else if (currentselectedbike == biketypes[1].name){
                checkoutfee = biketypes[1].checkoutcost;
                rate = biketypes[1].usagerate;
            };

            if (currentselectedpass == passes[0].name){ // indyrides free
                checkoutfee = 0;
                if(time>30){
                    usagefee = (time-30)*rate;
                    total = usagefee;
                } else {
                    usagefee = 0;
                    total = 0;
                };
            } else if (currentselectedpass == passes[1].name){ //annual pass
                checkoutfee = 0;
                if(time>60){
                    usagefee = (time-60)*rate;
                    total = usagefee
                }else {
                    usagefee = 0;
                    total = 0;
                };
            } else if (currentselectedpass = passes[2].name){ //pay as you ride
                usagefee = time * rate;
                total = checkoutfee + usagefee;
            };

            //add new trip estimate to trips array
            trips.push(
                {
                    pass: currentselectedpass,
                    bike: currentselectedbike,
                    triptime: time,
                    checkout: checkoutfee,
                    usage: usagefee,
                    totalcost: total,
                    disclosure: "",
                }
            );

            //display trips in the content box
            trips.forEach(trip => {
                let marginnumber = trip.bike==biketypes[0].name ? `-30px` : `-40px`;
                if (trip.disclosure == ""){
                    trip.disclosure+=`${(trip.bike==biketypes[0].name ? `*${biketypes[0].name} bike base price: checkout fee: $${biketypes[0].checkoutcost} usage rate: $${biketypes[0].usagerate} per minute*` : `*${biketypes[1].name} bike base price: checkout fee: $${biketypes[1].checkoutcost} usage rate: $${biketypes[1].rate} per minute*<br>*Due to system limits, $2.00 of the e-bike checkout fee are initial and the remaining $3.00 are charged with the usage fee*`)}
                    <br>
                    *checkout fees only apply to pay as you ride trips*<br>
                    *IRF - Annual Pass trips charge after 30 minutes while regular annual passes charge after 60 minutes.*
                    `
                };
                content.append(
                    `<div class = "tripdisplay" >
                    <p class = "tripheader">${trip.pass} -- ${trip.bike} Bike -- ${trip.triptime} Minutes</p>
                    <p class = "disclosures">${trip.disclosure}</p>
                    <p class = "tripcharges" style = "margin-top: ${marginnumber}">Checkout Fee: <span>$${trip.checkout}</span> Usage Fee: <span>$${trip.usage}</span> Total Cost: <span>$${trip.totalcost}</span>_</p>
                    </div>`
                );
            });
            console.log(trips);
        } else {
            alert("It appears that you have not enter a trip time, please enter a trip time.");
        };
    } else {
        alert("Double check your pass and bike selection your selections appear to be blank.");
    };
    return;
};

//visual effect for buttons
function contentbuttonreset(target){
    target.parent().css("padding", "0px");
    return;
};

//visual effect for buttons
function buttonclick(target){
   target.parent().css("padding", "5px");
   return;
};

//function returns the "storedvalue" attribute of an option button, also visually does some stuff
function getvalue(target, options, attribute){
    let optionsvalue = options==getPasses() ? `passes` : `biketypes`;
    console.log(currentselectedpass);
    console.log(currentselectedbike);
    console.log(target.parent());
    target.parent().parent().html(`<button id = "select" onclick = "fakeSelect($(this), ${optionsvalue}, '${attribute}');" opened = "false">${target.attr("storedvalue")}</button>`);
    return target.attr("storedvalue");
};

//this function is run when document is ready
function run()
{   
    //the photo sources for the footer
    const ICTlogo = "https://pacersbikeshare.org/wp-content/themes/ict_bikeshare_custom/images/ict-logo.svg";
    const PBSlogo = "https://pacersbikeshare.org/wp-content/themes/ict_bikeshare_custom/images/pacers-bikeshare-logo.svg";
    //variables as shorthand for a few jquery elements
    let bikesharelink = $("#bikesharelink img");
    let ICTlink = $("#ICTlink img");
    let input = $('input');
    
    bikesharelink.attr('src', PBSlogo);
    ICTlink.attr('src', ICTlogo);

    //add jquery styling for when the mouse goes over each of the footer buttons 
    bikesharelink.on("mouseenter", function()
    {
        bikesharelink.css("width", "90px");
        bikesharelink.css("height", "90px");
        bikesharelink.css("margin-top", "2.5px");
        bikesharelink.css("margin-top", "5px");
    });
    bikesharelink.on("mouseleave", function()
    {
        bikesharelink.css("width", "80px");
        bikesharelink.css("height", "80px");
        bikesharelink.css("margin-top", "5px");
        bikesharelink.css("margin-top", "10px");
    });
    ICTlink.on("mouseenter", function()
    {
        ICTlink.css("width", "90px");
        ICTlink.css("height", "90px");
        ICTlink.css("margin-top", "2.5px");
        ICTlink.css("margin-top", "5px");
    });
    ICTlink.on("mouseleave", function()
    {
        ICTlink.css("width", "80px");
        ICTlink.css("height", "80px");
        ICTlink.css("margin-top", "5px");
        ICTlink.css("margin-top", "10px");
    });

    input.on("click", function()
    {
        if (input.attr("value", "How many minutes will you be riding?...")){
            input.attr("value", "");
        } else {
            input.attr("value", "How many minutes will you be riding?...");
        };
    });

    console.log(`Current selected pass: ${currentselectedpass}`);
    return;
}

//when document is ready
$(document).ready(run());
