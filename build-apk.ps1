# Build Android Release APK for SparkLight (Dianliang Weiguang)
# Requires JDK 17. Set JAVA_HOME or script will try to find it.

$ErrorActionPreference = "Stop"

if (-not $env:JAVA_HOME) {
    $paths = @(
        "C:\Program Files\Eclipse Adoptium\jdk-17*",
        "C:\Program Files\Java\jdk-17*",
        "C:\Program Files\Microsoft\jdk-17*"
    )
    foreach ($p in $paths) {
        $found = Get-Item $p -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($found) {
            $env:JAVA_HOME = $found.FullName
            Write-Host "JAVA_HOME: $env:JAVA_HOME"
            break
        }
    }
}

if (-not $env:JAVA_HOME) {
    Write-Host "ERROR: JAVA_HOME not set. Install JDK 17 from https://adoptium.net/"
    Write-Host "Then set: `$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot'"
    exit 1
}

$projectRoot = $PSScriptRoot
$androidDir = Join-Path $projectRoot "android"

if (-not (Test-Path $androidDir)) {
    Write-Host "ERROR: android folder not found"
    exit 1
}

Write-Host "Building Release APK..."

Push-Location $androidDir
.\gradlew.bat assembleRelease
$code = $LASTEXITCODE
Pop-Location

if ($code -eq 0) {
    $apkPath = Join-Path $projectRoot "android\app\build\outputs\apk\release\app-release.apk"
    Write-Host "SUCCESS. APK: $apkPath"
}
exit $code
