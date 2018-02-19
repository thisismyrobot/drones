wingThickness = 2;
wingLength = 22.5;
rxHeight = 6;

// Basic block
translate([0, 0, -10]){
    difference(){
        // Outer shape
        cube([20, 25, 10]);
        
        // Main cut-outs
        translate([2, 2, 2]){
            cube([16, 9.5, 10]);
        }
        translate([2, 13.5, 2]){
            cube([16, 9.5, 10]);
        }
        translate([2, -5, 8]){
            cube([16, 35, 10]);
        }
        
        // Bolt holes
        translate([10, 7, 0]){
            cylinder(r=1.5, h=10, center=true, $fn=100);
        }
        translate([10, 18, 0]){
            cylinder(r=1.5, h=10, center=true, $fn=100);
        }
    }
}

// Left wing
translate([-wingLength, 7.5, -(rxHeight + wingThickness)]){  
    cube([wingLength, 10, wingThickness]);
}
translate([-wingLength, 7.5, -(rxHeight + wingThickness) - 1]){
    cube([wingThickness, 10, 1]);
}
translate([-wingLength + (wingThickness + 3), 7.5, -(rxHeight + wingThickness) - 1]){
    cube([wingThickness, 10, 1]);
}

// Right wing
translate([20, 7.5, -wingThickness]){  
    cube([wingLength, 10, wingThickness]);
}
translate([(20 + wingLength) - (wingThickness * 2) - 3, 7.5, -3]){
    cube([wingThickness, 10, 1]);
}
translate([(20 + wingLength) - wingThickness, 7.5, -3]){
    cube([wingThickness, 10, 1]);
}
