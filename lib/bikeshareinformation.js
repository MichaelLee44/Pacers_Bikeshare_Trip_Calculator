const passes = [
    IRF = {
        name: "IndyRides Free - Annual Pass",
        primarycheckoutfee: 0.00,
        timeoffset: 30
    },
    Annual = {
        name: "Annual Pass",
        checkoutfee: 0.00,
        timeoffset: 60
    },
    PaYR = {
        name: "Pay as You Ride",
        primarycheckoutfee: 2.00,
        timeoffset: 0,
    }
]

const biketypes = 
[
    mechanical = {
        name: "Mechanical",
        usagerate: .20,
        checkoutcost: 2.00
    },
    electric = {
        name: "Electric",
        usagerate: .25,
        checkoutcost: 5.00
    }
];

function getPasses(){
    return passes
}

function getBikeTypes(){
    return biketypes
}