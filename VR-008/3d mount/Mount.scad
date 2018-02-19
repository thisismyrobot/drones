wingThickness = 2;
wingLength = 22.5;
rxHeight = 6;

// Basic block
translate([0, 0, -10]){
    difference(){
        // Outer shape
        cube([20, 30, 10]);
        
        // Main cut-outs
        translate([2, 2, 2]){
            cube([16, 12, 10]);
        }
        translate([2, 16, 2]){
            cube([16, 12, 10]);
        }
        translate([2, -5, 8]){
            cube([16, 40, 10]);
        }
        
        // Bolt holes
        translate([10, 7, 0]){
            cylinder(r=1.5, h=10, center=true, $fn=100);
        }
        translate([10, 23, 0]){
            cylinder(r=1.5, h=10, center=true, $fn=100);
        }
    }
}

// Left wing
translate([-wingLength, 10, -(rxHeight + wingThickness)]){  
    cube([wingLength, 10, wingThickness]);
}
translate([-wingLength, 10, -(rxHeight + wingThickness) - 1]){
    cube([wingThickness, 10, 1]);
}
translate([-wingLength + (wingThickness + 3), 10, -(rxHeight + wingThickness) - 1]){
    cube([wingThickness, 10, 1]);
}

// Right wing
translate([20, 10, -wingThickness]){  
    cube([wingLength, 10, wingThickness]);
}
translate([(20 + wingLength) - (wingThickness * 2) - 3, 10, -3]){
    cube([wingThickness, 10, 1]);
}
translate([(20 + wingLength) - wingThickness, 10, -3]){
    cube([wingThickness, 10, 1]);
}
