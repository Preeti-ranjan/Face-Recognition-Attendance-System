$root = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"
$manifests = @(
  "tiny_face_detector_model-weights_manifest.json",
  "face_landmark_68_model-weights_manifest.json",
  "face_recognition_model-weights_manifest.json"
)
New-Item -Path "./models" -ItemType Directory -Force | Out-Null

foreach ($m in $manifests) {
  $manifestUrl = "$root/$m"
  $manifestOut = "models/$m"
  Write-Host "Downloading manifest: $manifestUrl"
  Invoke-WebRequest -Uri $manifestUrl -OutFile $manifestOut -UseBasicParsing
  # parse manifest JSON to find referenced shards
  $json = Get-Content $manifestOut -Raw | ConvertFrom-Json
  foreach ($entry in $json) {
    foreach ($w in $entry.weights) {
      foreach ($p in $w.paths) {
        $shardUrl = "$root/$p"
        $shardOut = "models/$p"
        if (Test-Path $shardOut) {
          Write-Host "Exists: $shardOut - skipping"
        } else {
          Write-Host "Downloading shard: $shardUrl"
          Invoke-WebRequest -Uri $shardUrl -OutFile $shardOut -UseBasicParsing
        }
      }
    }
  }
}
Write-Host "Download complete. Verify files in .\models"
