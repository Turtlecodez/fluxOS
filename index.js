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
