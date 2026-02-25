// Sound Effects for Democratic Republic of Pigeonaria Website

// Sound manager
const SoundManager = {
    sound: null,
    enabled: true,
    volume: 0.5,
    
    // Initialize sound system
    init: function() {
        // Check if sounds are enabled in settings
        const soundsEnabled = localStorage.getItem('soundsEnabled');
        if (soundsEnabled !== null) {
            this.enabled = soundsEnabled === 'true';
        }
        
        // Load volume setting
        const savedVolume = localStorage.getItem('soundVolume');
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }
        
        // Preload sound
        this.preloadSound();
        
        // Add sound controls to settings panel
        this.addSoundControls();
        
        // Attach sound events
        this.attachSoundEvents();
    },
    
    // Preload sound file
    preloadSound: function() {
        this.sound = new Audio('sounds/clickar.mp3');
        this.sound.volume = this.volume;
        
        // Handle loading errors silently
        this.sound.addEventListener('error', function() {
            console.log('Sound file not found: sounds/clickar.mp3');
        });
    },
    
    // Play the sound
    play: function() {
        if (!this.enabled || !this.sound) return;
        
        this.sound.currentTime = 0; // Reset to start
        this.sound.volume = this.volume;
        this.sound.play().catch(function(error) {
            // Ignore autoplay errors
            console.log('Sound play prevented:', error);
        });
    },
    
    // Toggle sounds on/off
    toggle: function() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundsEnabled', this.enabled);
        this.updateSoundButton();
    },
    
    // Set volume
    setVolume: function(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('soundVolume', this.volume);
        
        // Update sound volume
        if (this.sound) {
            this.sound.volume = this.volume;
        }
    },
    
    // Add sound controls to settings panel
    addSoundControls: function() {
        const settingsPanel = document.getElementById('settingsPanel');
        if (!settingsPanel) return;
        
        // Create sound toggle button
        const soundToggle = document.createElement('button');
        soundToggle.id = 'soundToggle';
        soundToggle.onclick = function() {
            SoundManager.toggle();
        };
        this.updateSoundButton();
        
        // Create volume slider
        const volumeContainer = document.createElement('div');
        volumeContainer.style.cssText = 'margin-top: 10px; padding: 10px 0;';
        volumeContainer.innerHTML = `
            <label style="display: block; margin-bottom: 5px; font-size: 0.9em;">Volume</label>
            <input type="range" id="volumeSlider" min="0" max="100" value="${this.volume * 100}" 
                   style="width: 100%;" onchange="SoundManager.setVolume(this.value / 100)">
        `;
        
        // Add to settings panel
        settingsPanel.appendChild(soundToggle);
        settingsPanel.appendChild(volumeContainer);
    },
    
    // Update sound button text
    updateSoundButton: function() {
        const button = document.getElementById('soundToggle');
        if (button) {
            button.textContent = this.enabled ? '🔊 Sounds On' : '🔇 Sounds Off';
        }
    },
    
    // Attach sound events to clickable elements only
    attachSoundEvents: function() {
        document.addEventListener('click', function(e) {
            const target = e.target;
            
            // Only play sound for clickable elements
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('.card') ||
                target.closest('.ministry-card') ||
                target.closest('.party-card') ||
                target.closest('.organization-card') ||
                target.closest('.news-item') ||
                target.closest('.search-result-item')
            ) {
                SoundManager.play();
            }
        });
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    SoundManager.init();
});
