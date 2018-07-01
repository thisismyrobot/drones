arm(60, 25, 15, 3);


module arm(length, width_start, width_end, plate_thickness) {

  ridge_width = 2;

  // Arm plate with ridges
  difference() {
    arm_plate(
      length,
      width_start,
      width_end,
      plate_thickness + ridge_width
    );

    translate([0, -1, plate_thickness]) {
      arm_plate(
        length + 1,
        width_start - (ridge_width * 2),
        width_end - (ridge_width * 2),
        ridge_width + 1
      );
    }
  }
}

module arm_plate(length, width_start, width_end, thickness) {

  motor_axle_width = 4;
  motor_bolt_spacing = 8.4;
  motor_bolt_width = 1.4;

  translate([-width_start / 2, 0, 0]) {
    difference() {
      hull() {
        // arm plate
        cube([width_start, 1, thickness]);

        // motor plate
        translate([width_start / 2, length, 0]) {
          cylinder(r=width_end / 2, h=thickness, $fn=100);
        }
      }

      union(){

        // Bottom of motor.
        translate([width_start / 2, length, -1]) {
          cylinder(r=motor_axle_width / 2, h=thickness + 1, $fn=25);

          // Four bolt holes.
          for (i = [0:3]) {
            rotate((i * (360/4)) + 45, [0, 0, 1]) {
              translate([0, motor_bolt_spacing / 2, 0]) {
                cylinder(r=motor_bolt_width / 2, h = thickness + 1, $fn=10);
              }
            }
          }
        }
      }
    }
  }
}