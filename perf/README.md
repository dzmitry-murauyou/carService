# Performance Tests

This folder contains load-testing assets for JMeter.

## Files

- `crud-5ops-load-test.jmx` - JMeter plan with 5 operations: `POST -> GET -> PATCH -> PUT -> DELETE`
- `run-jmeter.ps1` - PowerShell runner (downloads JMeter automatically if needed)
- `results/` - generated test outputs (JTL + HTML report + summary)

## Run

From project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\perf\run-jmeter.ps1
```

Run CRUD 5-ops plan with custom load profile:

```powershell
powershell -ExecutionPolicy Bypass -File .\perf\run-jmeter.ps1 -Plan .\perf\crud-5ops-load-test.jmx
```

The plan supports JMeter properties:
- `threads` (default `50`)
- `loops` (default `20`)
- `rampUp` (default `15`)

Example:

```powershell
$env:JMETER_HOME="D:\tools\apache-jmeter-5.6.3"
& "$env:JMETER_HOME\bin\jmeter.bat" -n -t .\perf\crud-5ops-load-test.jmx -l .\perf\results\manual.jtl -e -o .\perf\results\manual-report -JbaseUrl=localhost -JbasePort=8080 -Jthreads=100 -Jloops=50 -JrampUp=20
```

Custom host/port:

```powershell
powershell -ExecutionPolicy Bypass -File .\perf\run-jmeter.ps1 -BaseUrl localhost -BasePort 8080
```
