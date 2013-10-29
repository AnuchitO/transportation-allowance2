Ext.namespace('Ext.ss.form');

Ext.ss.grid.LockingColumnModel = Ext.extend(Ext.ux.grid.LockingColumnModel, {
    isLocked : function(colIndex){
        return this.config[colIndex].columnLocked === true;
    },
    setLocked : function(colIndex, value, suppressEvent){
        if (this.isLocked(colIndex) == value) {
            return;
        }
        this.config[colIndex].columnLocked = value;
        if (!suppressEvent) {
            this.fireEvent('columnlockchange', this, colIndex, value);
        }
    }
});