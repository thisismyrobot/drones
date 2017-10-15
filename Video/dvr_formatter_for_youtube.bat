:: Basic formatter for videos from my current DVR for YouTube.
::
:: Usage:
::
::      dvr_formatter_for_youtube.bat [path to video]
::
::      (or drag a video on to dvr_formatter_for_youtube.bat)
::
:: Assumes the video is already the correct length, fix that with:
::
::      ffmpeg -ss [start] -i in.avi -t [duration] -c copy out.avi
::
@echo off

:: Settings
set ffmpegLoc=c:\ffmpeg\ffmpeg.exe
set text=thisismyrobot
set audio=%~dp0Fallin-extended-mix.mp3
set credits=%~dp0credits.png
set commonParams=-y -hide_banner -loglevel error

:: Command line
set originalVideo=%~1

:: Computed file paths
set backgroundVideo=%temp%\background_%~nx1
set creditVideo=%temp%\credit_%~nx1
set processedVideo=%temp%\processed_%~nx1
set finalVideo=%~dp1youtube_%~nx1

:: Prepare the background video.
echo Background video...
%ffmpegLoc% ^
    %commonParams% ^
    -i "%originalVideo%" ^
    -filter:v "crop=640:360:0:60, scale=-1:480, boxblur=20:1" ^
    "%backgroundVideo%" || exit /b

:: Prepare the end credit.
echo End credit...
%ffmpegLoc% ^
    %commonParams% ^
    -loop 1 ^
    -t 5 ^
    -i "%credits%" ^
    -c:v libx264 ^
    -preset slow ^
    -crf 18 ^
    -pix_fmt yuv420p ^
    -vf scale=1920:1080 ^
    "%creditVideo%" || exit /b

:: Overlay the original and encode for YouTube.
echo Layering...
%ffmpegLoc% ^
    %commonParams% ^
    -i "%backgroundVideo%" ^
    -i "%originalVideo%" ^
    -filter_complex "[0:0][1:0]overlay=106:0, scale=1920:-1, drawtext=fontfile='c\:\\Windows\\Fonts\\arial.ttf':text=%text%:fontcolor=white:alpha=0.5:fontsize=28:x=30:y=(h-text_h-30)" ^
    -c:v libx264 ^
    -preset slow ^
    -crf 18 ^
    -pix_fmt yuv420p ^
    "%processedVideo%" || exit /b

:: Combine the parts, overlay the audio.
echo Concat with audio...
%ffmpegLoc% ^
    %commonParams% ^
    -i "concat:%processedVideo%|%creditVideo%" ^
    -i "%audio%" ^
    -map 0:v:0 ^
    -map 1:a:0 ^
    -c copy ^
    -shortest ^
    "%finalVideo%" || exit /b
