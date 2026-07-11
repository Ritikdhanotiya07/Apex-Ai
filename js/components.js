// UI Components Render Engine for Apex AI Productivity Tool
import { store } from './state.js';
import { AIHelper } from './ai-helper.js';

// SVG Inline Icons for absolute performance and reliability
export const Icons = {
  trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`,
  reset: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  list: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  volume2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  activity: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
};

// Help map task lists into UI
export function renderMatrix() {
  const tasks = store.state.tasks;
  
  // Clear lists
  for (let q = 1; q <= 4; q++) {
    const listEl = document.getElementById(`q${q}-list`);
    if (listEl) listEl.innerHTML = '';
  }

  tasks.forEach(task => {
    const listEl = document.getElementById(`q${task.quadrant}-list`);
    if (!listEl) return;

    const subCompleted = task.subtasks.filter(s => s.completed).length;
    const subTotal = task.subtasks.length;
    const isCompleted = task.status === 'done';

    const card = document.createElement('div');
    card.className = `task-card ${isCompleted ? 'completed' : ''}`;
    card.dataset.taskId = task.id;

    // Build the subtask counter block if they exist
    let subtaskBadge = '';
    if (subTotal > 0) {
      subtaskBadge = `
        <div class="task-meta-item">
          ${Icons.list}
          <span>${subCompleted}/${subTotal}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="task-card-main">
        <div class="checkbox-custom" data-action="toggle-complete">
          ${Icons.check}
        </div>
        <div class="task-card-title">${escapeHTML(task.title)}</div>
        <button class="icon-btn" data-action="delete" style="width: 28px; height: 28px; border-radius: 6px; padding: 0; opacity: 0; pointer-events: none;" title="Delete Task">
          ${Icons.trash}
        </button>
      </div>
      <div class="task-meta">
        <div class="task-meta-item">
          ${Icons.clock}
          <span>${task.focusBlocksRequired} block${task.focusBlocksRequired !== 1 ? 's' : ''}</span>
        </div>
        ${subtaskBadge}
        <div class="task-meta-item" style="margin-left: auto;">
          <span>U: ${task.urgency} | I: ${task.impact}</span>
        </div>
      </div>
    `;

    // Make delete button hoverable/visible
    card.addEventListener('mouseenter', () => {
      const delBtn = card.querySelector('[data-action="delete"]');
      if (delBtn) {
        delBtn.style.opacity = '1';
        delBtn.style.pointerEvents = 'all';
      }
    });

    card.addEventListener('mouseleave', () => {
      const delBtn = card.querySelector('[data-action="delete"]');
      if (delBtn) {
        delBtn.style.opacity = '0';
        delBtn.style.pointerEvents = 'none';
      }
    });

    // Add click delegates
    card.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      const action = target ? target.dataset.action : null;

      if (action === 'toggle-complete') {
        e.stopPropagation();
        const newStatus = isCompleted ? 'todo' : 'done';
        store.updateTask(task.id, { status: newStatus });
      } else if (action === 'delete') {
        e.stopPropagation();
        if (confirm('Delete this task?')) {
          store.deleteTask(task.id);
        }
      } else {
        // Expand card details drawer
        openTaskDrawer(task);
      }
    });

    listEl.appendChild(card);
  });

  // Render empty states if no cards
  for (let q = 1; q <= 4; q++) {
    const listEl = document.getElementById(`q${q}-list`);
    if (listEl && listEl.children.length === 0) {
      listEl.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px; border: 1px dashed rgba(255,255,255,0.03); border-radius: var(--radius-md);">
          No tasks listed.
        </div>
      `;
    }
  }
}

// Draw Tasks detail drawer
function openTaskDrawer(task) {
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerBody = document.getElementById('drawer-body');
  if (!drawerOverlay || !drawerBody) return;

  // Track task ID on drawer
  drawerOverlay.dataset.taskId = task.id;

  // Render drawer UI
  drawerBody.innerHTML = `
    <div>
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Task Title</div>
      <h3 style="font-size: 18px; font-weight: 600; line-height: 1.4; color: var(--text-primary);">${escapeHTML(task.title)}</h3>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <div class="form-group">
        <label class="form-label">Urgency (1-10)</label>
        <input type="number" min="1" max="10" class="form-input" data-field="urgency" value="${task.urgency}">
      </div>
      <div class="form-group">
        <label class="form-label">Impact (1-10)</label>
        <input type="number" min="1" max="10" class="form-input" data-field="impact" value="${task.impact}">
      </div>
    </div>

    <div>
      <label class="form-label" style="display: block; margin-bottom: 8px;">Coaching Notes / Context</label>
      <p style="font-size: 13px; line-height: 1.5; color: var(--text-secondary); background: rgba(255,255,255,0.02); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">${escapeHTML(task.notes || 'No notes available.')}</p>
    </div>

    <div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <label class="form-label">AI Action Checklist</label>
        <button class="secondary-btn" id="ai-breakdown-btn" style="padding: 4px 10px; font-size: 11px; border-radius: 8px;">
          ${Icons.sparkles} Auto-Breakdown
        </button>
      </div>
      
      <div id="subtask-container" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
        ${task.subtasks.map(sub => `
          <div class="subtask-item ${sub.completed ? 'completed' : ''}" data-subtask-id="${sub.id}">
            <div class="checkbox-custom" data-action="toggle-subtask" style="width: 16px; height: 16px; border-radius: 3px;">
              ${Icons.check}
            </div>
            <span class="subtask-text" style="flex: 1;">${escapeHTML(sub.title)}</span>
            <button class="icon-btn" data-action="delete-subtask" style="width: 24px; height: 24px; border: none; padding: 0;">
              ${Icons.trash}
            </button>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 8px;">
        <input type="text" id="new-subtask-input" class="form-input" placeholder="Add custom action item..." style="flex: 1; padding: 8px 12px; font-size: 13px;">
        <button class="primary-btn" id="add-subtask-btn" style="padding: 8px 16px;">
          ${Icons.plus}
        </button>
      </div>
    </div>

    <div style="margin-top: auto; display: flex; gap: 12px;">
      <button class="primary-btn" id="focus-task-btn" style="flex: 1; justify-content: center; background: var(--gradient-brand);">
        ${Icons.clock} Load into Timer
      </button>
    </div>
  `;

  drawerOverlay.classList.add('active');

  // Bind Drawer-specific listeners
  const getTaskId = () => drawerOverlay.dataset.taskId;

  // Input changes for Urgency & Impact
  drawerBody.querySelectorAll('[data-field]').forEach(input => {
    input.addEventListener('change', (e) => {
      const field = e.target.dataset.field;
      const val = parseInt(e.target.value, 10);
      if (val >= 1 && val <= 10) {
        store.updateTask(getTaskId(), { [field]: val });
      } else {
        e.target.value = task[field]; // Revert
      }
    });
  });

  // Add subtask
  const addSubtaskInput = drawerBody.querySelector('#new-subtask-input');
  const addSubtaskBtn = drawerBody.querySelector('#add-subtask-btn');
  const handleAddSub = () => {
    const text = addSubtaskInput.value.trim();
    if (text) {
      store.addSubtask(getTaskId(), text);
      addSubtaskInput.value = '';
      openTaskDrawer(store.state.tasks.find(t => t.id === getTaskId())); // Re-render
    }
  };
  addSubtaskBtn.addEventListener('click', handleAddSub);
  addSubtaskInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAddSub(); });

  // Subtask click events (complete/delete)
  drawerBody.querySelector('#subtask-container').addEventListener('click', (e) => {
    const subtaskRow = e.target.closest('.subtask-item');
    if (!subtaskRow) return;
    const subId = subtaskRow.dataset.subtaskId;

    const toggleBtn = e.target.closest('[data-action="toggle-subtask"]');
    const deleteBtn = e.target.closest('[data-action="delete-subtask"]');

    if (toggleBtn) {
      store.toggleSubtask(getTaskId(), subId);
      openTaskDrawer(store.state.tasks.find(t => t.id === getTaskId()));
    } else if (deleteBtn) {
      store.deleteSubtask(getTaskId(), subId);
      openTaskDrawer(store.state.tasks.find(t => t.id === getTaskId()));
    }
  });

  // AI Breakdown button
  const aiBreakdownBtn = drawerBody.querySelector('#ai-breakdown-btn');
  aiBreakdownBtn.addEventListener('click', async () => {
    aiBreakdownBtn.disabled = true;
    aiBreakdownBtn.innerHTML = `${Icons.sparkles} Analyzing...`;
    
    try {
      const result = await AIHelper.breakDownTask(task.title);
      // Append suggested subtasks to task
      result.subtasks.forEach(subTitle => {
        store.addSubtask(task.id, subTitle);
      });
      // Optionally update coaching tips
      store.updateTask(task.id, { 
        notes: result.tips || task.notes,
        focusBlocksRequired: result.focusBlocks || task.focusBlocksRequired
      });

      // Reload drawer
      openTaskDrawer(store.state.tasks.find(t => t.id === task.id));
      showToast('AI Breakdown generated!');
    } catch (e) {
      console.error(e);
      showToast('Failed to generate breakdown', 'danger');
    } finally {
      aiBreakdownBtn.disabled = false;
      aiBreakdownBtn.innerHTML = `${Icons.sparkles} Auto-Breakdown`;
    }
  });

  // Focus Task Action
  drawerBody.querySelector('#focus-task-btn').addEventListener('click', () => {
    store.state.focusSessions.activeTaskId = task.id;
    store.save();
    drawerOverlay.classList.remove('active');
    
    // Switch navigation to Focus Timer
    const timerTab = document.querySelector('[data-tab="timer"]');
    if (timerTab) timerTab.click();
    showToast(`Loaded: "${task.title.substring(0, 30)}..."`);
  });
}

// Render Focus Scheduler
export function renderScheduler() {
  const fs = store.state.focusSessions;
  const activeTask = store.state.tasks.find(t => t.id === fs.activeTaskId);

  // Set digits
  const min = Math.floor(fs.timeLeft / 60);
  const sec = fs.timeLeft % 60;
  const digitEl = document.getElementById('timer-digits');
  if (digitEl) {
    digitEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  // Handle active task label
  const taskLbl = document.getElementById('timer-active-task');
  if (taskLbl) {
    if (activeTask) {
      taskLbl.innerHTML = `
        <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-secondary); font-weight:600; margin-bottom:4px;">Currently Focusing On</div>
        <div style="font-size: 15px; font-weight:500;">${escapeHTML(activeTask.title)}</div>
      `;
    } else {
      taskLbl.innerHTML = `
        <div style="color: var(--text-muted); font-style: italic; font-size:14px;">Select a task from the matrix to start focusing</div>
      `;
    }
  }

  // Adjust circular SVG Progress
  const progressCircle = document.getElementById('timer-progress');
  if (progressCircle) {
    const totalSeconds = fs.duration * 60;
    const progress = totalSeconds > 0 ? (totalSeconds - fs.timeLeft) / totalSeconds : 0;
    const maxOffset = 816.8; // 2 * PI * 130
    const strokeOffset = maxOffset - (progress * maxOffset);
    progressCircle.style.strokeDashoffset = strokeOffset;

    // Adjust color based on state (timer type)
    if (fs.type === 'break') {
      progressCircle.style.stroke = 'var(--color-success)';
    } else {
      progressCircle.style.stroke = 'var(--accent-secondary)';
    }
  }

  // Adjust play/pause button icon
  const playBtn = document.getElementById('timer-play-btn');
  if (playBtn) {
    if (fs.status === 'running') {
      playBtn.innerHTML = Icons.pause;
      playBtn.title = 'Pause Session';
    } else {
      playBtn.innerHTML = Icons.play;
      playBtn.title = 'Start Session';
    }
  }

  // Update active preset button highlight
  document.querySelectorAll('.preset-btn').forEach(btn => {
    const duration = parseInt(btn.dataset.duration, 10);
    const type = btn.dataset.type;
    if (fs.duration === duration && fs.type === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Render Habits Loops (GitHub-like contributions & 7-day checklists)
export function renderHabits() {
  const habits = store.state.habits;
  const listContainer = document.getElementById('habits-list-container');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  const getPast7Days = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0,0,0,0);
      days.push({
        date: d,
        dayStr: formatDate(d),
        label: weekdays[d.getDay()],
        isToday: i === 0
      });
    }
    return days;
  };

  const last7Days = getPast7Days();

  habits.forEach(habit => {
    const card = document.createElement('div');
    card.className = 'glass-panel habit-card';
    card.dataset.habitId = habit.id;

    card.innerHTML = `
      <div class="habit-card-header">
        <h3 class="habit-title">${escapeHTML(habit.title)}</h3>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="habit-streak" title="Streak Multiplier: ${habit.multiplier}x">
            ${Icons.flame}
            <span>${habit.streak} day${habit.streak !== 1 ? 's' : ''} (${habit.multiplier}x)</span>
          </div>
          <button class="icon-btn" data-action="delete-habit" style="width: 28px; height: 28px; border:none; padding:0;" title="Delete Habit">
            ${Icons.trash}
          </button>
        </div>
      </div>
      <div class="habit-week-bar">
        ${last7Days.map(day => {
          const isCompleted = habit.logs.includes(day.dayStr);
          return `
            <div class="habit-day">
              <span class="habit-day-lbl" style="${day.isToday ? 'color: var(--accent-secondary); font-weight:700;' : ''}">${day.label}</span>
              <div class="habit-checkbox ${isCompleted ? 'completed' : ''}" data-day-str="${day.dayStr}">
                ${Icons.check}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Habit card click delegates
    card.addEventListener('click', (e) => {
      const checkbox = e.target.closest('.habit-checkbox');
      const delBtn = e.target.closest('[data-action="delete-habit"]');

      if (checkbox) {
        const dayStr = checkbox.dataset.dayStr;
        store.toggleHabitDate(habit.id, dayStr);
        renderHabits();
        updateCoachSidebar(); // Redraw coach insights
      } else if (delBtn) {
        if (confirm(`Delete habit "${habit.title}"?`)) {
          store.deleteHabit(habit.id);
          renderHabits();
          updateCoachSidebar();
        }
      }
    });

    listContainer.appendChild(card);
  });

  if (habits.length === 0) {
    listContainer.innerHTML = `
      <div class="glass-panel" style="padding: 40px; text-align: center; color: var(--text-muted); font-size:14px; grid-column: 1 / -1;">
        No habits configured yet. Create one below to begin trackers.
      </div>
    `;
  }
}

// Render Scribble Pads
export function renderNotes() {
  const scribble = store.state.scribble;
  const textarea = document.getElementById('scribble-textarea');
  if (textarea && !textarea.matches(':focus')) {
    textarea.value = scribble.rawText;
  }

  const outputPane = document.getElementById('scribble-ai-output');
  if (!outputPane) return;

  if (!scribble.summary && scribble.actionItems.length === 0) {
    outputPane.innerHTML = `
      <div class="ai-empty-state">
        ${Icons.sparkles}
        <div>
          <h4 style="color: var(--text-primary); margin-bottom: 6px;">AI Scribble Processor</h4>
          <p style="font-size: 13px; max-width:280px; margin: 0 auto;">Write messy meeting logs, brain drafts, or inbox dumps on the left and click "Extract Action Items" to process them.</p>
        </div>
      </div>
    `;
  } else {
    outputPane.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-secondary); font-weight:600; margin-bottom:8px;">Executive Summary</div>
        <p style="font-size: 13px; line-height: 1.6; color: var(--text-secondary); background: rgba(255,255,255,0.01); border: 1px solid var(--border-light); padding:14px; border-radius: var(--radius-md);">${escapeHTML(scribble.summary)}</p>
      </div>

      <div>
        <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-primary); font-weight:600; margin-bottom:12px;">Extracted Action Items</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${scribble.actionItems.map((item, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); padding:10px 14px; border-radius: var(--radius-md); gap: 12px;">
              <span style="font-size: 13px; color: var(--text-primary); line-height: 1.4;">${escapeHTML(item)}</span>
              <button class="secondary-btn" data-action="import-task" data-item-text="${escapeHTML(item)}" style="padding: 4px 10px; font-size: 11px; border-radius: 6px; flex-shrink:0;">
                ${Icons.plus} Add Task
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind tasks imports
    outputPane.querySelectorAll('[data-action="import-task"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.dataset.itemText;
        store.addTask(text, 5, 5, 'Extracted from AI Scribble notes.');
        showToast('Imported task to Eisenhower Matrix!');
        
        // Disable button to prevent double imports
        e.currentTarget.disabled = true;
        e.currentTarget.innerHTML = `${Icons.check} Imported`;
        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)';
        e.currentTarget.style.color = 'var(--color-success)';
        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        
        // Redraw matrix
        renderMatrix();
      });
    });
  }
}

// Render AI Coach Sidebar Insights & Stats
export async function updateCoachSidebar(forceRefresh = false) {
  const coachBody = document.getElementById('coach-insights-container');
  if (!coachBody) return;

  // Render stats block
  const totalTasks = store.state.tasks.length;
  const completedTasks = store.state.tasks.filter(t => t.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const focusLogged = store.state.focusSessions.completedCount;

  const statGrid = document.getElementById('coach-stats-grid');
  if (statGrid) {
    statGrid.innerHTML = `
      <div class="summary-stat-card">
        <div class="stat-val">${completedTasks}/${totalTasks}</div>
        <div class="stat-lbl">Tasks Done</div>
      </div>
      <div class="summary-stat-card">
        <div class="stat-val">${completionRate}%</div>
        <div class="stat-lbl">Efficiency</div>
      </div>
      <div class="summary-stat-card">
        <div class="stat-val">${focusLogged}</div>
        <div class="stat-lbl">Focus Blocks</div>
      </div>
      <div class="summary-stat-card">
        <div class="stat-val">${store.state.habits.filter(h => h.streak > 0).length}</div>
        <div class="stat-lbl">Active Streaks</div>
      </div>
    `;
  }

  // Draw Insights
  // Check if we already have insights cached or if we need to regenerate
  // To avoid spamming Gemini requests, we generate once per workspace reload unless forced
  if (forceRefresh || !coachBody.dataset.loaded) {
    coachBody.innerHTML = `
      <div style="color: var(--text-muted); font-size:12px; display:flex; align-items:center; gap:8px;">
        <span class="ai-status-pulse" style="width:6px; height:6px; background-color: var(--accent-primary); box-shadow:0 0 6px var(--accent-primary);"></span>
        <span>Coach analyzing workspace...</span>
      </div>
    `;
    
    try {
      const result = await AIHelper.getCoachInsights(
        store.state.tasks,
        store.state.habits,
        store.state.focusSessions.completedCount
      );

      coachBody.innerHTML = result.insights.map(ins => `
        <div class="coach-insight-box ${ins.type === 'cyan' ? 'accent-cyan' : ''}">
          <div class="insight-header" style="color: var(--accent-${ins.type === 'cyan' ? 'secondary' : 'primary'});">
            ${Icons.sparkles}
            <span>${escapeHTML(ins.title)}</span>
          </div>
          <div class="insight-body">${escapeHTML(ins.body)}</div>
        </div>
      `).join('');
      coachBody.dataset.loaded = 'true';
    } catch (e) {
      console.error(e);
      coachBody.innerHTML = `
        <div style="font-size:12px; color: var(--color-danger); display:flex; align-items:center; gap:6px;">
          ${Icons.alertCircle}
          <span>Failed to load coach tips.</span>
        </div>
      `;
    }
  }
}

// Global Toast Alerts
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  if (type === 'danger') {
    toast.style.borderLeftColor = 'var(--color-danger)';
  } else if (type === 'warning') {
    toast.style.borderLeftColor = 'var(--color-warning)';
  } else {
    toast.style.borderLeftColor = 'var(--accent-secondary)';
  }

  toast.innerHTML = `
    <span style="display:flex; align-items:center;">
      ${type === 'danger' ? Icons.alertCircle : Icons.sparkles}
    </span>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Utility Helpers
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
