document.getElementById('due_date').setAttribute('min', new Date().toISOString().split('T')[0]);

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.add('hidden'));
            document.getElementById(sectionId).classList.remove('hidden');
        }

        document.getElementById('addButton').addEventListener('click', function () {
            const todoText = document.getElementById('add_todo').value;
            const todoType = document.getElementById('todo_type').value;
            const dueDate = document.getElementById('due_date').value;

            if (todoText.trim() === '' || dueDate.trim() === '') {
                alert('할 일과 마감 날짜를 입력하세요.');
                return;
            }

            const targetCell = document.getElementById(todoType);
            const todoItem = createTodoItem(todoText, dueDate);
            targetCell.appendChild(todoItem);

            document.getElementById('add_todo').value = '';
            document.getElementById('due_date').value = '';
            updateTodayTasks();
        });

        function createTodoItem(text, dueDate) {
            const todoItem = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    todoItem.classList.add('done');
                    addToDoneList(text, dueDate);
                } else {
                    todoItem.classList.remove('done');
                }
                syncWithTodayTasks(text, dueDate, this.checked);
            });

            const dateSpan = document.createElement('span');
            dateSpan.textContent = ` (마감: ${dueDate})`;

            todoItem.appendChild(checkbox);
            todoItem.appendChild(document.createTextNode(` ${text}`));
            todoItem.appendChild(dateSpan);
            todoItem.setAttribute('data-due-date', dueDate);
            todoItem.setAttribute('data-text', text);

            return todoItem;
        }

        function updateTodayTasks() {
            const today = new Date().toISOString().split('T')[0];
            const cells = document.querySelectorAll('td div[data-due-date]');
            const todayList = document.getElementById('todayList');
            todayList.innerHTML = '';

            cells.forEach(item => {
                if (item.getAttribute('data-due-date') === today) {
                    const clone = item.cloneNode(true);
                    todayList.appendChild(clone);
                }
            });
        }

        function syncWithTodayTasks(text, dueDate, isChecked) {
            const todayList = document.getElementById('todayList').childNodes;
            todayList.forEach(item => {
                if (item.getAttribute('data-text') === text && item.getAttribute('data-due-date') === dueDate) {
                    item.querySelector('input').checked = isChecked;
                    if (isChecked) {
                        item.classList.add('done');
                    } else {
                        item.classList.remove('done');
                    }
                }
            });
        }

        function addToDoneList(todoText, dueDate) {
            const doneList = document.getElementById('doneList');
            const doneItem = document.createElement('li');
            doneItem.textContent = `${todoText} (마감: ${dueDate})`;
            doneList.appendChild(doneItem);
        }

        function signup() {
            const username = document.getElementById('signup_username').value;
            const password = document.getElementById('signup_password').value;
            if (username && password) {
                alert(`${username}님, 회원가입이 완료되었습니다.`);
            } else {
                alert('아이디와 비밀번호를 입력하세요.');
            }
        }

        function login() {
            const username = document.getElementById('login_username').value;
            const password = document.getElementById('login_password').value;
            if (username && password) {
                alert(`${username}님, 환영합니다!`);
            } else {
                alert('아이디와 비밀번호를 입력하세요.');
            }
        }
