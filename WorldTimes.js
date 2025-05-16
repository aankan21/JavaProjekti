let timeZoneData = {};

const apiKey = "5WIRC1IOHL4O";  

async function fetchTimeZonesFromAPI() {
    try {
        const response = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`);
        const data = await response.json();

        if (data.status === "OK") {
            timeZoneData = {};

            data.zones.forEach(zone => {
                timeZoneData[zone.zoneName] = `${zone.countryName} (${zone.zoneName})`;
            });

            populateTimeZones(); 
            generateTimeZoneTable(); 
        } else {
            console.error("API Error:", data.message);
        }
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

function convertTime() {
    const timeInput = document.getElementById("timeInput").value;
    const fromZone = document.getElementById("fromTimeZone").value;
    const toZone = document.getElementById("toTimeZone").value;
    const result = document.getElementById("result");

    if (!timeInput) {
        result.innerHTML = "<span style='color: red;'>⚠️ Please enter a time.</span>";
        return;
    }

    const [hours, minutes] = timeInput.split(":").map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);

    const fromTime = formatTime(fromZone, now);
    const toTime = formatTime(toZone, now);

    result.innerHTML = `<strong>${toTime}</strong>`;
}


function formatTime(zone, date) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}


function populateTimeZones() {
    const fromDropdown = document.getElementById("fromTimeZone");
    const toDropdown = document.getElementById("toTimeZone");

    Object.keys(timeZoneData).forEach(zone => {
        const option1 = createOption(zone);
        const option2 = createOption(zone);

        fromDropdown.add(option1);
        toDropdown.add(option2);
    });

    
    fromDropdown.value = "Europe/Helsinki";
    toDropdown.value = "America/New_York";

    generateTimeZoneTable();
}


function createOption(zone) {
    const option = document.createElement("option");
    option.value = zone;
    option.text = timeZoneData[zone];
    return option;
}


function generateTimeZoneTable() {
    const tableBody = document.getElementById("timeZoneTableBody");
    tableBody.innerHTML = '';

    Object.keys(timeZoneData).forEach(zone => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = timeZoneData[zone];
        row.appendChild(nameCell);

        const zoneCell = document.createElement("td");
        zoneCell.textContent = zone;
        row.appendChild(zoneCell);

        const timeCell = document.createElement("td");
        const timeNow = formatTime(zone, new Date());
        timeCell.textContent = timeNow;
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    });
}


window.onload = fetchTimeZonesFromAPI;

setInterval(generateTimeZoneTable, 30000);
