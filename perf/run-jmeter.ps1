param(
    [string]$BaseUrl = "localhost",
    [int]$BasePort = 8080,
    [string]$Plan = "crud-5ops-load-test.jmx",
    [string]$JMeterVersion = "5.6.3"
)

$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

function Resolve-JMeterBat {
    if ($env:JMETER_HOME) {
        $fromEnv = Join-Path $env:JMETER_HOME "bin/jmeter.bat"
        if (Test-Path $fromEnv) {
            return (Resolve-Path $fromEnv).Path
        }
    }

    $projectRoot = Split-Path -Parent $scriptRoot
    $localTools = Join-Path $projectRoot "tools/apache-jmeter-$JMeterVersion/bin/jmeter.bat"
    if (Test-Path $localTools) {
        return (Resolve-Path $localTools).Path
    }

    Write-Host "JMeter not found. Downloading apache-jmeter-$JMeterVersion..." -ForegroundColor Yellow
    $toolsDir = Join-Path $projectRoot "tools"
    New-Item -ItemType Directory -Path $toolsDir -Force | Out-Null

    $zipFile = Join-Path $toolsDir "apache-jmeter-$JMeterVersion.zip"
    $downloadUrl = "https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-$JMeterVersion.zip"
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile
    Expand-Archive -Path $zipFile -DestinationPath $toolsDir -Force

    $downloaded = Join-Path $toolsDir "apache-jmeter-$JMeterVersion/bin/jmeter.bat"
    if (!(Test-Path $downloaded)) {
        throw "JMeter download failed: $downloaded not found."
    }
    return (Resolve-Path $downloaded).Path
}

if (!(Test-Path $Plan)) {
    $planFromScriptRoot = Join-Path $scriptRoot $Plan
    if (Test-Path $planFromScriptRoot) {
        $Plan = $planFromScriptRoot
    } else {
        throw "JMeter plan not found: $Plan"
    }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$resultDir = Join-Path $scriptRoot "results/$timestamp"
New-Item -ItemType Directory -Path $resultDir -Force | Out-Null

$jtlPath = Join-Path $resultDir "results.jtl"
$reportDir = Join-Path $resultDir "report"
$summaryPath = Join-Path $resultDir "summary.md"

$jmeterBat = Resolve-JMeterBat
Write-Host "Using JMeter: $jmeterBat"
Write-Host "Running plan: $Plan"
Write-Host "Target: http://$BaseUrl`:$BasePort"

& $jmeterBat -n `
    -t $Plan `
    -l $jtlPath `
    -e -o $reportDir `
    -JbaseUrl=$BaseUrl `
    -JbasePort=$BasePort

$statsPath = Join-Path $reportDir "statistics.json"
if (Test-Path $statsPath) {
    $stats = Get-Content -Raw $statsPath | ConvertFrom-Json
    $total = $stats.Total
    @"
# JMeter Results

Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Plan: $Plan
Target: http://$BaseUrl`:$BasePort
Sample count: $($total.sampleCount)
Errors: $($total.errorCount) ($([math]::Round($total.errorPct * 100, 2))%)
Throughput (req/sec): $([math]::Round($total.throughput, 2))
Mean response time (ms): $([math]::Round($total.meanResTime, 2))
Median response time (ms): $([math]::Round($total.medianResTime, 2))
P90 response time (ms): $([math]::Round($total.pct1ResTime, 2))
P95 response time (ms): $([math]::Round($total.pct2ResTime, 2))
P99 response time (ms): $([math]::Round($total.pct3ResTime, 2))
Min/Max response time (ms): $([math]::Round($total.minResTime, 2)) / $([math]::Round($total.maxResTime, 2))
"@ | Set-Content $summaryPath
}

Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host "JTL: $jtlPath"
Write-Host "Report: $reportDir"
if (Test-Path $summaryPath) {
    Write-Host "Summary: $summaryPath"
}
