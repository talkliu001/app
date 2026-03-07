# Build Android APK - uses project JDK, avoids Chinese path encoding
$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot

# Use subst Z: to avoid Gradle/Node encoding issues with Chinese paths
$useSubst = $projectRoot -match '[^\x00-\x7F]'
if ($useSubst) {
    subst Z: /D 2>$null
    subst Z: $projectRoot
    $buildRoot = "Z:"
    Write-Host "Using Z: (subst) to avoid path encoding"
} else {
    $buildRoot = $projectRoot
}

$jdkPath = Join-Path $buildRoot "jdk-17.0.18+8"
if (Test-Path (Join-Path $jdkPath "bin\java.exe")) {
    $env:JAVA_HOME = $jdkPath
    Write-Host "JAVA_HOME: $jdkPath"
} elseif ($env:JAVA_HOME) {
    Write-Host "JAVA_HOME: $env:JAVA_HOME"
} else {
    Write-Host "ERROR: No JDK. Set JAVA_HOME or ensure jdk-17.0.18+8 in project."
    if ($useSubst) { subst Z: /D 2>$null }
    exit 1
}

$localProps = Join-Path $buildRoot "android\local.properties"
if (-not $env:ANDROID_HOME -and -not (Test-Path $localProps)) {
    Write-Host "ERROR: ANDROID_HOME not set and no android\local.properties"
    if ($useSubst) { subst Z: /D 2>$null }
    exit 1
}

$androidDir = Join-Path $buildRoot "android"
Push-Location $androidDir

try {
    .\gradlew.bat clean assembleRelease --no-daemon
    $code = $LASTEXITCODE
} finally {
    Pop-Location
}

if ($code -eq 0) {
    $apk = Join-Path $buildRoot "android\app\build\outputs\apk\release\app-release.apk"
    $dest = Join-Path $projectRoot "SparkLight-release.apk"
    Copy-Item $apk $dest -Force
    Write-Host "APK: $dest"
}

if ($useSubst) { subst Z: /D 2>$null }
exit $code
