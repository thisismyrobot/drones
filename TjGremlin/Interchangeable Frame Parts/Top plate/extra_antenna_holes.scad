// Settings.
edge_radius = 2.8;
hole_wide = 17.5;
hole_long = 40.4;
thickness = 2;
bolt_hole_radius = 1.5;

// Derived.
frame_width = (edge_radius*2) + hole_wide;

// Make it!
plate();

module plate() {
    difference() {
        plateAdd();
        plateRemove();
    }
}

module plateAdd() {

    hull() {

        cylinder(r=edge_radius, h=thickness, $fn=100);

        translate([hole_wide, 0, 0]) {
            cylinder(r=edge_radius, h=thickness, $fn=100);
        }

        translate([hole_wide, hole_long, 0]) {
            cylinder(r=edge_radius, h=thickness, $fn=100);
        }

        translate([0, hole_long, 0]) {
            cylinder(r=edge_radius, h=thickness, $fn=100);
        }

        translate([hole_wide / 2, hole_long + 3, 0]) {
            cylinder(r=edge_radius * 2.5, h=thickness, $fn=100);
        }
    }
}

module plateRemove() {

    translate([0, 0, -1]) {

        // Main mounts
        cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);

        translate([hole_wide, 0, 0]) {
            cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);
        }

        translate([hole_wide, hole_long, 0]) {
            cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);
        }

        translate([0, hole_long, 0]) {
            cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);
        }

        // Antenna mounts
        translate([(hole_wide / 2) + 2.75, hole_long + 6, 0]) {
            cylinder(r=1.5, h=thickness + 2, $fn=100);
        }

        translate([(hole_wide / 2) - 2.75, hole_long + 6, 0]) {
            cylinder(r=1.5, h=thickness + 2, $fn=100);
        }

        // Camera wire
        translate([(hole_wide / 2) - 3.5, (hole_long / 2)-7.5, 0]) {
            cube([7, 5, thickness + 2]);
        }
    }
}
