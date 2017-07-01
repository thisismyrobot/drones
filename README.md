# My drones and their configurations

As well as a software-failsafe I added to Betaflight
[3.1.7.](https://github.com/betaflight/betaflight/releases/tag/v3.1.7)

## QX95

![QX95](QX95/pic.png?raw=true "QX95")

## Betaflight 3.1.7 software failsafe implementation

My first (and only right now) drone is an Eachine QX95 with the a copy of a
SP Racing F3 EVO flight controller + a Flysky receiver, all on the same board:

![SP Racing F3 EVO flight controller](QX95/board/0d7c74b.jpg?raw=true "SP Racing F3 EVO flight controller") 

This board has no Flysky failsafe (PPM output freeze on TX drop-out) so I
wrote a [small patch against Betaflight 3.1.7](https://github.com/betaflight/betaflight/compare/v3.1.7...thisismyrobot:ppm_freeze_3.1.7_patch#diff-5a9bf24388376542cd4115a5141145e7)
to report loss of signal after 3 seconds of no change in input.

You can apply that patch to 3.1.7 yourself manually, I've also included it
[here in this repository](Betaflight/ppm_freeze_failsafe_bf_3.1.7.patch)
or you can just compile
[the branch](https://github.com/thisismyrobot/betaflight/tree/ppm_freeze_3.1.7_patch)
in my fork :)

## Config format

CLI dumps currently done with:

    diff all

See the diff for the exact Betaflight version.
