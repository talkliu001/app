# Find JDK on this machine. Run: .\find-java.ps1
# Then set JAVA_HOME to one of the paths shown and run .\build-apk.ps1

$roots = @(
    "C:\Program Files\Eclipse Adoptium",
    "C:\Program Files\Java",
    "C:\Program Files\Microsoft",
    "C:\Program Files (x86)\Java"
)

Write-Host "Searching for JDK..."
foreach ($root in $roots) {
    if (Test-Path $root) {
        Get-ChildItem $root -Directory -ErrorAction SilentlyContinue | ForEach-Object {
            $full = $_.FullName
            $javaExe = Join-Path $full "bin\java.exe"
            if (Test-Path $javaExe) {
                Write-Host ""
                Write-Host "Found: $full"
                Write-Host "  Set: `$env:JAVA_HOME = `"$full`""
            }
        }
    }
}

Write-Host ""
Write-Host "If empty above, install JDK 17 from https://adoptium.net/ then run this again."
