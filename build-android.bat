@echo off
chcp 65001 >nul
setlocal
set "SCRIPT_DIR=%~dp0"

:: 若已设置 JAVA_HOME 则直接使用
if defined JAVA_HOME goto :check_sdk

:: 优先使用项目内已解压的 JDK17（若之前运行过“安装 JDK”步骤）
if exist "%SCRIPT_DIR%jdk-17.0.18+8\bin\java.exe" (
  set "JAVA_HOME=%SCRIPT_DIR%jdk-17.0.18+8"
  echo [信息] 使用项目内 JDK: %JAVA_HOME%
  goto :check_sdk
)

:: 尝试常见 JDK 路径（Android 需 JDK 17）
set "JAVA_HOME="
if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot" set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot"
if exist "C:\Program Files\Java\jdk-17" set "JAVA_HOME=C:\Program Files\Java\jdk-17"
if exist "C:\Program Files\Android\Android Studio\jbr" set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
for /d %%d in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set "JAVA_HOME=%%d"
for /d %%d in ("C:\Program Files\Java\jdk-17*") do set "JAVA_HOME=%%d"

if not defined JAVA_HOME (
  echo [错误] 未找到 Java。请安装 JDK 17 并设置 JAVA_HOME，或安装 Android Studio（自带 JBR）。
  echo 示例: set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
  exit /b 1
)

echo [信息] 使用 JAVA_HOME=%JAVA_HOME%

:check_sdk
if not defined ANDROID_HOME (
  if exist "%SCRIPT_DIR%android\local.properties" goto :build
  echo [错误] 未找到 Android SDK。请安装 Android Studio 并设置 ANDROID_HOME。
  echo 示例: set ANDROID_HOME=%%LOCALAPPDATA%%\Android\Sdk
  echo 或在 android 目录下创建 local.properties 并写: sdk.dir=你的SDK路径
  exit /b 1
)
goto :build

:build
cd /d "%~dp0"
if not "%~d0"=="Z:" if not "%~d0"=="z:" (
  echo [提示] 项目路径含中文时，建议先执行: subst Z: "%~dp0"
  echo         然后在新开命令行中: Z:  ^& cd android  ^& set JAVA_HOME=%~dp0jdk-17.0.18+8  ^& set ANDROID_HOME=%%LOCALAPPDATA%%\Android\Sdk  ^& gradlew.bat assembleRelease
)
cd /d "%~dp0android"
call gradlew.bat assembleRelease --no-daemon
if errorlevel 1 exit /b 1

set "APK=app\build\outputs\apk\release\app-release.apk"
if exist "%APK%" (
  copy /y "%APK%" "%~dp0厌学检测-app-release.apk" >nul
  echo.
  echo [完成] APK 已生成: %~dp0厌学检测-app-release.apk
) else (
  echo [警告] 未找到 APK 输出，请检查 android\app\build\outputs\apk\release\
)
exit /b 0
