/* ============================================
   FinApp - Lógica Principal
   ============================================ */

// ============ Configuración ============
const STORAGE_KEYS = {
    transactions: 'finapp_transactions',
    goals: 'finapp_goals'
};

const EXPENSE_CATEGORIES = ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Ropa', 'Servicios', 'Otros'];
const INCOME_CATEGORIES = ['Salario', 'Freelance', 'Inversiones', 'Ventas', 'Otros'];

const CATEGORY_COLORS = [
    '#6C63FF', '#FF6B6B', '#00C9A7', '#FFB347', '#FF85A2',
    '#45B7D1', '#96E6A1', '#DDA0DD', '#98D8C8'
];

const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// ============ Utilidades ============
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatDateShort = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
};

const getDaysRemaining = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline + 'T00:00:00');
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
};

// ============ Storage ============
const getData = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// ============ Toast Notifications ============
const showToast = (message, type = 'info') => {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// ============ Navigation ============
const navigateTo = (pageName) => {
    // Update pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageName);
    if (target) target.classList.add('active');

    // Update sidebar nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${pageName}"]`)?.classList.add('active');

    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector(`.bottom-nav-item[data-page="${pageName}"]`)?.classList.add('active');

    // Refresh page content
    if (pageName === 'dashboard') renderDashboard();
    if (pageName === 'gastos') renderTransactions();
    if (pageName === 'objetivos') renderGoals();
};

// ============ Modal Functions ============
const openModal = (modalId) => {
    document.getElementById(modalId).classList.add('active');
};

const closeModal = (modalId) => {
    document.getElementById(modalId).classList.remove('active');
};

// ============ Category Population ============
const updateCategories = (type) => {
    const select = document.getElementById('transactionCategory');
    const categories = type === 'ingreso' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    select.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
};

// ============ DASHBOARD ============
let incomeExpenseChart = null;
let categoryChart = null;

const renderDashboard = () => {
    const transactions = getData(STORAGE_KEYS.transactions);
    const goals = getData(STORAGE_KEYS.goals);

    // Update greeting
    const hour = new Date().getHours();
    let greetText = '¡Buenos días!';
    if (hour >= 12 && hour < 18) greetText = '¡Buenas tardes!';
    if (hour >= 18) greetText = '¡Buenas noches!';
    document.getElementById('greeting').textContent = `${greetText} Aquí está tu resumen financiero`;

    // Calculate totals
    const totalIncome = transactions.filter(t => t.type === 'ingreso').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'gasto').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    const totalSavings = goals.reduce((sum, g) => sum + g.currentAmount, 0);

    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);
    document.getElementById('totalBalance').textContent = formatCurrency(balance);
    document.getElementById('totalSavings').textContent = formatCurrency(totalSavings);

    renderIncomeExpenseChart(transactions);
    renderCategoryChart(transactions);
    renderDashboardGoals(goals);
    renderRecentTransactions(transactions);
};

const renderIncomeExpenseChart = (transactions) => {
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');

    if (incomeExpenseChart) incomeExpenseChart.destroy();

    // Get last 6 months
    const now = new Date();
    const months = [];
    const incomeData = [];
    const expenseData = [];

    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        months.push(MONTHS_ES[d.getMonth()].substring(0, 3));

        const monthIncome = transactions
            .filter(t => t.type === 'ingreso' && t.date.startsWith(monthKey))
            .reduce((sum, t) => sum + t.amount, 0);
        const monthExpense = transactions
            .filter(t => t.type === 'gasto' && t.date.startsWith(monthKey))
            .reduce((sum, t) => sum + t.amount, 0);

        incomeData.push(monthIncome);
        expenseData.push(monthExpense);
    }

    incomeExpenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Ingresos',
                    data: incomeData,
                    backgroundColor: 'rgba(0, 201, 167, 0.8)',
                    borderColor: '#00C9A7',
                    borderWidth: 2,
                    borderRadius: 6,
                    barPercentage: 0.6,
                },
                {
                    label: 'Gastos',
                    data: expenseData,
                    backgroundColor: 'rgba(255, 107, 107, 0.8)',
                    borderColor: '#FF6B6B',
                    borderWidth: 2,
                    borderRadius: 6,
                    barPercentage: 0.6,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { usePointStyle: true, padding: 20, font: { family: 'Inter', size: 12 } }
                },
                tooltip: {
                    backgroundColor: '#1E1E2F',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        callback: (v) => formatCurrency(v)
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 11 } }
                }
            }
        }
    });
};

const renderCategoryChart = (transactions) => {
    const ctx = document.getElementById('categoryChart').getContext('2d');

    if (categoryChart) categoryChart.destroy();

    const expenses = transactions.filter(t => t.type === 'gasto');
    const categoryTotals = {};
    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (labels.length === 0) {
        labels.push('Sin datos');
        data.push(1);
    }

    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: CATEGORY_COLORS.slice(0, labels.length),
                borderWidth: 3,
                borderColor: '#FFFFFF',
                hoverBorderWidth: 0,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { usePointStyle: true, padding: 16, font: { family: 'Inter', size: 11 } }
                },
                tooltip: {
                    backgroundColor: '#1E1E2F',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((ctx.raw / total) * 100).toFixed(1);
                            return `${ctx.label}: ${formatCurrency(ctx.raw)} (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
};

const renderDashboardGoals = (goals) => {
    const container = document.getElementById('dashboardGoals');

    if (goals.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-bullseye"></i><p>No hay objetivos aún</p></div>`;
        return;
    }

    const topGoals = goals.slice(0, 4);
    container.innerHTML = topGoals.map(g => {
        const pct = g.targetAmount > 0 ? Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100)) : 0;
        return `
            <div class="mini-goal-item">
                <div class="mini-goal-info">
                    <h5>${g.name}</h5>
                    <div class="progress-bar"><div class="progress-fill ${pct >= 100 ? 'completed' : ''}" style="width: ${pct}%"></div></div>
                    <span style="font-size: 0.78rem; color: var(--text-light)">${formatCurrency(g.currentAmount)} / ${formatCurrency(g.targetAmount)}</span>
                </div>
                <span class="mini-goal-percent">${pct}%</span>
            </div>`;
    }).join('');
};

const renderRecentTransactions = (transactions) => {
    const container = document.getElementById('recentTransactions');
    const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
    const recent = sorted.slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-receipt"></i><p>No hay transacciones aún</p></div>`;
        return;
    }

    container.innerHTML = recent.map(t => {
        const isIncome = t.type === 'ingreso';
        return `
            <div class="mini-transaction-item">
                <div class="mini-transaction-left">
                    <div class="mini-transaction-icon ${isIncome ? 'income-icon' : 'expense-icon'}">
                        <i class="fas ${isIncome ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
                    </div>
                    <div class="mini-transaction-info">
                        <h5>${t.description}</h5>
                        <span>${t.category} · ${formatDateShort(t.date)}</span>
                    </div>
                </div>
                <span class="mini-transaction-amount ${isIncome ? 'amount-income' : 'amount-expense'}">
                    ${isIncome ? '+' : '-'}${formatCurrency(t.amount)}
                </span>
            </div>`;
    }).join('');
};

// ============ TRANSACTIONS PAGE ============
const renderTransactions = () => {
    const transactions = getData(STORAGE_KEYS.transactions);
    const filterType = document.getElementById('filterType').value;
    const filterMonth = document.getElementById('filterMonth').value;

    // Populate month filter
    populateMonthFilter(transactions);

    // Apply filters
    let filtered = [...transactions];
    if (filterType !== 'todos') {
        filtered = filtered.filter(t => t.type === filterType);
    }
    if (filterMonth !== 'todos') {
        filtered = filtered.filter(t => t.date.startsWith(filterMonth));
    }

    // Sort by date desc
    filtered.sort((a, b) => b.date.localeCompare(a.date));

    // Update filtered totals
    const fIncome = filtered.filter(t => t.type === 'ingreso').reduce((s, t) => s + t.amount, 0);
    const fExpense = filtered.filter(t => t.type === 'gasto').reduce((s, t) => s + t.amount, 0);
    document.getElementById('filteredIncome').textContent = formatCurrency(fIncome);
    document.getElementById('filteredExpense').textContent = formatCurrency(fExpense);
    document.getElementById('filteredBalance').textContent = formatCurrency(fIncome - fExpense);

    // Render table
    const tbody = document.getElementById('transactionsTableBody');
    const emptyState = document.getElementById('transactionsEmpty');
    const tableContainer = tbody.closest('.table-container');

    if (filtered.length === 0) {
        tableContainer.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        tableContainer.style.display = 'block';
        emptyState.style.display = 'none';

        tbody.innerHTML = filtered.map(t => {
            const isIncome = t.type === 'ingreso';
            return `
                <tr>
                    <td>${formatDate(t.date)}</td>
                    <td><span class="badge ${isIncome ? 'badge-income' : 'badge-expense'}">${isIncome ? 'Ingreso' : 'Gasto'}</span></td>
                    <td>${t.category}</td>
                    <td>${t.description}</td>
                    <td class="${isIncome ? 'amount-income' : 'amount-expense'}">${isIncome ? '+' : '-'}${formatCurrency(t.amount)}</td>
                    <td>
                        <button class="btn-icon btn-danger" onclick="deleteTransaction('${t.id}')" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
        }).join('');
    }
};

const populateMonthFilter = (transactions) => {
    const select = document.getElementById('filterMonth');
    const currentValue = select.value;

    const months = new Set();
    transactions.forEach(t => {
        months.add(t.date.substring(0, 7));
    });

    const sorted = [...months].sort().reverse();
    const options = ['<option value="todos">Todos</option>'];
    sorted.forEach(m => {
        const [y, mo] = m.split('-');
        options.push(`<option value="${m}">${MONTHS_ES[parseInt(mo) - 1]} ${y}</option>`);
    });

    select.innerHTML = options.join('');
    if (currentValue && sorted.includes(currentValue)) {
        select.value = currentValue;
    }
};

const saveTransaction = (e) => {
    e.preventDefault();
    const transactions = getData(STORAGE_KEYS.transactions);
    const id = document.getElementById('transactionId').value;

    const transaction = {
        id: id || generateId(),
        type: document.getElementById('transactionType').value,
        category: document.getElementById('transactionCategory').value,
        description: document.getElementById('transactionDescription').value,
        amount: parseFloat(document.getElementById('transactionAmount').value),
        date: document.getElementById('transactionDate').value
    };

    if (id) {
        const idx = transactions.findIndex(t => t.id === id);
        if (idx !== -1) transactions[idx] = transaction;
        showToast('Transacción actualizada', 'success');
    } else {
        transactions.push(transaction);
        showToast('Transacción agregada', 'success');
    }

    setData(STORAGE_KEYS.transactions, transactions);
    closeModal('transactionModal');
    document.getElementById('transactionForm').reset();
    document.getElementById('transactionId').value = '';
    renderTransactions();
};

const deleteTransaction = (id) => {
    if (!confirm('¿Estás seguro de eliminar esta transacción?')) return;
    let transactions = getData(STORAGE_KEYS.transactions);
    transactions = transactions.filter(t => t.id !== id);
    setData(STORAGE_KEYS.transactions, transactions);
    showToast('Transacción eliminada', 'error');
    renderTransactions();
};

// ============ GOALS PAGE ============
const renderGoals = () => {
    const goals = getData(STORAGE_KEYS.goals);
    const container = document.getElementById('goalsContainer');
    const emptyState = document.getElementById('goalsEmpty');

    // Update stats
    const totalSaved = goals.reduce((s, g) => s + g.currentAmount, 0);
    const activeCount = goals.filter(g => g.currentAmount < g.targetAmount).length;
    const completedCount = goals.filter(g => g.currentAmount >= g.targetAmount).length;

    document.getElementById('goalsTotalSaved').textContent = formatCurrency(totalSaved);
    document.getElementById('goalsActiveCount').textContent = activeCount;
    document.getElementById('goalsCompletedCount').textContent = completedCount;

    if (goals.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        container.querySelectorAll('.goal-card').forEach(c => c.remove());
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = goals.map(g => {
        const pct = g.targetAmount > 0 ? Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100)) : 0;
        const daysLeft = getDaysRemaining(g.deadline);
        const isCompleted = g.currentAmount >= g.targetAmount;
        const isOverdue = daysLeft < 0 && !isCompleted;

        let statusBadge = '<span class="badge badge-progress">En Progreso</span>';
        if (isCompleted) statusBadge = '<span class="badge badge-completed">✓ Completado</span>';
        else if (isOverdue) statusBadge = '<span class="badge badge-overdue">Vencido</span>';

        let daysText = `${Math.abs(daysLeft)} días restantes`;
        if (daysLeft < 0) daysText = `Venció hace ${Math.abs(daysLeft)} días`;
        if (daysLeft === 0) daysText = 'Vence hoy';
        if (isCompleted) daysText = '¡Meta alcanzada!';

        return `
            <div class="goal-card">
                <div class="goal-card-header">
                    <h4>${g.name}</h4>
                    <div class="goal-card-actions">
                        <button class="btn-icon btn-primary" onclick="editGoal('${g.id}')" title="Editar">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn-icon btn-danger" onclick="deleteGoal('${g.id}')" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${g.description ? `<p class="goal-description">${g.description}</p>` : ''}
                <div class="goal-amounts">
                    <span class="goal-current">${formatCurrency(g.currentAmount)}</span>
                    <span class="goal-target">de ${formatCurrency(g.targetAmount)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${isCompleted ? 'completed' : ''}" style="width: ${pct}%"></div>
                </div>
                <div class="goal-footer">
                    <span>${daysText}</span>
                    ${statusBadge}
                </div>
                ${!isCompleted ? `
                <div class="goal-add-funds">
                    <input type="number" placeholder="Agregar monto..." min="0" step="0.01" id="addFunds_${g.id}">
                    <button class="btn btn-success btn-sm" onclick="addFundsToGoal('${g.id}')">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>` : ''}
            </div>`;
    }).join('');
};

const saveGoal = (e) => {
    e.preventDefault();
    const goals = getData(STORAGE_KEYS.goals);
    const id = document.getElementById('goalId').value;

    const goal = {
        id: id || generateId(),
        name: document.getElementById('goalName').value,
        targetAmount: parseFloat(document.getElementById('goalTarget').value),
        currentAmount: parseFloat(document.getElementById('goalCurrent').value) || 0,
        deadline: document.getElementById('goalDeadline').value,
        description: document.getElementById('goalDescription').value,
        createdAt: id ? goals.find(g => g.id === id)?.createdAt || getTodayStr() : getTodayStr()
    };

    if (id) {
        const idx = goals.findIndex(g => g.id === id);
        if (idx !== -1) goals[idx] = goal;
        showToast('Objetivo actualizado', 'success');
    } else {
        goals.push(goal);
        showToast('Objetivo creado', 'success');
    }

    setData(STORAGE_KEYS.goals, goals);
    closeModal('goalModal');
    document.getElementById('goalForm').reset();
    document.getElementById('goalId').value = '';
    renderGoals();
};

const editGoal = (id) => {
    const goals = getData(STORAGE_KEYS.goals);
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    document.getElementById('goalModalTitle').textContent = 'Editar Objetivo';
    document.getElementById('goalId').value = goal.id;
    document.getElementById('goalName').value = goal.name;
    document.getElementById('goalTarget').value = goal.targetAmount;
    document.getElementById('goalCurrent').value = goal.currentAmount;
    document.getElementById('goalDeadline').value = goal.deadline;
    document.getElementById('goalDescription').value = goal.description || '';

    openModal('goalModal');
};

const deleteGoal = (id) => {
    if (!confirm('¿Estás seguro de eliminar este objetivo?')) return;
    let goals = getData(STORAGE_KEYS.goals);
    goals = goals.filter(g => g.id !== id);
    setData(STORAGE_KEYS.goals, goals);
    showToast('Objetivo eliminado', 'error');
    renderGoals();
};

const addFundsToGoal = (id) => {
    const input = document.getElementById(`addFunds_${id}`);
    const amount = parseFloat(input.value);
    if (!amount || amount <= 0) {
        showToast('Ingresa un monto válido', 'error');
        return;
    }

    const goals = getData(STORAGE_KEYS.goals);
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    goal.currentAmount += amount;
    setData(STORAGE_KEYS.goals, goals);

    if (goal.currentAmount >= goal.targetAmount) {
        showToast(`🎉 ¡Felicidades! Alcanzaste tu objetivo "${goal.name}"`, 'success');
    } else {
        showToast(`Se agregaron ${formatCurrency(amount)} al objetivo`, 'success');
    }

    renderGoals();
};

// ============ Sample Data ============
const seedSampleData = () => {
    const existing = getData(STORAGE_KEYS.transactions);
    if (existing.length > 0) return; // Don't seed if data exists

    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();

    const transactions = [
        // Current month
        { id: generateId(), type: 'ingreso', category: 'Salario', description: 'Salario mensual', amount: 3500000, date: `${y}-${String(m + 1).padStart(2, '0')}-01` },
        { id: generateId(), type: 'gasto', category: 'Vivienda', description: 'Arriendo apartamento', amount: 1200000, date: `${y}-${String(m + 1).padStart(2, '0')}-02` },
        { id: generateId(), type: 'gasto', category: 'Alimentación', description: 'Mercado semanal', amount: 350000, date: `${y}-${String(m + 1).padStart(2, '0')}-05` },
        { id: generateId(), type: 'gasto', category: 'Transporte', description: 'Gasolina', amount: 180000, date: `${y}-${String(m + 1).padStart(2, '0')}-07` },
        { id: generateId(), type: 'gasto', category: 'Entretenimiento', description: 'Netflix y Spotify', amount: 45000, date: `${y}-${String(m + 1).padStart(2, '0')}-10` },
        { id: generateId(), type: 'gasto', category: 'Salud', description: 'Gimnasio mensual', amount: 120000, date: `${y}-${String(m + 1).padStart(2, '0')}-03` },
        { id: generateId(), type: 'ingreso', category: 'Freelance', description: 'Proyecto web', amount: 800000, date: `${y}-${String(m + 1).padStart(2, '0')}-15` },
        { id: generateId(), type: 'gasto', category: 'Servicios', description: 'Internet y celular', amount: 95000, date: `${y}-${String(m + 1).padStart(2, '0')}-08` },

        // Previous month
        { id: generateId(), type: 'ingreso', category: 'Salario', description: 'Salario mensual', amount: 3500000, date: `${y}-${String(m).padStart(2, '0') || '12'}-01` },
        { id: generateId(), type: 'gasto', category: 'Vivienda', description: 'Arriendo apartamento', amount: 1200000, date: `${y}-${String(m).padStart(2, '0') || '12'}-02` },
        { id: generateId(), type: 'gasto', category: 'Alimentación', description: 'Mercado quincenal', amount: 420000, date: `${y}-${String(m).padStart(2, '0') || '12'}-04` },
        { id: generateId(), type: 'gasto', category: 'Ropa', description: 'Ropa nueva', amount: 250000, date: `${y}-${String(m).padStart(2, '0') || '12'}-12` },
        { id: generateId(), type: 'gasto', category: 'Educación', description: 'Curso online', amount: 150000, date: `${y}-${String(m).padStart(2, '0') || '12'}-18` },

        // 2 months ago
        { id: generateId(), type: 'ingreso', category: 'Salario', description: 'Salario mensual', amount: 3500000, date: `${y}-${String(m - 1 > 0 ? m - 1 : 12).padStart(2, '0')}-01` },
        { id: generateId(), type: 'gasto', category: 'Vivienda', description: 'Arriendo apartamento', amount: 1200000, date: `${y}-${String(m - 1 > 0 ? m - 1 : 12).padStart(2, '0')}-02` },
        { id: generateId(), type: 'gasto', category: 'Alimentación', description: 'Supermercado', amount: 380000, date: `${y}-${String(m - 1 > 0 ? m - 1 : 12).padStart(2, '0')}-06` },
        { id: generateId(), type: 'ingreso', category: 'Inversiones', description: 'Dividendos', amount: 200000, date: `${y}-${String(m - 1 > 0 ? m - 1 : 12).padStart(2, '0')}-20` },
        { id: generateId(), type: 'gasto', category: 'Entretenimiento', description: 'Cena restaurante', amount: 120000, date: `${y}-${String(m - 1 > 0 ? m - 1 : 12).padStart(2, '0')}-14` },

        // 3 months ago
        { id: generateId(), type: 'ingreso', category: 'Salario', description: 'Salario mensual', amount: 3200000, date: `${y}-${String(m - 2 > 0 ? m - 2 : 12).padStart(2, '0')}-01` },
        { id: generateId(), type: 'gasto', category: 'Vivienda', description: 'Arriendo', amount: 1200000, date: `${y}-${String(m - 2 > 0 ? m - 2 : 12).padStart(2, '0')}-02` },
        { id: generateId(), type: 'gasto', category: 'Transporte', description: 'Mantenimiento carro', amount: 450000, date: `${y}-${String(m - 2 > 0 ? m - 2 : 12).padStart(2, '0')}-10` },

        // 4 months ago
        { id: generateId(), type: 'ingreso', category: 'Salario', description: 'Salario mensual', amount: 3200000, date: `${y}-${String(m - 3 > 0 ? m - 3 : 12).padStart(2, '0')}-01` },
        { id: generateId(), type: 'gasto', category: 'Alimentación', description: 'Mercado del mes', amount: 400000, date: `${y}-${String(m - 3 > 0 ? m - 3 : 12).padStart(2, '0')}-05` },
        { id: generateId(), type: 'gasto', category: 'Salud', description: 'Consulta médica', amount: 180000, date: `${y}-${String(m - 3 > 0 ? m - 3 : 12).padStart(2, '0')}-15` },

        // 5 months ago
        { id: generateId(), type: 'ingreso', category: 'Salario', description: 'Salario mensual', amount: 3200000, date: `${y}-${String(m - 4 > 0 ? m - 4 : 12).padStart(2, '0')}-01` },
        { id: generateId(), type: 'gasto', category: 'Vivienda', description: 'Arriendo', amount: 1100000, date: `${y}-${String(m - 4 > 0 ? m - 4 : 12).padStart(2, '0')}-02` },
        { id: generateId(), type: 'gasto', category: 'Otros', description: 'Regalos', amount: 200000, date: `${y}-${String(m - 4 > 0 ? m - 4 : 12).padStart(2, '0')}-20` },
    ];

    const goals = [
        {
            id: generateId(),
            name: 'Vacaciones en la playa',
            targetAmount: 3000000,
            currentAmount: 1800000,
            deadline: `${y + 1}-01-15`,
            description: 'Viaje familiar a Santa Marta en enero',
            createdAt: getTodayStr()
        },
        {
            id: generateId(),
            name: 'Fondo de emergencia',
            targetAmount: 10000000,
            currentAmount: 4500000,
            deadline: `${y + 1}-06-30`,
            description: 'Tener 3 meses de gastos cubiertos',
            createdAt: getTodayStr()
        },
        {
            id: generateId(),
            name: 'Laptop nueva',
            targetAmount: 4000000,
            currentAmount: 3600000,
            deadline: `${y}-12-31`,
            description: 'MacBook Pro para trabajo y proyectos',
            createdAt: getTodayStr()
        }
    ];

    setData(STORAGE_KEYS.transactions, transactions);
    setData(STORAGE_KEYS.goals, goals);
};

// ============ Event Listeners ============
document.addEventListener('DOMContentLoaded', () => {
    // Seed sample data
    seedSampleData();

    // Navigation - Sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Navigation - Bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });

    // Transaction Modal
    document.getElementById('addTransactionBtn').addEventListener('click', () => {
        document.getElementById('transactionModalTitle').textContent = 'Nueva Transacción';
        document.getElementById('transactionForm').reset();
        document.getElementById('transactionId').value = '';
        document.getElementById('transactionDate').value = getTodayStr();
        updateCategories('gasto');
        openModal('transactionModal');
    });

    document.getElementById('addTransactionBtn2')?.addEventListener('click', () => {
        document.getElementById('addTransactionBtn').click();
    });

    document.getElementById('closeTransactionModal').addEventListener('click', () => closeModal('transactionModal'));
    document.getElementById('cancelTransaction').addEventListener('click', () => closeModal('transactionModal'));

    document.getElementById('transactionModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeModal('transactionModal');
    });

    // Transaction type change → update categories
    document.getElementById('transactionType').addEventListener('change', (e) => {
        updateCategories(e.target.value);
    });

    // Transaction form submit
    document.getElementById('transactionForm').addEventListener('submit', saveTransaction);

    // Goal Modal
    document.getElementById('addGoalBtn').addEventListener('click', () => {
        document.getElementById('goalModalTitle').textContent = 'Nuevo Objetivo';
        document.getElementById('goalForm').reset();
        document.getElementById('goalId').value = '';
        openModal('goalModal');
    });

    document.getElementById('addGoalBtn2')?.addEventListener('click', () => {
        document.getElementById('addGoalBtn').click();
    });

    document.getElementById('closeGoalModal').addEventListener('click', () => closeModal('goalModal'));
    document.getElementById('cancelGoal').addEventListener('click', () => closeModal('goalModal'));

    document.getElementById('goalModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeModal('goalModal');
    });

    // Goal form submit
    document.getElementById('goalForm').addEventListener('submit', saveGoal);

    // Filters
    document.getElementById('filterType').addEventListener('change', renderTransactions);
    document.getElementById('filterMonth').addEventListener('change', renderTransactions);

    // Initialize categories
    updateCategories('gasto');

    // Render dashboard
    renderDashboard();
});
