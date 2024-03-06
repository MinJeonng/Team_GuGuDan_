//달력 누르면 해당년월일 뜨게하기
document.addEventListener('DOMContentLoaded', function () {
    var currentYear, currentMonth;
    var calendar = document.getElementById('calendar');
    var clickedDateSpan = document.querySelector('.clickedDate');
    var addedInput = document.querySelector('.addedInput');
    var addedDateSpan = document.querySelector('.addedDate');
    var minusInput = document.querySelector('.minusInput');
    var minusDateSpan = document.querySelector('.minusDate');

    function renderCalendar(year, month) {
        var firstDay = new Date(year, month, 1).getDay();
        var lastDate = new Date(year, month + 1, 0).getDate();
        var tbody = calendar.querySelector('tbody');
        var caption = calendar.querySelector('caption');

        tbody.innerHTML = '';
        caption.textContent = year + '년 ' + (month + 1) + '월';

        var date = 1;
        for (var i = 0; i < 6; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
                var cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.textContent = '';
                } else if (date > lastDate) {
                    cell.textContent = '';
                } else {
                    cell.textContent = date;
                    date++;

                    cell.addEventListener('click', function () {
                        currentYear = year;
                        currentMonth = month + 1;
                        var clickedDay = parseInt(this.textContent);
                        clickedDateSpan.textContent = currentYear + '년 ' + currentMonth + '월 ' + clickedDay + '일';
                        clickedDateSpan.classList.remove('hidden');
                    });
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    }
    // n일째 되는날 계산
    function calculateDate() {
        var clickedDateString = clickedDateSpan.textContent;
        if (clickedDateString) {
            var parts = clickedDateString.split(' ');
            var year = parseInt(parts[0]);
            var month = parseInt(parts[1].replace('월', '')) - 1;
            var day = parseInt(parts[2].replace('일', ''));
            var clickedDate = new Date(year, month, day);

            var additionalDays = parseInt(addedInput.value) - 1;
            clickedDate.setDate(clickedDate.getDate() + additionalDays);
            var newYear = clickedDate.getFullYear();
            var newMonth = clickedDate.getMonth() + 1;
            var newDay = clickedDate.getDate();
            addedDateSpan.textContent = newYear + '년 ' + newMonth + '월 ' + newDay + '일';
            addedDateSpan.classList.remove('hidden');
        } else {
            alert('날짜를 선택해주세요.');
        }
    }
    //D-n일 계산
    function calculateMinusDate() {
        var clickedDateString = clickedDateSpan.textContent;
        var minusInputValue = parseInt(minusInput.value.replace('D-', ''));

        if (clickedDateString && !isNaN(minusInputValue)) {
            var parts = clickedDateString.split(' ');
            var year = parseInt(parts[0]);
            var month = parseInt(parts[1].replace('년', '')) - 1;
            var day = parseInt(parts[2].replace('월', '').replace('일', ''));

            var clickedDate = new Date(year, month, day);

            clickedDate.setDate(clickedDate.getDate() - minusInputValue);

            var newYear = clickedDate.getFullYear();
            var newMonth = clickedDate.getMonth() + 1;
            var newDay = clickedDate.getDate();

            minusDateSpan.textContent = newYear + '년 ' + newMonth + '월 ' + newDay + '일';
            minusDateSpan.classList.remove('hidden');
        } else {
            alert('올바른 값을 입력하세요.');
        }
    }

    document.getElementById('nextMonthBtn').addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentYear++;
            currentMonth = 0;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById('prevMonthBtn').addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentYear--;
            currentMonth = 11;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.querySelector('.addedBtn').addEventListener('click', calculateDate);

    document.querySelector('.minusBtn').addEventListener('click', calculateMinusDate);

    var currentDate = new Date();
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    renderCalendar(currentYear, currentMonth);
});

// 년도와 월 옵션 추가
var yearStartSelect = document.getElementById('yearStart');
var yearEndSelect = document.getElementById('yearEnd');
var monthStartSelect = document.getElementById('monthStart');
var monthEndSelect = document.getElementById('monthEnd');

// 1970년부터 2024년까지의 년도 옵션 추가
for (var year = 2024; year >= 1970; year--) {
    var option = document.createElement('option');
    option.textContent = year;
    yearStartSelect.appendChild(option.cloneNode(true));
    yearEndSelect.appendChild(option.cloneNode(true));
}

// 1월부터 12월까지의 월 옵션 추가
for (var month = 1; month <= 12; month++) {
    var option = document.createElement('option');
    option.textContent = month + '월';
    monthStartSelect.appendChild(option.cloneNode(true));
    monthEndSelect.appendChild(option.cloneNode(true));
}
//경력 게산 함수
function calculateCareer() {
    var yearStart = parseInt(document.getElementById('yearStart').value);
    var monthStart = parseInt(document.getElementById('monthStart').value);
    var yearEnd = parseInt(document.getElementById('yearEnd').value);
    var monthEnd = parseInt(document.getElementById('monthEnd').value);
    var employmentStatus = document.getElementById('employmentStatus').value;

    // 연차와 월차 계산
    var yearDiff = yearEnd - yearStart;
    var monthDiff = monthEnd - monthStart;

    // 퇴사가 아니라면 현재 연도와 월을 기준으로 계산
    if (employmentStatus === '재직중') {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;

        yearDiff = currentYear - yearStart;
        monthDiff = currentMonth - monthStart;
    }

    // 음수인 경우 0으로 설정
    if (yearDiff < 0) yearDiff = 0;
    if (monthDiff < 0) monthDiff = 0;

    // 결과를 HTML 요소에 설정
    document.querySelector('.resyear').value = yearDiff;
    document.querySelector('.resmonth').value = monthDiff;
}
