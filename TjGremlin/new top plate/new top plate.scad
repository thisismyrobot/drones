
edge_radius = 2.8;
hole_wide = 17.5;
hole_long = 40.4;
thickness = 2;
bolt_hole_radius = 1.5;

difference() {
    plate();
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
            cylinder(r=edge_radius * 3, h=thickness, $fn=100);
        }
    }
}

module holes() {

    translate([0, 0, -1]) {
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

        translate([(hole_wide / 2) + 3.5, hole_long + 6.5, 0]) {
            cylinder(r=2, h=thickness+2, $fn=100);
        }

        translate([(hole_wide / 2) - 3.5, hole_long + 6.5, 0]) {
            cylinder(r=2, h=thickness+2, $fn=100);
        }
    }
}