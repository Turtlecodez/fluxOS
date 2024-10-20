document.getElementById('chrome').addEventListener('click', openChrome);
document.getElementById('x-icon').addEventListener('click', closeChrome);
document.getElementById('minimize').addEventListener('click', minimizeChrome);
document.getElementById('settings').addEventListener('click', openSettings);
document.getElementById('settings-x-icon').addEventListener('click', closeSettings);
document.getElementById('settings-minimize').addEventListener('click', minimizeSettings);

document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        };
        reader.readAsDataURL(file);
    }
});

function openSettings() {
    const settingsWindow = document.getElementById('settings-window');
    const settingsBar = document.getElementById('settings-bar');
    const settingsXIcon = document.getElementById('settings-x-icon');
    const settingsMinimize = document.getElementById('settings-minimize');

    settingsWindow.style.display = 'block';
    settingsBar.style.display = 'block';
    settingsXIcon.style.display = 'block';
    settingsMinimize.style.display = 'block';
}

function closeSettings() {
    const settingsWindow = document.getElementById('settings-window');
    const settingsBar = document.getElementById('settings-bar');
    const settingsXIcon = document.getElementById('settings-x-icon');
    const settingsMinimize = document.getElementById('settings-minimize');

    settingsWindow.style.display = 'none';
    settingsBar.style.display = 'none';
    settingsXIcon.style.display = 'none';
    settingsMinimize.style.display = 'none';
}

function minimizeSettings() {
    const settingsWindow = document.getElementById('settings-window');
    const settingsBar = document.getElementById('settings-chrome-bar');
    const settingsXIcon = document.getElementById('settings-x-icon');
    const settingsMinimize = document.getElementById('settings-minimize');

    settingsWindow.style.display = 'block';
    settingsBar.style.display = 'block';
    settingsXIcon.style.display = 'block';
    settingsMinimize.style.display = 'block';
}

function openChrome() {
    const chromeWindow = document.getElementById('chrome-window');
    const chromeBar = document.getElementById('chrome-bar');
    const xIcon = document.getElementById('x-icon');
    const minimize = document.getElementById('minimize');

    chromeWindow.style.display = 'block';
    chromeBar.style.display = 'block';
    xIcon.style.display = 'block';
    minimize.style.display = 'block';
}

function closeChrome() {
    const chromeWindow = document.getElementById('chrome-window');
    const chromeBar = document.getElementById('chrome-bar');
    const xIcon = document.getElementById('x-icon');
    const minimize = document.getElementById('minimize');

    chromeWindow.src = "./styles.css";

    chromeWindow.style.display = 'none';
    chromeBar.style.display = 'none';
    xIcon.style.display = 'none';
    minimize.style.display = 'none';

    chromeWindow.src = "https://proccy-finder.vercel.app/";
}

function minimizeChrome() {
    const chromeWindow = document.getElementById('chrome-window');
    const chromeBar = document.getElementById('chrome-bar');
    const xIcon = document.getElementById('x-icon');
    const minimize = document.getElementById('minimize');

    chromeWindow.style.display = 'none';
    chromeBar.style.display = 'none';
    xIcon.style.display = 'none';
    minimize.style.display = 'none';
}

function timeAndDate() {
    const date = new Date();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;
    let hours = date.getHours();
    const minutes = date.getMinutes();

    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    document.getElementById("date").innerText = formattedDate;
    document.getElementById("time").innerText = formattedTime;

    navigator.getBattery().then(function(battery) {
        updateBatteryIcon(battery.level);
        battery.addEventListener('levelchange', function() {
            updateBatteryIcon(battery.level);
        });
    });

    getWifiStrength();
}

function updateBatteryIcon(level) {
    const batteryIcon = document.getElementById("battery-icon");
    if (level === 1) {
        batteryIcon.src = "./assets/battery_icons/full_battery.png";
    } else if (level >= 0.5) {
        batteryIcon.src = "./assets/battery_icons/good_battery.png";
    } else if (level >= 0.3) {
        batteryIcon.src = "./assets/battery_icons/meh_battery.png";
    } else if (level >= 0.1) {
        batteryIcon.src = "./assets/battery_icons/not_good_battery.png";
    } else {
        batteryIcon.src = "./assets/battery_icons/low_battery.png";
    }
}

function getWifiStrength() {
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        const wifiIcon = document.getElementById("wifi-icon");
        const effectiveType = connection.effectiveType;

        if (effectiveType === 'wifi') {
            wifiIcon.src = "./assets/wifi_icons/strong_wifi.png";
        } else if (effectiveType === '4g' || effectiveType === '3g') {
            wifiIcon.src = "./assets/wifi_icons/meh_wifi.png";
        } else {
            wifiIcon.src = "./assets/wifi_icons/weak_wifi.png";
        }

        connection.addEventListener('change', () => {
            getWifiStrength();
        });
    } else {
        console.log('Network Information API not supported in this browser.');
        wifiIcon.src = "./assets/wifi_icons/strong_wifi.png";
    }
}

timeAndDate();
setInterval(timeAndDate, 1000);
