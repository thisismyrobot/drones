/*

    Designed to fit a Runcam Mini in place of the front supports.

    The big-stepped end is the top, the existing top-plate sits *inside* that.

    The small-stepped end is the bottom, and sits *on* the bottom plate.

    The steps are big enough to fit M3 x 2.5mm nuts. You'll have to drill your
    own holes in the side for the camera itself.

*/

// Settings.
edge_radius = 2.8;
hole_wide = 17.5;
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
rotate([90, 0, 0]) {
    ring();
}

module ring() {
    difference() {
        ringAdd();
        ringRemove();
    }
}

module ringAdd(){
    // outer box
    cube([ring_width, ring_depth, ring_height]);
}

module ringRemove(){
    translate([0, -1, 0]) {

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

    // Prop clearance chamfers
    translate([-1, ring_depth, prop_top_down]) {
        rotate([0, 0, -45]) {
            cube([thickness + 1, thickness + 1, cam_height - thickness*2]);
        }
    }

}
