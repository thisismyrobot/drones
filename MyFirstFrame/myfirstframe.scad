plate(120, 40, 3);

translate([47.5, 20, 0]) {
  arm2(50, 25, 15, 3);
}

translate([-47.5, 20, 0]) {
  arm(50, 25, 15, 3);
}

mirror([0, 1, 0]) {
  translate([47.5, 20, 0]) {
    arm(50, 25, 15, 3);
  }

  translate([-47.5, 20, 0]) {
    arm(50, 25, 15, 3);
  }
}


module plate(length, width, plate_thickness) {

  ridge_width = 2;

  translate([0, 0, (plate_thickness + ridge_width) / 2]) {
    difference(){

      cube([length, width, plate_thickness + ridge_width], center = true);

      translate([0, 0, plate_thickness]) {
          cube([
            length-(ridge_width * 2),
            width-(ridge_width * 2),
            plate_thickness + 1
          ], center = true);
      }

    }
  }
}

module arm2() {

  length = 50;

  translate([0, 0, 10]) {

    hull() {

      difference() {
        translate([0, -10, 0]) {
          sphere(r=1.5, $fn=20);
        }
        translate([-2, -12, -4]) {
          cube([4, 4, 4]);
        }
      }

      rotate(90, [-1, 0, 0]) {

        translate([0, -10, 0]) {
          cylinder(r=1.5, h=length, $fn=20);
        }

        translate([0, -4, 0]) {
          cylinder(r=3, h=length, $fn=40);
        }

        translate([-1.5, -1, 0]) {
          cube([3, 1, length]);
        }
      }
    }
  }



}

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