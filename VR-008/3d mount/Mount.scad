wingThickness = 2;
rxHeight = 6;

// Print rotation
rotate([0, 0, 0]) {
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
        // Wing main
        cube([28.75, 15, wingThickness]);
        
        // Forward offset for antenna hole
        translate([21.75, -10, 0]) {
            cube([7, 10, 2]);
        }
        
        // Antenna hole
        translate([25.25, -10, rxHeight + wingThickness + 1.5]) {
            rotate([0, -90, 0]) {
                leftAntennaLoop();
            }
        }        
    }
}

module rightWing() {
    // Wing main
    cube([20, 25, wingThickness]);
    
    // Antenna hole - 35.25 from centre
    translate([25.25, 0, wingThickness + 1.5]) {
        difference() {
            rightAntennaLoop();
            
            // Cable tie notch
            translate([-12, -2, 2.5]) {
                cube([3, 10, 10]);
            }
        }
    }
}

module leftAntennaLoop() {
    rotate([0, 90, 90]) {
        difference() {
            union() {
                translate([-3.5, 0, 0]) {
                    cube([7, 9.5, 2]);
                }
                cylinder(r=6, h=2, $fn=100);
            }
            translate([0, 0, -1]) {
                cylinder(r=3.5, h=10, $fn=100);
            }
        }
    }
}

module rightAntennaLoop() {
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
