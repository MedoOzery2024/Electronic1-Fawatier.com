document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
        updateClock();
        updateDate();
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('show-items-btn').addEventListener('click', function() {
    const itemsMenu = document.getElementById('items-menu');
    itemsMenu.style.display = itemsMenu.style.display === 'none' ? 'block' : 'none';
});

function showItemPage(item) {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('item-page').style.display = 'block';
    document.getElementById('item-title').textContent = `صفحة ${item}`;
    document.getElementById('item-name').value = item;
}

function calculateTotal() {
    const soldQuantity = document.getElementById('sold-quantity').value;
    const pricePerUnit = document.getElementById('price-per-unit').value;
    const total = soldQuantity * pricePerUnit;
    alert(`إجمالي الفاتورة: ${total} جنيه مصري`);
}

function calculateRemaining() {
    const currentQuantity = document.getElementById('current-quantity').value;
    const soldQuantity = document.getElementById('sold-quantity').value;
    const remaining = currentQuantity - soldQuantity;
    alert(`عدد الأصناف المتبقية: ${remaining}`);
}

function addToTable() {
    const orderNumber = document.getElementById('order-number').value;
    const itemName = document.getElementById('item-name').value;
    const itemType = document.getElementById('item-type').value;
    const quantity = document.getElementById('quantity').value;
    const currentQuantity = document.getElementById('current-quantity').value;
    const soldQuantity = document.getElementById('sold-quantity').value;
    const pricePerUnit = document.getElementById('price-per-unit').value;
    const total = soldQuantity * pricePerUnit;
    const remaining = currentQuantity - soldQuantity;

    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cells = [
        orderNumber,
        itemName,
        itemType,
        quantity,
        currentQuantity,
        soldQuantity,
        pricePerUnit,
        total,
        remaining
    ];

    cells.forEach(cell => {
        const newCell = newRow.insertCell();
        newCell.textContent = cell;
    });

    saveTableData();
}

function saveData() {
    const data = {
        orderNumber: document.getElementById('order-number').value,
        itemName: document.getElementById('item-name').value,
        itemType: document.getElementById('item-type').value,
        quantity: document.getElementById('quantity').value,
        currentQuantity: document.getElementById('current-quantity').value,
        soldQuantity: document.getElementById('sold-quantity').value,
        pricePerUnit: document.getElementById('price-per-unit').value
    };
    localStorage.setItem('itemData', JSON.stringify(data));
    alert('تم حفظ البيانات');
}

function saveTableData() {
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const rows = [];
    for (let i = 0; i < table.rows.length; i++) {
        const cells = table.rows[i].cells;
        const rowData = [];
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }
        rows.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(rows));
}

function deleteData() {
    localStorage.removeItem('itemData');
    localStorage.removeItem('tableData');
    document.getElementById('order-number').value = '';
    document.getElementById('item-name').value = '';
    document.getElementById('item-type').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('current-quantity').value = '';
    document.getElementById('sold-quantity').value = '';
    document.getElementById('price-per-unit').value = '';
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear the table
    alert('تم حذف البيانات');
}

function restoreData() {
    const data = JSON.parse(localStorage.getItem('itemData'));
    if (data) {
        document.getElementById('order-number').value = data.orderNumber;
        document.getElementById('item-name').value = data.itemName;
        document.getElementById('item-type').value = data.itemType;
        document.getElementById('quantity').value = data.quantity;
        document.getElementById('current-quantity').value = data.currentQuantity;
        document.getElementById('sold-quantity').value = data.soldQuantity;
        document.getElementById('price-per-unit').value = data.pricePerUnit;
        alert('تم استعادة البيانات');
    } else {
        alert('لا توجد بيانات محفوظة');
    }
}

function restoreTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear the table
        tableData.forEach(rowData => {
            const newRow = table.insertRow();
            rowData.forEach(cellData => {
                const newCell = newRow.insertCell();
                newCell.textContent = cellData;
            });
        });
        alert('تم استعادة البيانات من الجدول');
    } else {
        alert('لا توجد بيانات محفوظة في الجدول');
    }
}

function printData() {
    window.print();
}

function goBack() {
    document.getElementById('item-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
}

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    clockElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}

function updateDate() {
    const dateElement = document.getElementById('date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gregorianDate = now.toLocaleDateString('ar-EG', options);

    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', options).format(now);
    dateElement.textContent = `التاريخ الميلادي: ${gregorianDate}\nالتاريخ الهجري: ${hijriDate}`;
}

setInterval(updateClock, 1000);
setInterval(updateDate, 1000);
