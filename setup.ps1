$services = @('healthcheck','login','media', 'notification', 'register', 'test', 'token', 'userdata')

Write-Host "Starting project setup"
cd microservices

function testService {
    $proc = Start-Process yarn dev
    Start-Sleep -s 10
    $proc | Stop-Process
    Write-Host "setup for service completed | continue"
}

function installDependencies {

    param (
        $serviceName
    )

    Write-Host "setting up $serviceName..."
    cd $serviceName
    yarn install
    $nid = testService
    $nid | Wait-Process
    cd ..
}

foreach ($serv in $services) {
    $readyService = installDependencies $serv
}