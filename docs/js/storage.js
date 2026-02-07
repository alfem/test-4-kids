const StorageManager = {
    getKey: () => 'kids_learning_app_v1',

    getData() {
        const data = localStorage.getItem(this.getKey());
        return data ? JSON.parse(data) : { totalStars: 0, completedLessons: [] };
    },

    saveData(data) {
        localStorage.setItem(this.getKey(), JSON.stringify(data));
        this.updateUI();
    },

    saveName(name) {
        const data = this.getData();
        data.userName = name;
        this.saveData(data);
    },

    getName() {
        return this.getData().userName || null;
    },

    addStars(count) {
        const data = this.getData();
        data.totalStars += count;
        this.saveData(data);
    },

    getTotalStars() {
        return this.getData().totalStars;
    },

    updateUI() {
        const el = document.getElementById('total-stars');
        if (el) el.innerText = this.getTotalStars();
    }
};
