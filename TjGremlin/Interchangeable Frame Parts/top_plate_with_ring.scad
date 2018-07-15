// Settings.
edge_radius = 2.8;
hole_wide = 17.5;
hole_long = 40.4;
thickness = 2;
bolt_hole_radius = 1.5;
cam_above = 11;
cam_below = 12;
nut_height = 2.5;
cam_width = 19;
ring_depth = 6;

// Derived.
cam_height = cam_above + cam_below;
frame_width = (edge_radius*2) + hole_wide;
ring_width = frame_width + (thickness*2);
ring_height = cam_above + cam_below + (nut_height * 2) + thickness * 3;
frame_top_down = thickness;
cam_top_down = frame_top_down + thickness + nut_height;
prop_top_down = cam_top_down + thickness;
feet_top_down = cam_top_down + cam_height;

// Make it!
plate();

translate([30, ring_height - edge_radius, 0]) {
    rotate([90, 0, 0]) {
        ring();
    }
}

module plate() {
    difference() {
        plateAdd();
        plateRemove();
    }
}

module plateAdd() {

    hull() {

        translate([-edge_radius, -edge_radius, 0]) {
            cube([frame_width, 10, thickness]);
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

module ring() {

    difference() {

        // outer box
        cube([ring_width, ring_depth, ring_height]);

        // cutouts.
        translate([0, -1, 0]) {
            union() {

                // frame top.
                translate([thickness, 0, frame_top_down]) {
                    cube([frame_width, ring_depth + 2, thickness + nut_height]);
                }

                // Cam
                translate([((ring_width - cam_width) / 2), 0, cam_top_down - 1]){
                    cube([cam_width, ring_depth + 2, cam_height + 2]);
                }

                // Props
                translate([-1, 0, prop_top_down]) {
                    cube([thickness + 1, ring_depth + 2, cam_height - thickness*2]);
                }

                translate([ring_width-thickness, 0, prop_top_down]) {
                    cube([thickness + 1, ring_depth + 2, cam_height - thickness*2]);
                }

                // Feet.
                translate([thickness, 0, feet_top_down]) {
                    cube([frame_width, ring_depth + 2, nut_height]);
                }

                // Holes.
                translate([edge_radius + thickness, (ring_depth / 2) + 1, -1]) {
                    cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);

                    translate([hole_wide, 0, 0]) {
                        cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);
                    }
                }

                translate([edge_radius + thickness, (ring_depth / 2) + 1, feet_top_down + thickness - 1]) {
                    cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);

                    translate([hole_wide, 0, 0]) {
                        cylinder(r=bolt_hole_radius, h=thickness+2, $fn=100);
                    }
                }

            }
        }
    }
}
