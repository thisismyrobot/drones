:: Basic formatter for videos from my current DVR for YouTube.
::
:: Usage:
::
::      dvr_formatter_for_youtube_simple.bat [path to video]
::
::      (or drag a video on to dvr_formatter_for_youtube.bat)
::
:: Assumes the video is already the correct length, fix that with:
::
::      ffmpeg -ss [start] -i in.avi -t [duration] -c copy out.avi
::
:: DVR outputs 1280x720 video.
@echo off

:: Settings
set ffmpegLoc=%~dp0ffmpeg.exe
set commonParams=-y -hide_banner -loglevel error

:: Command line
set originalVideo=%~1

:: Computed file paths
set finalVideo=%~dp1youtube_simple_%~nx1

:: Encode for YouTube.
echo Resizing...
%ffmpegLoc% ^
    %commonParams% ^
    -i "%originalVideo%" ^
    -filter_complex "scale=1920:-1" ^
    -c:v libx264 ^
    -preset slow ^
    -crf 18 ^
    -pix_fmt yuv420p ^
    "%finalVideo%" || exit /b
