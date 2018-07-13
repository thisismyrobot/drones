
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
    snails();
}

module subtractive() {
    holes();
}

module plate() {
    hull() {

        // Main chassis.
        translate([-edge_radius, -edge_radius, 0]) {
            cube([hole_wide+(2*2.8), 10, thickness]);
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

module snails() {

    difference() {
        snail_additative();
        snail_subtractive();
    }

}

module snail_additative() {

    snail_width = hole_wide + (edge_radius * 2);

    translate([-edge_radius, -edge_radius, 0]) {

        translate([0, -14, 12]) {
            rotate([180, 90, 0]) {
                mirror([0, 0, 1]) {
                    arcPrism(12, snail_width);
                }
            }
        }

        translate([0, -12, 12]) {
            rotate([90, 0, 270]) {
                mirror([0, 0, 1]) {
                    arcPrism(14, snail_width);
                }
            }
        }

        translate([0, -12, -44]) {
            rotate([90, 0, 90]) {
                arcPrism(70, snail_width);
            }
        }
    }
}

module snail_subtractive() {

    snail_width = hole_wide + (edge_radius * 2);

    translate([-edge_radius, -edge_radius, 0]) {

        union() {
            translate([2, -30, -1]) {
                cube([snail_width - 4, 75, 40]);
            }

            translate([-1, -30, -50]) {
                cube([snail_width + 2, 90, 50]);
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
    }
}

module arcPrism(radius, thickness) {
    intersection() {
        cylinder(r=radius, h=thickness, $fn=100);
        translate([0, 0, -1]) {
            cube([radius + 1, radius + 1, thickness + 2]);
        }
    }
}