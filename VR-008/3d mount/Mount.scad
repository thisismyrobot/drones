wingThickness = 2;
rxHeight = 6;

// Basic block
translate([0, 0, -10]){
    difference(){
        cube([20, 25, 10]);
        translate([2, -5, 2]){
            cube([16, 35, 6]);
        }
    }
}

// Left wing
translate([-25, 7.5, -(rxHeight + wingThickness)]){  
    cube([25, 10, wingThickness]);
}

// Right wing
translate([20, 7.5, -wingThickness]){  
    cube([25, 10, wingThickness]);
}
