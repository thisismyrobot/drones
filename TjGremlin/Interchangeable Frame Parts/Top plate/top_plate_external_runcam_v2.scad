
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
    camera_stand();
}

module subtractive() {
    holes();
}

module plate() {
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

module camera_stand() {

    translate([-edge_radius, (hole_long / 2) - (mount_width / 2) - mount_pivot_offset, 0]) {

        hull() {
            translate([0, 0, thickness]) {
                cube([
                    hole_wide + (2 * edge_radius),
                    mount_width,
                    mount_raise_height
                ]);
            }

            translate([0, -mount_raise_height * 2, 0]) {
                cube([
                    hole_wide + (2 * edge_radius),
                    mount_width + (mount_raise_height * 4),
                    thickness
                ]);
            }
        }
    }
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

        // Camera mounts
        translate([(hole_wide / 2) - 5.5 - bolt_hole_radius, (hole_long / 2) - mount_pivot_offset, 0]) {
            cylinder(r=1, h=thickness+2+mount_raise_height, $fn=100);
        }

        translate([(hole_wide / 2) + 5.5 + bolt_hole_radius, (hole_long / 2) - mount_pivot_offset, 0]) {
            cylinder(r=1, h=thickness+2+mount_raise_height, $fn=100);
        }

        // Antenna mounts
        translate([(hole_wide / 2) + 2.75, hole_long + 6, 0]) {
            cylinder(r=1.5, h=thickness + 2, $fn=100);
        }

        translate([(hole_wide / 2) - 2.75, hole_long + 6, 0]) {
            cylinder(r=1.5, h=thickness + 2, $fn=100);
        }

        // Camera wire
        translate([(hole_wide / 2) - 3.5, hole_long - 6, 0]) {
            cube([7, 5, thickness + 2]);
        }
    }
}