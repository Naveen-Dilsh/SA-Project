Get-ChildItem -Path ".\Car_Auction Frontend\src" -Recurse -Filter "*.js*" | ForEach-Object {
    $content = Get-Content $_.FullName
    $newContent = $content -replace 'https://localhost:7021', ''
    if ($content -ne $newContent) {
        Set-Content -Path $_.FullName -Value $newContent
        Write-Host "Updated $($_.Name)"
    }
}
Write-Host "Frontend URLs updated for production/docker deployment."
