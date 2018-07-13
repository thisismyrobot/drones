
edge_radius = 2.8;
hole_wide = 17.5;
hole_long = 40.4;
thickness = 2;
bolt_hole_radius = 1.5;
mount_width = 7;
mount_pivot_offset = 0;
mount_raise_height = 1.5;

difference() {
    additative();
    subtractive();
}

module additative() {
    plate();
}

module subtractive() {
    holes();
}

module plate() {
    hull() {

        // Main chassis.
        translate([-(20 - hole_wide)-(edge_radius / 2), -edge_radius, 0]) {
            cube([20+(2*2.8), 10, thickness]);
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

        // 20x20 stack
        offsetWide = (hole_wide - 20) / 2;
        offsetLength = (hole_long - 20) / 2;

        translate([offsetWide, offsetLength, 0]) {
            translate([20, 20, 0]) {
                cylinder(r=edge_radius, h=thickness, $fn=100);
            }

            translate([0, 20, 0]) {
                cylinder(r=edge_radius, h=thickness, $fn=100);
            }
        }
    }

    cube([20, 20, thickness]);
}

module holes() {

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
        translate([(hole_wide / 2) - 3.5, (hole_long / 2) - 2.5, 0]) {
            cube([7, 5, thickness + 2]);
        }

        // 20x20 M3.
        offsetWide = (hole_wide - 20) / 2;
        offsetLength = (hole_long - 20) / 2;

        translate([offsetWide, offsetLength, 0]) {

            cylinder(r=1.5, h=thickness + 2, $fn=100);

            translate([20, 0, 0]) {
                cylinder(r=1.5, h=thickness + 2, $fn=100);
            }

            translate([20, 20, 0]) {
                cylinder(r=1.5, h=thickness + 2, $fn=100);
            }

            translate([0, 20, 0]) {
                cylinder(r=1.5, h=thickness + 2, $fn=100);
            }
        }
    }
}