# Default value of arguments
param (
    [switch] $build=$false
)

$server="rferrali@50.87.249.225"
$distant="~/public_html"


Write-Output "# Deploying client app..."
if ($build) {
    Write-Output "### Building app for production"
    ng build --prod
}
Copy-Item .\.htaccess dist\my-app\.htaccess
Set-Location dist\my-app
Write-Output "### Creating bundle"
tar --exclude=client.tar.gz -zcpf client.tar.gz *
Write-Output "### Uploading bundle"
scp -p 2222 client.tar.gz ${server}:${distant}
Remove-Item client.tar.gz
Write-Output "### Unpacking bundle"
ssh -p 2222 $server "bash -O extglob -c \`"cd ${distant}; rm -rd !(\`"client.tar.gz\`"|\`"server\`"); tar -xf client.tar.gz\`""
Set-Location ..\..
Write-Output "# Done"