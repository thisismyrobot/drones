wingThickness = 2;
rxHeight = 6;

// Basic block
body();

// Left wing
translate([0, 0, 10 - wingThickness - rxHeight]){
    mirror([1, 0, 0]){
        leftWing();
    }
}

// Right wing
translate([20, 0, 10 - wingThickness]){
    rightWing();
}


module body() {
    difference(){
        // Outer shape
        cube([20, 35, 10]);
        
        // Main cut-out
        translate([2, 2, 2]){
            cube([16, 35, 10]);
        }
        
        // Bolt holes
        translate([10, 7, 0]){
            cylinder(r=1.5, h=10, center=true, $fn=100);
        }
        translate([10, 28, 0]){
            cylinder(r=1.5, h=10, center=true, $fn=100);
        }
    }
    
    // Front tab
    translate([0, 0, 10]){
        cube([10, 2, 3]);
    }
}

module leftWing() {
    translate([0, 10, 0]){
        cube([32, 15, wingThickness]);
    }    
}

module rightWing() {
    // Wing main
    cube([20, 25, wingThickness]);
    
    // Antenna hole - 35.25 from centre
    translate([25.25, 0, wingThickness + 1.5]) {
        difference() {
            antennaLoop();
            
            // Cable tie notch
            translate([-12, -2, 2.5]) {
                cube([3, 10, 10]);
            }
        }
    }
}

module antennaLoop() {
    rotate([0, 90, 90]) {
        difference() {
            union() {
                translate([-3.5, 0, 0]) {
                    cube([7, 15.25, 2]);
                }
                cylinder(r=6, h=2, $fn=100);
            }
            translate([0, 0, -1]) {
                cylinder(r=3.5, h=10, $fn=100);
            }
        }
    }
}
