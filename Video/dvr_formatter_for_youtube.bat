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
:: DVR outputs 1280x720 video.
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
set creditVideo=%temp%\credit_%~nx1
set processedVideo=%temp%\processed_%~nx1
set finalVideo=%~dp1youtube_%~nx1

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
    -i "%originalVideo%" ^
    -filter_complex "scale=1920:-1, drawtext=fontfile='c\:\\Windows\\Fonts\\arial.ttf':text=%text%:fontcolor=white:alpha=0.5:fontsize=28:x=30:y=(h-text_h-30)" ^
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
    -c:v copy ^
    -filter:a "volume=0.5" ^
    -shortest ^
    "%finalVideo%" || exit /b
