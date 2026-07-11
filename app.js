// App Orchestrator and Controller for Apex AI Productivity Tool
import { store } from './js/state.js';
import { AIHelper } from './js/ai-helper.js';
import {
  renderMatrix,
  renderScheduler,
  renderHabits,
  renderNotes,
  updateCoachSidebar,
  showToast
} from './js/components.js';

// Timer countdown interval reference
let timerInterval = null;

// Initialize App on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // 1. Sync store listeners
  store.subscribe((state) => {
    // Sync header API pill state
    updateAIPill(state);
    // Update profile footer
    updateProfileFooter(state);
  });

  // 2. Perform initial renders
  renderMatrix();
  renderScheduler();
  renderHabits();
  renderNotes();
  updateCoachSidebar();

  // Sync state variables to components
  updateAIPill(store.state);
  updateProfileFooter(store.state);

  // 3. Bind UI event listeners
  bindTabNavigation();
  bindBrainDumpConsole();
  bindTimerControls();
  bindAmbientSoundscape();
  bindHabitsCreation();
  bindScribblePad();
  bindSettingsModal();
  bindDrawerEvents();

  // Refresh coach manually
  document.getElementById('refresh-coach-btn').addEventListener('click', () => {
    updateCoachSidebar(true);
    showToast('Coach insights refreshed!');
  });
}

// Update AI Mode Status Indicators
function updateAIPill(state) {
  const pillPulse = document.getElementById('ai-status-indicator');
  const pillText = document.getElementById('ai-status-text');
  if (!pillPulse || !pillText) return;

  if (state.settings.apiKey) {
    pillPulse.style.backgroundColor = 'var(--accent-secondary)';
    pillPulse.style.boxShadow = '0 0 10px var(--accent-secondary)';
    pillText.textContent = 'Gemini Pro Active';
  } else {
    pillPulse.style.backgroundColor = 'var(--color-warning)';
    pillPulse.style.boxShadow = '0 0 10px var(--color-warning)';
    pillText.textContent = 'Simulated AI Mode';
  }
}

// Update sidebar user metadata details
function updateProfileFooter(state) {
  const nameLabel = document.getElementById('user-name-lbl');
  const personaLabel = document.getElementById('user-persona-lbl');
  const avatar = document.getElementById('user-avatar-lbl');

  if (nameLabel) nameLabel.textContent = state.settings.userName || 'Explorer';
  if (personaLabel) personaLabel.textContent = state.settings.userPersona || 'Professional';
  if (avatar) {
    const initials = (state.settings.userName || 'Explorer')
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
    avatar.textContent = initials;
  }
}

// Navigation Handler
function bindTabNavigation() {
  const tabs = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('.workspace-panel');
  const title = document.getElementById('workspace-title');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle button highlights
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.dataset.tab;
      title.textContent = tab.querySelector('span').textContent;

      // Toggle viewport visibility
      panels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Tab specific re-renders
      if (targetTab === 'matrix') renderMatrix();
      if (targetTab === 'timer') renderScheduler();
      if (targetTab === 'habits') renderHabits();
      if (targetTab === 'notes') renderNotes();
    });
  });
}

// Eisenhower Matrix Brain Dump Handler
function bindBrainDumpConsole() {
  const input = document.getElementById('brain-dump-input');
  const btn = document.getElementById('brain-dump-btn');

  const handleDump = async () => {
    const text = input.value.trim();
    if (!text) return;

    btn.disabled = true;
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span>AI Sorting...</span>`;

    try {
      const result = await AIHelper.analyzeBrainDump(text);
      
      // Add each parsed task to local store
      result.tasks.forEach(task => {
        store.addTask(task.title, task.urgency, task.impact, task.notes);
      });

      input.value = '';
      renderMatrix();
      updateCoachSidebar(true); // Update coach logs
      showToast(`Successfully analyzed & sorted ${result.tasks.length} tasks!`);
    } catch (e) {
      console.error(e);
      showToast('Error analyzing brain dump', 'danger');
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  };

  btn.addEventListener('click', handleDump);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleDump();
  });
}

// Focus Pomodoro Timer countdown controls
function bindTimerControls() {
  const playBtn = document.getElementById('timer-play-btn');
  const resetBtn = document.getElementById('timer-reset-btn');
  const skipBtn = document.getElementById('timer-skip-btn');

  playBtn.addEventListener('click', () => {
    const fs = store.state.focusSessions;
    if (fs.status === 'running') {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener('click', () => {
    const fs = store.state.focusSessions;
    pauseTimer();
    store.updateTimer(fs.duration * 60, 'idle');
    renderScheduler();
    showToast('Timer reset.');
  });

  skipBtn.addEventListener('click', () => {
    handleTimerCompletion(true);
  });

  // Preset Buttons (25m, 50m focus, 5m, 10m breaks)
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const duration = parseInt(btn.dataset.duration, 10);
      const type = btn.dataset.type;
      
      pauseTimer();
      store.setTimerDuration(duration, type);
      
      const label = document.getElementById('timer-status-lbl');
      if (label) label.textContent = type === 'focus' ? 'Ready to Focus' : 'Take a Break';
      
      renderScheduler();
    });
  });
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);

  store.state.focusSessions.status = 'running';
  store.save();

  const label = document.getElementById('timer-status-lbl');
  if (label) {
    label.textContent = store.state.focusSessions.type === 'focus' ? 'In the Flow Zone' : 'Rest and Recover';
  }

  timerInterval = setInterval(() => {
    const fs = store.state.focusSessions;
    if (fs.timeLeft > 0) {
      store.state.focusSessions.timeLeft--;
      store.save(); // Local storage tick
      renderScheduler();
    } else {
      handleTimerCompletion();
    }
  }, 1000);

  renderScheduler();
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  store.state.focusSessions.status = 'paused';
  store.save();

  const label = document.getElementById('timer-status-lbl');
  if (label) label.textContent = 'Session Paused';

  renderScheduler();
}

function handleTimerCompletion(skipped = false) {
  pauseTimer();
  playSyntheticAlertChime();

  const fs = store.state.focusSessions;
  const isFocus = fs.type === 'focus';

  if (isFocus && !skipped) {
    // Done focus session, log it
    store.incrementCompletedFocus();
    
    // Complete active task if linked
    if (fs.activeTaskId) {
      store.updateTask(fs.activeTaskId, { status: 'done' });
      store.state.focusSessions.activeTaskId = null; // Clear focus task
      store.save();
      renderMatrix();
    }
    
    showToast('Focus session complete! Take a break.');
    // Auto transition to short break preset
    store.setTimerDuration(5, 'break');
    const label = document.getElementById('timer-status-lbl');
    if (label) label.textContent = 'Take a Break';
  } else {
    showToast(isFocus ? 'Focus skipped.' : 'Break complete! Ready to lock in.');
    // Transition to focus preset
    store.setTimerDuration(25, 'focus');
    const label = document.getElementById('timer-status-lbl');
    if (label) label.textContent = 'Ready to Focus';
  }

  updateCoachSidebar(true);
  renderScheduler();
}

// Generate premium synth alert sound when Pomodoro completes
function playSyntheticAlertChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    
    // We synthesize a nice triple chime sequence: C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.15);
      
      gainNode.gain.setValueAtTime(0.12, now + index * 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.15 + 0.35);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now + index * 0.15);
      osc.stop(now + index * 0.15 + 0.4);
    });
  } catch (e) {
    console.error('Failed to play synthetic chime:', e);
  }
}

// HTML5 Ambient loops volume controls
function bindAmbientSoundscape() {
  const sliders = [
    { id: 'vol-lofi', audioId: 'audio-lofi' },
    { id: 'vol-rain', audioId: 'audio-rain' },
    { id: 'vol-cafe', audioId: 'audio-cafe' }
  ];

  sliders.forEach(s => {
    const input = document.getElementById(s.id);
    const audio = document.getElementById(s.audioId);
    if (!input || !audio) return;

    input.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      audio.volume = vol;
      
      if (vol > 0) {
        if (audio.paused) {
          audio.play().catch(err => {
            console.warn('Audio play request failed due to user-interaction restrictions:', err);
            // reset slider to 0 if blocked
            e.target.value = 0;
            audio.volume = 0;
            showToast('Click anywhere on the screen first to enable audio.', 'warning');
          });
        }
      } else {
        audio.pause();
      }
    });
  });
}

// Habits loops creator binding
function bindHabitsCreation() {
  const input = document.getElementById('habit-title-input');
  const btn = document.getElementById('create-habit-btn');

  const handleCreate = () => {
    const title = input.value.trim();
    if (title) {
      store.addHabit(title);
      input.value = '';
      renderHabits();
      updateCoachSidebar(true);
      showToast(`Created Habit: "${title}"`);
    }
  };

  btn.addEventListener('click', handleCreate);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCreate();
  });
}

// Scribble notebook text processing bindings
function bindScribblePad() {
  const textarea = document.getElementById('scribble-textarea');
  const extractBtn = document.getElementById('scribble-extract-btn');
  const clearBtn = document.getElementById('scribble-clear-btn');

  if (textarea) {
    textarea.addEventListener('input', (e) => {
      // Sync raw notes draft with storage
      store.updateScribble(e.target.value, store.state.scribble.summary, store.state.scribble.actionItems);
    });
  }

  extractBtn.addEventListener('click', async () => {
    const val = textarea.value.trim();
    if (!val) {
      showToast('Write something in the scribble pad first!', 'warning');
      return;
    }

    extractBtn.disabled = true;
    const origHtml = extractBtn.innerHTML;
    extractBtn.innerHTML = `<span>Extracting Actions...</span>`;

    try {
      const result = await AIHelper.extractNotes(val);
      store.updateScribble(val, result.summary, result.actionItems);
      renderNotes();
      showToast('AI Action extraction complete!');
    } catch (e) {
      console.error(e);
      showToast('Failed to process scribble notes.', 'danger');
    } finally {
      extractBtn.disabled = false;
      extractBtn.innerHTML = origHtml;
    }
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear your scribble drafts?')) {
      store.updateScribble('', '', []);
      if (textarea) textarea.value = '';
      renderNotes();
      showToast('Notes pad cleared.');
    }
  });
}

// Co-Pilot settings panel modal toggle logic
function bindSettingsModal() {
  const modal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('open-settings-btn');
  const closeBtn = document.getElementById('close-settings-btn');
  const saveBtn = document.getElementById('save-settings-btn');

  const nameInput = document.getElementById('settings-name');
  const personaSelect = document.getElementById('settings-persona');
  const keyInput = document.getElementById('settings-key');

  openBtn.addEventListener('click', () => {
    // Load current values
    nameInput.value = store.state.settings.userName;
    personaSelect.value = store.state.settings.userPersona;
    keyInput.value = store.state.settings.apiKey;

    modal.classList.add('active');
  });

  const closeModal = () => modal.classList.remove('active');
  closeBtn.addEventListener('click', closeModal);

  saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const persona = personaSelect.value;
    const key = keyInput.value.trim();

    store.saveSettings(key, name, persona);
    closeModal();
    showToast('Co-Pilot Settings saved!');
    updateCoachSidebar(true); // Redraw insights with new user persona details
  });

  // Close overlay on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Drawer overlays tasks inspector close handlers
function bindDrawerEvents() {
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('close-drawer-btn');

  const closeDrawer = () => {
    overlay.classList.remove('active');
  };

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDrawer();
  });
}
