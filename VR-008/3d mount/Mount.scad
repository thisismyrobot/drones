wingThickness = 2;
rxHeight = 6;

// Print rotation
rotate([90, 0, 0]) {
    difference() {

        // Additive
        union(){

            // Basic block
            body();

            // Front plate
            frontPlate();
            
            // Left wing
            leftWing();

            // Right wing
            rightWing();
        }

        // Subtractive
        union(){
            
            // Hollow out main cube
            hollowCube();
            
            // Antenna holes
            antennaHoles();
            
            // Controller holes
            controllerHoles();
        }
    }   
}

module body() {
   // Outer shape
   cube([20, 35, 10]);
}

module frontPlate() {
    union() {
        translate([-25.25, 0, 2]) {
            cube([70.5, 2, 15.5]);
        }
        rotate([-90, 0, 0]) {
            translate([-25.25, -11.5, 0]) {
                cylinder(r=6, h=2, $fn=100);
            }
            translate([45.25, -11.5, 0]) {
                cylinder(r=6, h=2, $fn=100);
            }
        }
    }
}

module leftWing() {
    translate([-25.25, 0, 10-wingThickness-rxHeight]) {
        // Wing main
        cube([25.25, 25, wingThickness]);   
    }
}

module rightWing() {
    translate([20, 0, 10-wingThickness]) {
        // Wing main
        cube([20, 25, wingThickness]);   
    }
}

module hollowCube() {
    translate([2, 2, 2]){
        cube([16, 35, 10]);
    }
}

module antennaHoles() {
    rotate([-90, 0, 0]) {
        translate([-25.25, -11.5, -1]) {
            cylinder(r=3.5, h=4, $fn=100);
        }
        translate([45.25, -11.5, -1]) {
            cylinder(r=3.5, h=4, $fn=100);
        }
    }
}

module controllerHoles() {
    translate([10, -1, 10]) {
        cube([20, 4, 4]);
    }
}
